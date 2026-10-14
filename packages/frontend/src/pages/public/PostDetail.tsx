import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Clock, User, ArrowLeft, Share2, CheckCircle2, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const data = await api.get<any>(`/posts/read/${slug}`);
      setPost(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">LOADING ARCHITECTURAL WRITE-UP...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl bg-white/90 border border-sand-300 text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-serif font-normal text-forest-900">Article Not Found</h2>
        <p className="text-xs text-forest-700/70">The requested engineering study does not exist or was moved.</p>
        <Link to="/posts" className="inline-block px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-xs font-mono font-medium text-forest-900 border border-sand-200">
          &larr; Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Back button */}
      <div>
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200 text-xs font-mono text-forest-800 transition-colors border border-sand-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
        </Link>
      </div>

      {/* Main Title & Metadata Header */}
      <div className="relative rounded-3xl bg-white/95 p-6 sm:p-8 border border-sand-200/80 overflow-hidden shadow-sm space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((t: string) => (
            <span
              key={t}
              className="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
            >
              #{t}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-normal text-forest-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sand-200 text-xs text-forest-700/60">
          <div className="flex items-center gap-3">
            <div className="p-0.5 rounded-full bg-sand-200 inline-block">
              <div className="w-8 h-8 rounded-full bg-forest-900 flex items-center justify-center text-xs font-bold text-sand-100">
                {post.authorName ? post.authorName[0] : 'B'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {post.authorUsername ? (
                  <Link to={`/u/${post.authorUsername}`} className="font-bold text-forest-900 hover:text-terracotta-600 transition-colors">
                    {post.authorName}
                  </Link>
                ) : (
                  <span className="font-bold text-forest-900">{post.authorName}</span>
                )}
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-forest-700/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTimeMinutes || 4} min read
                </span>
                <span>•</span>
                <span className="text-sage-700 font-semibold">Verified Author</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 border border-sand-200 text-xs font-mono transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Share Article'}
          </button>
        </div>
      </div>

      {/* Summary Box */}
      {post.summary && (
        <div className="p-5 rounded-2xl bg-sand-50/80 border border-sand-200 text-sm text-forest-800 leading-relaxed font-sans">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sage-800 font-bold mb-1">
            Executive Summary
          </div>
          {post.summary}
        </div>
      )}

      {/* Main Body */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-sand-200/80 text-forest-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4 shadow-sm">
        {post.content}
      </div>

      {/* Author Footer Card */}
      <div className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-1 rounded-full bg-sand-200">
            <div className="w-12 h-12 rounded-full bg-forest-900 flex items-center justify-center text-base font-bold text-sand-100">
              {post.authorName ? post.authorName[0] : 'B'}
            </div>
          </div>
          <div>
            <div className="text-sm font-serif font-normal text-forest-900">{post.authorName}</div>
            <div className="text-xs text-forest-700/60 font-mono">Verified Proofly Student Builder</div>
          </div>
        </div>

        {post.authorUsername && (
          <Link
            to={`/u/${post.authorUsername}`}
            className="px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
          >
            <span>View Verified Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
};
