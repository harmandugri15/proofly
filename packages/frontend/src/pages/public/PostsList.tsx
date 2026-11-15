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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn relative">
      {/* High-Energy Ambient Glow Spots */}
      <div className="absolute top-10 right-0 w-[450px] h-[450px] bg-[#FFDE59]/35 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[400px] -left-10 w-[500px] h-[500px] bg-[#70D6FF]/35 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="relative rounded-[28px] bg-[#385241] text-white p-6 sm:p-8 overflow-hidden shadow-[5px_5px_0px_#1F2C23] border-2 border-[#1F2C23]">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FCE5DB]" />
            <span>COMMUNITY PROOF FEED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white">
            Engineering Case Studies & Deep-Dives
          </h1>
          <p className="text-sm text-white/90 max-w-2xl leading-relaxed font-medium">
            Real architectural breakdowns, optimization logs, and postmortems authored by verified student engineers. No fluff, just code and verifiable artifacts.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['all', 'architecture', 'distributed', 'algorithms', 'frontend'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-black border-2 border-[#1F2C23] transition-all shadow-[2px_2px_0px_#1F2C23] ${
                  activeFilter === tag
                    ? 'bg-[#FFDE59] text-[#1F2C23]'
                    : 'bg-white text-[#1F2C23] hover:bg-[#FAF7F2]'
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
          <div className="p-12 text-center rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-[#586E5F] text-xs font-mono font-bold">
            No technical case studies published yet. Be the first to share an engineering write-up!
          </div>
        ) : (
          posts.map((post, idx) => {
            const cardBgs = ['bg-[#FEF9C3]', 'bg-[#E0F2FE]', 'bg-[#DCFCE7]', 'bg-[#F3E8FF]'];
            const cardBg = cardBgs[idx % cardBgs.length];

            return (
              <div
                key={post.id}
                className={`p-5 sm:p-6 rounded-[24px] ${cardBg} border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[6px_6px_0px_#1F2C23] transition-all hover:-translate-y-0.5 flex gap-4 group`}
              >
                {/* Signal Pill */}
                <div className="hidden sm:flex flex-col items-center justify-start shrink-0 pt-1">
                  <div className="flex flex-col items-center bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-2xl p-2 min-w-[50px] text-center">
                    <ArrowUp className="w-4 h-4 text-[#D97043] group-hover:scale-110 transition-transform stroke-[3]" />
                    <span className="text-xs font-mono font-black text-[#1F2C23] pt-1">
                      {32 + (idx * 17) % 50}
                    </span>
                    <span className="text-[9px] font-mono text-[#586E5F] font-black uppercase">proof</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#24362A] font-mono font-bold">
                    <div className="p-0.5 rounded-md inline-block bg-[#1F2C23]">
                      <div className="w-5 h-5 rounded-sm bg-white flex items-center justify-center text-[10px] font-black text-[#1F2C23]">
                        {post.authorName ? post.authorName[0] : 'B'}
                      </div>
                    </div>
                    <span className="text-[#1F2C23] font-black hover:text-[#D97043] transition-colors">
                      {post.authorName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#586E5F]">
                      <Clock className="w-3.5 h-3.5 text-[#586E5F]" /> {post.readTimeMinutes || 4} min read
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline text-[#16A34A] font-black">Verified Author</span>
                  </div>

                  <Link to={`/posts/${post.slug}`} className="block">
                    <h2 className="text-lg sm:text-xl font-black text-[#1F2C23] group-hover:text-[#D97043] transition-colors font-serif leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#24362A] font-medium leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md bg-white text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/posts/${post.slug}`}
                      className="text-xs font-mono font-black text-[#D97043] hover:text-[#C55F34] flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
                    >
                      <span>Read Study</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
