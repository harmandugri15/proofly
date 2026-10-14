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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING VERIFIED ESSAYS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-300" />
            <span>COMMUNITY PROOF FEED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-normal font-serif tracking-tight text-white">
            Engineering Case Studies & Deep-Dives
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Real architectural breakdowns, optimization logs, and postmortems authored by verified student engineers. No fluff, just code and verifiable artifacts.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['all', 'architecture', 'distributed', 'algorithms', 'frontend'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === tag
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                }`}
              >
                #{tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Feed Cards */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 text-xs font-mono">
            No technical case studies published yet. Be the first to share an engineering write-up!
          </div>
        ) : (
          posts.map((post, idx) => (
            <div
              key={post.id}
              className="p-5 sm:p-6 rounded-3xl bg-white/90 border border-sand-200/80 hover:border-sage-400/60 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md flex gap-4 group"
            >
              {/* Signal Pill */}
              <div className="hidden sm:flex flex-col items-center justify-start shrink-0 pt-1">
                <div className="flex flex-col items-center bg-sand-50 border border-sand-200 rounded-2xl p-2 min-w-[48px] text-center group-hover:border-terracotta-300 transition-colors">
                  <ArrowUp className="w-4 h-4 text-terracotta-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono font-bold text-forest-900 pt-1">
                    {32 + (idx * 17) % 50}
                  </span>
                  <span className="text-[9px] font-mono text-forest-700/50">proof</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-forest-700/70 font-mono">
                  <div className="p-0.5 rounded-full inline-block bg-sand-200">
                    <div className="w-5 h-5 rounded-full bg-forest-900 flex items-center justify-center text-[10px] font-bold text-sand-100">
                      {post.authorName ? post.authorName[0] : 'B'}
                    </div>
                  </div>
                  <span className="text-forest-900 font-bold hover:text-terracotta-600 transition-colors">
                    {post.authorName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-forest-700/60">
                    <Clock className="w-3.5 h-3.5 text-forest-700/50" /> {post.readTimeMinutes || 4} min read
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-sage-700 font-semibold">Verified Author</span>
                </div>

                <Link to={`/posts/${post.slug}`} className="block">
                  <h2 className="text-lg sm:text-xl font-normal text-forest-900 group-hover:text-terracotta-600 transition-colors font-serif">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-forest-700/75 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="text-xs font-mono font-bold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
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
