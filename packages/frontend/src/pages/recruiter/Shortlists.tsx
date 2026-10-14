import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { BookmarkCheck, Plus, Trash2, ArrowRight, User, Sparkles } from 'lucide-react';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING SAVED TALENT POOLS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/25 text-xs font-mono font-bold">
            <BookmarkCheck className="w-3.5 h-3.5 text-terracotta-300" />
            <span>TALENT POOLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Saved Candidate Shortlists
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Curate candidates into tailored pipelines, team review pools, and interview funnels.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Shortlist
        </button>
      </div>

      <div className="space-y-6">
        {shortlists.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 font-mono text-xs">
            No shortlists created yet. Organize candidate profiles by role or team.
          </div>
        ) : (
          shortlists.map((sl) => (
            <div key={sl.id} className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between pb-3 border-b border-sand-200">
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-normal text-forest-900">{sl.title}</h3>
                  {sl.description && <p className="text-xs text-forest-700/70 mt-0.5">{sl.description}</p>}
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200">
                  {sl.candidates?.length || 0} candidate(s)
                </span>
              </div>

              {sl.candidates?.length === 0 ? (
                <p className="text-xs text-forest-700/50 font-mono py-2">No candidates added to this list yet.</p>
              ) : (
                <div className="divide-y divide-sand-100">
                  {sl.candidates?.map((c: any) => (
                    <div key={c.id} className="py-3.5 flex items-center justify-between gap-4 text-xs group">
                      <div className="flex items-center gap-3">
                        <div className="p-0.5 rounded-full bg-sand-200 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-forest-900 flex items-center justify-center text-xs font-bold text-sand-100">
                            {c.name ? c.name[0] : 'C'}
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/recruiter/candidates/${c.candidateId}`}
                            className="font-medium text-forest-900 hover:text-terracotta-600 transition-colors text-sm"
                          >
                            {c.name}
                          </Link>
                          <p className="text-forest-700/60 text-xs mt-0.5 line-clamp-1">{c.headline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200">
                          {c.status}
                        </span>
                        <button
                          onClick={() => handleRemoveCandidate(sl.id, c.candidateId)}
                          className="p-1.5 rounded-full text-forest-700/40 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
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
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-normal text-forest-900">Create New Talent Pool</h3>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Pool Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2026 Core Infrastructure Interns"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Targeting candidates with strong systems and networking background..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500 font-mono leading-relaxed"
                />
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
