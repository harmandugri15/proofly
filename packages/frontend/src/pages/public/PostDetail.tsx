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
      <div className="max-w-md mx-auto my-24 p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] text-center space-y-4">
        <h2 className="text-xl font-serif font-black text-[#1F2C23]">Article Not Found</h2>
        <p className="text-xs text-[#586E5F] font-medium">The requested engineering study does not exist or was moved.</p>
        <Link
          to="/posts"
          className="inline-block px-4 py-2 rounded-xl bg-[#FFDE59] text-xs font-mono font-black text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
        >
          &larr; Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn relative">
      {/* High-Energy Ambient Glow Spots */}
      <div className="absolute top-10 right-0 w-[450px] h-[450px] bg-[#FFDE59]/30 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[400px] -left-10 w-[500px] h-[500px] bg-[#70D6FF]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Back button */}
      <div>
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-xs font-mono font-black text-[#1F2C23] transition-all border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
        </Link>
      </div>

      {/* Main Title & Metadata Header */}
      <div className="relative rounded-[28px] bg-white p-6 sm:p-8 border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] overflow-hidden space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((t: string) => (
            <span
              key={t}
              className="text-[11px] font-mono font-black px-3 py-1 rounded-xl bg-[#FEF9C3] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
            >
              #{t}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#1F2C23] tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[#1F2C23] text-xs text-[#24362A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#385241] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-sm font-black text-white shrink-0">
              {post.authorName ? post.authorName[0] : 'B'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {post.authorUsername ? (
                  <Link to={`/u/${post.authorUsername}`} className="font-black text-[#1F2C23] hover:text-[#D97043] transition-colors">
                    {post.authorName}
                  </Link>
                ) : (
                  <span className="font-black text-[#1F2C23]">{post.authorName}</span>
                )}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#86EFAC] text-[10px] font-mono font-black text-[#1F2C23] border border-[#1F2C23]">
                  <ShieldCheck className="w-3 h-3 text-[#16A34A]" /> Verified
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#586E5F] pt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTimeMinutes || 4} min read
                </span>
                <span>•</span>
                <span className="text-[#385241]">Verified Author</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FEF9C3] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-mono font-black transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Share Article'}
          </button>
        </div>
      </div>

      {/* Summary Box */}
      {post.summary && (
        <div className="p-5 sm:p-6 rounded-[24px] bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-sm text-[#1F2C23] leading-relaxed font-sans font-medium">
          <div className="text-[11px] font-mono font-black uppercase tracking-wider text-[#1F2C23] mb-1">
            Executive Summary
          </div>
          {post.summary}
        </div>
      )}

      {/* Main Body */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] text-[#1F2C23] text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4">
        {post.content}
      </div>

      {/* Author Footer Card */}
      <div className="p-6 rounded-[28px] bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#385241] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-lg font-black text-white shrink-0">
            {post.authorName ? post.authorName[0] : 'B'}
          </div>
          <div>
            <div className="text-base font-serif font-black text-[#1F2C23]">{post.authorName}</div>
            <div className="text-xs text-[#586E5F] font-mono font-bold">Verified Proofly Student Builder</div>
          </div>
        </div>

        {post.authorUsername && (
          <Link
            to={`/u/${post.authorUsername}`}
            className="px-5 py-2.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-mono font-black text-xs flex items-center gap-1.5 border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <span>View Verified Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
};
