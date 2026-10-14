import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Search, Filter, ShieldCheck, ArrowRight, CheckSquare, Square, Columns } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Discover Verified Candidates</h1>
          <p className="text-sm text-slate-400 mt-1">
            Search candidates by verified code evidence, skills, and academic graduation timeline.
          </p>
        </div>

        {selectedForCompare.length > 0 && (
          <button
            onClick={runComparison}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/10"
          >
            <Columns className="w-4 h-4" /> Compare Selected ({selectedForCompare.length})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, headline, bio, or role keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Skill:</span>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
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

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Graduation Year:</span>
            <select
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="">Any Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={isVerifiedOnly}
              onChange={(e) => setIsVerifiedOnly(e.target.checked)}
              className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-0"
            />
            <span className="text-slate-300 font-medium">Verified Credentials Only</span>
          </label>
        </div>
      </div>

      {/* Candidate List */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400">Searching verified candidate directory...</div>
      ) : candidates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          No candidates found matching the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-mono">Found {candidates.length} verified candidate(s)</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((candidate) => {
              const isSelected = selectedForCompare.includes(candidate.id);
              return (
                <div
                  key={candidate.id}
                  className={`p-5 rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between space-y-4 ${
                    isSelected ? 'border-emerald-500/60 bg-emerald-950/10' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCompare(candidate.id)}
                          className="text-slate-400 hover:text-emerald-400"
                          title="Select for comparison"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                        <div>
                          <h3 className="text-base font-bold text-white leading-snug">
                            {candidate.user?.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            @{candidate.username} {candidate.targetGraduationYear ? `• Class of ${candidate.targetGraduationYear}` : ''}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                        {candidate.completenessScore}% Proof
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium line-clamp-2">{candidate.headline}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {candidate.skills?.slice(0, 5).map((s: any) => (
                        <span
                          key={s.id}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <span>{candidate.projects?.length || 0} projects</span>
                      <span>•</span>
                      <span>{candidate.certificates?.length || 0} credentials</span>
                    </div>

                    <Link
                      to={`/recruiter/candidates/${candidate.id}`}
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      Inspect Profile <ArrowRight className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Side-by-Side Candidate Comparison</h3>
                <p className="text-xs text-slate-400">Comparing technical proof points and verified evidence</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            {isComparing ? (
              <div className="p-12 text-center text-slate-400">Analyzing comparison data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="p-3 text-slate-400 font-mono w-40">Attribute</th>
                      {compareData.map((c) => (
                        <th key={c.id} className="p-3 text-white font-bold">
                          {c.user?.name}
                          <span className="block text-[11px] font-mono text-emerald-400 font-normal mt-0.5">
                            {c.completenessScore}% Proof Score
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">Headline</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          {c.headline || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">Graduation Year</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300 font-mono">
                          {c.targetGraduationYear || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">Verified Projects</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          <ul className="space-y-1">
                            {c.projects?.map((p: any) => (
                              <li key={p.id} className="flex items-center gap-1.5">
                                <span className="font-semibold text-white">{p.title}</span>
                                <span className="text-[10px] font-mono text-emerald-400">({p.verificationStatus})</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">Certifications</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300">
                          <ul className="space-y-1">
                            {c.certificates?.map((cert: any) => (
                              <li key={cert.id} className="text-slate-300">
                                {cert.title} ({cert.issuer})
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-medium">Algorithmic Problem Stats</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-slate-300 font-mono">
                          {c.codingProfiles?.length > 0
                            ? c.codingProfiles.map((cp: any) => `${cp.platform}: ${cp.totalSolved} solved`).join(', ')
                            : 'None linked'}
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
