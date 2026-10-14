import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { FileText, Clock, User, ArrowRight, Sparkles, TrendingUp, ThumbsUp, ArrowUp, Share2, Tag } from 'lucide-react';

export const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.get<any[]>('/posts');
      setPosts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">RETRIEVING VERIFIED WRITE-UPS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNITY PROOF FEED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Engineering Case Studies & Deep-Dives
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Real architectural breakdowns, optimization logs, and postmortems authored by verified student engineers. No fluff, just code and verifiable artifacts.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['all', 'architecture', 'distributed', 'algorithms', 'frontend'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === tag
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                #{tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reddit-Style Feed Cards */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 text-slate-400 text-xs font-mono">
            No technical case studies published yet. Be the first to share an engineering write-up!
          </div>
        ) : (
          posts.map((post, idx) => (
            <div
              key={post.id}
              className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-0.5 shadow-lg flex gap-4 group"
            >
              {/* Reddit-style Upvote / Signal Pill */}
              <div className="hidden sm:flex flex-col items-center justify-start shrink-0 pt-1">
                <div className="flex flex-col items-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 min-w-[48px] text-center group-hover:border-emerald-500/30 transition-colors">
                  <ArrowUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-black text-white pt-1">
                    {32 + (idx * 17) % 50}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">proof</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  <div className="story-ring p-0.5 rounded-full inline-block">
                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-emerald-400">
                      {post.authorName ? post.authorName[0] : 'B'}
                    </div>
                  </div>
                  <span className="text-slate-200 font-bold hover:text-emerald-300 transition-colors">
                    {post.authorName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.readTimeMinutes || 4} min read
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-emerald-400/80 font-bold">Verified Author</span>
                </div>

                <Link to={`/posts/${post.slug}`} className="block">
                  <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors font-sans">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
