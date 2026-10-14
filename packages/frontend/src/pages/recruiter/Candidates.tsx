import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Search, Filter, ShieldCheck, ArrowRight, CheckSquare, Square, Columns, Sparkles, User, Layers, Award } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';

export const RecruiterCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [gradYear, setGradYear] = useState<string>('');

  // Comparison selection
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, [selectedSkill, isVerifiedOnly, gradYear]);

  const fetchCandidates = async (queryOverride?: string) => {
    setIsLoading(true);
    try {
      const q = queryOverride !== undefined ? queryOverride : searchQuery;
      let endpoint = `/recruiter/candidates?query=${encodeURIComponent(q)}`;
      if (selectedSkill) endpoint += `&skills=${encodeURIComponent(selectedSkill)}`;
      if (isVerifiedOnly) endpoint += `&isVerifiedOnly=true`;
      if (gradYear) endpoint += `&graduationYear=${encodeURIComponent(gradYear)}`;

      const data = await api.get<any>(endpoint);
      setCandidates(data.candidates || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCandidates();
  };

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((c) => c !== id));
    } else {
      if (selectedForCompare.length >= 4) {
        alert('You can compare a maximum of 4 candidates at once.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const runComparison = async () => {
    if (selectedForCompare.length === 0) return;
    setIsComparing(true);
    setShowCompareModal(true);
    try {
      const data = await api.post<any[]>('/recruiter/candidates/compare', {
        candidateIds: selectedForCompare,
      });
      setCompareData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SCOUT INTELLIGENCE DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Verified Talent Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Discover student software engineers with independently verified code evidence, authentic GitHub heatmaps, and zero resume padding.
          </p>
        </div>

        {selectedForCompare.length > 0 && (
          <button
            onClick={runComparison}
            className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald shrink-0"
          >
            <Columns className="w-4 h-4" /> Compare Selected ({selectedForCompare.length})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, headline, bio, or tech keywords..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-sans"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono text-[11px]">Skill:</span>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
              >
                <option value="">All Skills</option>
                <option value="TypeScript">TypeScript</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Rust">Rust</option>
                <option value="PostgreSQL">PostgreSQL</option>
                <option value="AWS">AWS</option>
                <option value="Docker">Docker</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono text-[11px]">Graduation:</span>
              <select
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
              >
                <option value="">Any Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-mono text-[11px] text-slate-300">
            <input
              type="checkbox"
              checked={isVerifiedOnly}
              onChange={(e) => setIsVerifiedOnly(e.target.checked)}
              className="rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-0"
            />
            <span>Verified Credentials Only</span>
          </label>
        </div>
      </div>

      {/* Candidate List */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-400 font-mono text-xs">
          Scanning verified candidate network...
        </div>
      ) : candidates.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 text-slate-400 text-xs font-mono">
          No candidates found matching the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Found {candidates.length} verified candidate(s)</span>
            <span className="text-[11px] text-emerald-400">Select candidates to run side-by-side comparison</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {candidates.map((candidate) => {
              const isSelected = selectedForCompare.includes(candidate.id);
              return (
                <div
                  key={candidate.id}
                  className={`p-6 rounded-3xl glass-panel border transition-all flex flex-col justify-between space-y-4 shadow-lg group hover:-translate-y-0.5 ${
                    isSelected ? 'border-emerald-500/60 bg-emerald-500/[0.04]' : 'border-white/10 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompare(candidate.id)}
                          className="text-slate-500 hover:text-emerald-400 transition-colors pt-0.5"
                          title="Select for comparison"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-600" />
                          )}
                        </button>

                        <div className="story-ring p-0.5 rounded-full shrink-0">
                          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-400">
                            {candidate.user?.name ? candidate.user.name[0] : 'U'}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors font-sans leading-snug">
                            {candidate.user?.name}
                          </h3>
                          <p className="text-xs font-mono text-slate-400">
                            @{candidate.username} {candidate.targetGraduationYear ? `• Class of '${candidate.targetGraduationYear.toString().slice(-2)}` : ''}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        {candidate.completenessScore}% Proof
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-semibold line-clamp-2 leading-relaxed">
                      {candidate.headline || 'Software Engineer'}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {candidate.skills?.slice(0, 5).map((s: any) => (
                        <span
                          key={s.id}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                      <span>{candidate.projects?.length || 0} projects</span>
                      <span>•</span>
                      <span>{candidate.certificates?.length || 0} credentials</span>
                    </div>

                    <Link
                      to={`/recruiter/candidates/${candidate.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>Inspect Evidence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-black text-white font-sans">Side-by-Side Candidate Comparison</h3>
                <p className="text-xs text-slate-400 font-mono">Comparing technical proof points and verified evidence</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-bold border border-white/10"
              >
                Close
              </button>
            </div>

            {isComparing ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs">Analyzing comparison signals...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3 text-slate-400 font-mono w-40">Attribute</th>
                      {compareData.map((c) => (
                        <th key={c.id} className="p-3 text-white font-bold">
                          {c.user?.name}
                          <span className="block text-[11px] font-mono text-emerald-400 font-bold mt-0.5">
                            {c.completenessScore}% Proof Score
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 text-slate-400 font-mono font-medium">Headline</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          {c.headline || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-mono font-medium">Graduation Year</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300 font-mono">
                          {c.targetGraduationYear || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-mono font-medium">Verified Projects</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          {c.projects?.length || 0} project(s)
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-mono font-medium">Credentials</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          {c.certificates?.length || 0} credential(s)
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-mono font-medium">Top Skills</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {c.skills?.slice(0, 4).map((s: any) => (
                              <span key={s.id} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300">
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
