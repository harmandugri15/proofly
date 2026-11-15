import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { FileText, Plus, Trash2, Edit3, Eye, CheckCircle2, Clock, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

export const StudentPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('PUBLISHED');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.get<any[]>('/posts/my-posts');
      setPosts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await api.post('/posts', {
        title,
        summary,
        content,
        tags,
        status,
      });

      setShowModal(false);
      setTitle('');
      setSummary('');
      setContent('');
      setTagsStr('');
      loadPosts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      loadPosts();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING PUBLISHED ESSAYS...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative rounded-[28px] bg-[#385241] text-white p-6 sm:p-8 overflow-hidden shadow-[4px_4px_0px_#1F2C23] border-2 border-[#1F2C23] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/40 shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
              ENGINEERING LOGS
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-[#FCE5DB]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
            Technical Case Studies & Notes
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed font-medium">
            Publish engineering reflections, architectural decisions, and project postmortems. Real technical writing demonstrates your architectural clarity to scouts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-bold text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Write Case Study
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="p-12 text-center rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] text-[#1F2C23] space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] mx-auto flex items-center justify-center text-[#1F2C23]">
            <FileText className="w-7 h-7 text-[#1F2C23]" />
          </div>
          <h3 className="text-base font-serif font-black text-[#1F2C23]">No technical articles published yet</h3>
          <p className="text-xs text-[#586E5F] max-w-sm mx-auto leading-relaxed font-medium">
            Technical writing highlights communication clarity and architectural depth for hiring leads.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#FFDE59] hover:bg-[#FACC15] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              Write First Article
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, idx) => {
            const cardBgs = ['bg-white', 'bg-[#FEF9C3]', 'bg-[#E0F2FE]', 'bg-[#DCFCE7]'];
            const cardBg = cardBgs[idx % cardBgs.length];

            return (
              <div
                key={post.id}
                className={`p-5 sm:p-6 rounded-[24px] ${cardBg} border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group`}
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-lg border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] uppercase ${
                        post.status === 'PUBLISHED'
                          ? 'bg-[#86EFAC] text-[#1F2C23]'
                          : 'bg-[#FFDE59] text-[#1F2C23]'
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs text-[#1F2C23] flex items-center gap-1 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#385241]" /> {post.readTimeMinutes || 4} min read
                    </span>
                  </div>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="text-base sm:text-lg font-serif font-black text-[#1F2C23] group-hover:text-[#D97043] transition-colors block"
                  >
                    {post.title}
                  </Link>

                  <p className="text-xs text-[#385241] line-clamp-2 leading-relaxed font-medium">{post.summary}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-lg bg-white text-[#1F2C23] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#385241]" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-xl bg-white text-[#1F2C23] hover:text-[#DC2626] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#1F2C23]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border-2 border-[#1F2C23] rounded-[28px] p-6 sm:p-7 w-full max-w-2xl shadow-[8px_8px_0px_#1F2C23] space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-black text-[#1F2C23]">Draft Technical Case Study</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scaling WebSockets to 50k Concurrent Sessions: Architecture & Benchmarks"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] text-[#1F2C23] text-xs sm:text-sm shadow-[2px_2px_0px_#1F2C23] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  Executive Summary
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A concise synopsis of the engineering problem and outcome"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] text-[#1F2C23] text-xs sm:text-sm shadow-[2px_2px_0px_#1F2C23] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  Content (Markdown supported)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Document your architecture, code choices, performance trade-offs, and lessons learned..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] text-[#1F2C23] text-xs sm:text-sm shadow-[2px_2px_0px_#1F2C23] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="architecture, distributed, rust"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] text-[#1F2C23] text-xs shadow-[2px_2px_0px_#1F2C23] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] text-[#1F2C23] text-xs shadow-[2px_2px_0px_#1F2C23] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
                  >
                    <option value="PUBLISHED">Published (Public)</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#1F2C23]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
