import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { BookmarkCheck, Plus, Trash2, ArrowRight, User, Sparkles } from 'lucide-react';

export const RecruiterShortlistsPage: React.FC = () => {
  const [shortlists, setShortlists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadShortlists();
  }, []);

  const loadShortlists = async () => {
    try {
      const data = await api.get<any[]>('/recruiter/shortlists');
      setShortlists(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/recruiter/shortlists', { title, description });
      setShowModal(false);
      setTitle('');
      setDescription('');
      loadShortlists();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveCandidate = async (shortlistId: string, candidateId: string) => {
    try {
      await api.delete(`/recruiter/shortlists/${shortlistId}/candidates/${candidateId}`);
      loadShortlists();
    } catch (e) {
      console.error(e);
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
        <p className="text-xs font-mono text-slate-400 tracking-wider">RETRIEVING SAVED TALENT POOLS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>TALENT POOLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Saved Candidate Shortlists
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Curate candidates into tailored pipelines, team review pools, and interview funnels.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Shortlist
        </button>
      </div>

      <div className="space-y-6">
        {shortlists.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 text-slate-400 font-mono text-xs">
            No shortlists created yet. Organize candidate profiles by role or team.
          </div>
        ) : (
          shortlists.map((sl) => (
            <div key={sl.id} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-start justify-between pb-3 border-b border-white/5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-sans">{sl.title}</h3>
                  {sl.description && <p className="text-xs text-slate-400 mt-0.5">{sl.description}</p>}
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {sl.candidates?.length || 0} candidate(s)
                </span>
              </div>

              {sl.candidates?.length === 0 ? (
                <p className="text-xs text-slate-500 font-mono py-2">No candidates added to this list yet.</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {sl.candidates?.map((c: any) => (
                    <div key={c.id} className="py-3.5 flex items-center justify-between gap-4 text-xs group">
                      <div className="flex items-center gap-3">
                        <div className="story-ring p-0.5 rounded-full shrink-0">
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-400">
                            {c.name ? c.name[0] : 'C'}
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/recruiter/candidates/${c.candidateId}`}
                            className="font-bold text-white hover:text-emerald-300 transition-colors text-sm font-sans"
                          >
                            {c.name}
                          </Link>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{c.headline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5">
                          {c.status}
                        </span>
                        <button
                          onClick={() => handleRemoveCandidate(sl.id, c.candidateId)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Shortlist Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white font-sans">Create New Talent Pool</h3>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pool Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2026 Core Infrastructure Interns"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Targeting candidates with strong systems and networking background..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-bold hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black shadow-glow-emerald hover:scale-105 transition-transform"
                >
                  Create Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
