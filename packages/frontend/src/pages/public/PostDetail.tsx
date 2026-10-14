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
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">LOADING ARCHITECTURAL WRITE-UP...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl glass-panel border border-white/10 text-center space-y-4">
        <h2 className="text-xl font-black text-white font-sans">Article Not Found</h2>
        <p className="text-xs text-slate-400">The requested engineering study does not exist or was moved.</p>
        <Link to="/posts" className="inline-block px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-emerald-400">
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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-colors border border-white/5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
        </Link>
      </div>

      {/* Main Title & Metadata Header */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((t: string) => (
            <span
              key={t}
              className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
            >
              #{t}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight font-sans">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="story-ring p-0.5 rounded-full inline-block">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-400">
                {post.authorName ? post.authorName[0] : 'B'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {post.authorUsername ? (
                  <Link to={`/u/${post.authorUsername}`} className="font-bold text-white hover:text-emerald-300 transition-colors">
                    {post.authorName}
                  </Link>
                ) : (
                  <span className="font-bold text-white">{post.authorName}</span>
                )}
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTimeMinutes || 4} min read
                </span>
                <span>•</span>
                <span>Verified Author</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Share Article'}
          </button>
        </div>
      </div>

      {/* Summary Box */}
      {post.summary && (
        <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 text-sm text-slate-300 leading-relaxed font-sans">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
            Executive Summary
          </div>
          {post.summary}
        </div>
      )}

      {/* Main Body */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4">
        {post.content}
      </div>

      {/* Author Footer Card */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="story-ring p-1 rounded-full">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-base font-black text-emerald-400">
              {post.authorName ? post.authorName[0] : 'B'}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">{post.authorName}</div>
            <div className="text-xs text-slate-400">Verified Proofly Student Builder</div>
          </div>
        </div>

        {post.authorUsername && (
          <Link
            to={`/u/${post.authorUsername}`}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-glow-emerald hover:scale-105 transition-transform"
          >
            <span>View Verified Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
};
