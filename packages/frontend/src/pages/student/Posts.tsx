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
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/25">
              ENGINEERING LOGS
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-terracotta-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Technical Case Studies & Notes
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Publish engineering reflections, architectural decisions, and project postmortems. Real technical writing demonstrates your architectural clarity to scouts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Write Case Study
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-sand-100 border border-sand-200 mx-auto flex items-center justify-center text-forest-700/40">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-base font-serif font-normal text-forest-900">No technical articles published yet</h3>
          <p className="text-xs text-forest-700/70 max-w-sm mx-auto leading-relaxed">
            Technical writing highlights communication clarity and architectural depth for hiring leads.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
            >
              Write First Article
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-sand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-sage-400/60 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      post.status === 'PUBLISHED'
                        ? 'bg-sage-50 text-sage-800 border border-sage-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {post.status}
                  </span>
                  <span className="text-xs text-forest-700/60 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-forest-700/50" /> {post.readTimeMinutes || 4} min read
                  </span>
                </div>

                <Link
                  to={`/posts/${post.slug}`}
                  className="text-base sm:text-lg font-serif font-normal text-forest-900 hover:text-terracotta-600 transition-colors block"
                >
                  {post.title}
                </Link>

                <p className="text-xs text-forest-700/70 line-clamp-2 leading-relaxed">{post.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/posts/${post.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-sage-600" /> View
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-full text-forest-700/40 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-serif font-normal text-forest-900">Draft Technical Case Study</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scaling WebSockets to 50k Concurrent Sessions: Architecture & Benchmarks"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Executive Summary
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A concise synopsis of the engineering problem and outcome"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Content (Markdown supported)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Document your architecture, code choices, performance trade-offs, and lessons learned..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="architecture, distributed, rust"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  >
                    <option value="PUBLISHED">Published (Public)</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full bg-sand-200 text-forest-800 text-xs font-mono font-medium hover:bg-sand-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-medium shadow-sm transition-transform hover:scale-105"
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
