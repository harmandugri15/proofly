import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { BookmarkCheck, Plus, Trash2, ArrowRight, User } from 'lucide-react';

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
    return <div className="p-8 text-center text-slate-400">Loading talent pools...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Talent Pools & Shortlists</h1>
          <p className="text-sm text-slate-400 mt-1">
            Organize candidates into hiring funnels and review pipelines.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors shadow-md shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" /> Create Shortlist
        </button>
      </div>

      <div className="space-y-6">
        {shortlists.map((sl) => (
          <div key={sl.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{sl.title}</h3>
                {sl.description && <p className="text-xs text-slate-400 mt-0.5">{sl.description}</p>}
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                {sl.candidates?.length || 0} candidate(s)
              </span>
            </div>

            {sl.candidates?.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No candidates added to this list yet.</p>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {sl.candidates?.map((c: any) => (
                  <div key={c.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <Link
                        to={`/recruiter/candidates/${c.candidateId}`}
                        className="font-bold text-white hover:text-emerald-400 transition-colors"
                      >
                        {c.name}
                      </Link>
                      <p className="text-slate-400 text-[11px] mt-0.5">{c.headline}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300">
                        {c.status}
                      </span>
                      <button
                        onClick={() => handleRemoveCandidate(sl.id, c.candidateId)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
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
        ))}
      </div>

      {/* Create Shortlist Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Create New Shortlist</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2025 Summer Intern Finalists"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes about criteria or target roles."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
