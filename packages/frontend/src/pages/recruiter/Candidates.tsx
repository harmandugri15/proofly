import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import {
  Search,
  Filter,
  ShieldCheck,
  ArrowRight,
  CheckSquare,
  Square,
  Columns,
  Sparkles,
  User,
  Layers,
  Award,
  Key,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';

export const RecruiterCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Unlock Candidate via Card Info
  const [unlockInput, setUnlockInput] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

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

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockInput.trim()) return;
    setIsUnlocking(true);
    setUnlockMessage(null);
    try {
      const data = await api.post<any>('/recruiter/candidates/unlock', {
        cardUrlOrToken: unlockInput.trim(),
      });
      setUnlockMessage({
        type: 'success',
        text:
          data.message ||
          `Candidate ${data.name || ''} successfully unlocked and added to your radar.`,
      });
      setUnlockInput('');
      fetchCandidates();
    } catch (err: any) {
      setUnlockMessage({
        type: 'error',
        text:
          err?.message ||
          'Invalid Public Card link or Fast-Pass code. Please verify the code or URL and try again.',
      });
    } finally {
      setIsUnlocking(false);
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-[#FAF7F2] text-[#1F2C23]">
      {/* Header Banner */}
      <div className="relative rounded-[36px] bg-[#FAF7F2] p-6 sm:p-8 border border-[#EBE5D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] text-[#24362A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#385241]" />
            <span>SCOUT INTELLIGENCE DIRECTORY</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2C23]">
            Verified Talent Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#586E5F] max-w-xl leading-relaxed">
            Discover student software engineers who have granted access to your organization via their Public Card or Fast-Pass link. Independently verified code evidence and zero resume padding.
          </p>
        </div>

        {selectedForCompare.length > 0 && (
          <button
            onClick={runComparison}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white font-semibold text-xs transition-all shadow-sm shrink-0"
          >
            <Columns className="w-4 h-4" /> Compare Selected ({selectedForCompare.length})
          </button>
        )}
      </div>

      {/* Unlock Candidate with Public Card / Fast-Pass Form */}
      <div className="p-6 rounded-[32px] bg-white border border-[#DDD5C4] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E4ECE6] flex items-center justify-center text-[#24362A] shrink-0">
              <Key className="w-4 h-4 text-[#D97043]" />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-[#1F2C23]">
                Unlock Candidate via Access Hash or Fast-Pass Link
              </h2>
              <p className="text-[11px] text-[#586E5F]">
                Paste a student's Access Hash (e.g. <code className="bg-[#FAF7F2] px-1 py-0.5 rounded text-[10px] font-mono font-bold text-[#1F2C23] border border-[#DDD5C4]">PRF-XXXXXXXX</code>) or their Public Card link to instantly unlock their dossier.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleUnlockSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <input
            type="text"
            value={unlockInput}
            onChange={(e) => setUnlockInput(e.target.value)}
            placeholder="Enter student Access Hash (e.g. PRF-981D2F8E) or public card link..."
            className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#DDD5C4] text-[#1F2C23] placeholder-[#A3BFAC] text-xs font-mono focus:outline-none focus:border-[#74947F]"
          />
          <button
            type="submit"
            disabled={isUnlocking || !unlockInput.trim()}
            className="px-6 py-2.5 rounded-full bg-[#385241] hover:bg-[#24362A] disabled:opacity-50 text-white text-xs font-semibold transition-all shrink-0 shadow-2xs"
          >
            {isUnlocking ? 'Unlocking...' : 'Unlock Candidate'}
          </button>
        </form>

        {unlockMessage && (
          <div
            className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-medium ${
              unlockMessage.type === 'success'
                ? 'bg-[#E4ECE6] text-[#24362A] border border-[#C7D9CD]'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {unlockMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#385241] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{unlockMessage.text}</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-6 rounded-[32px] bg-[#FAF7F2] border border-[#EBE5D8] space-y-4 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#758C7D] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search unlocked candidates by name, headline, bio, or tech keywords..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#DDD5C4] text-[#1F2C23] placeholder-[#A3BFAC] text-xs sm:text-sm focus:outline-none focus:border-[#74947F] shadow-2xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#385241] hover:bg-[#24362A] text-white text-xs font-semibold transition-all shrink-0 shadow-sm"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-[#EBE5D8]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[#586E5F] font-semibold text-[11px]">Skill:</span>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDD5C4] text-[#1F2C23] text-xs focus:outline-none focus:border-[#74947F]"
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
              <span className="text-[#586E5F] font-semibold text-[11px]">Graduation:</span>
              <select
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDD5C4] text-[#1F2C23] text-xs focus:outline-none focus:border-[#74947F]"
              >
                <option value="">Any Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2D3E32] font-medium">
            <input
              type="checkbox"
              checked={isVerifiedOnly}
              onChange={(e) => setIsVerifiedOnly(e.target.checked)}
              className="rounded border-[#DDD5C4] text-[#385241] focus:ring-0"
            />
            <span>Verified Credentials Only</span>
          </label>
        </div>
      </div>

      {/* Candidate List */}
      {isLoading ? (
        <div className="p-16 text-center text-[#586E5F] text-xs">
          Scanning verified candidate network...
        </div>
      ) : candidates.length === 0 ? (
        <div className="p-12 text-center rounded-[32px] bg-white border border-[#DDD5C4] text-[#586E5F] text-xs space-y-2">
          <p className="font-serif text-sm font-semibold text-[#1F2C23]">No Candidates in your Radar Yet</p>
          <p className="max-w-md mx-auto text-[#586E5F] leading-relaxed">
            Candidates only appear here when they have explicitly shared their Public Card info or Recruiter Fast-Pass with your organization. Paste a student's card link in the box above to unlock their profile.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#586E5F]">
            <span>Found {candidates.length} verified candidate(s)</span>
            <span className="text-[11px] text-[#385241] font-semibold">Select candidates to run side-by-side comparison</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {candidates.map((candidate) => {
              const isSelected = selectedForCompare.includes(candidate.id);
              return (
                <div
                  key={candidate.id}
                  className={`p-6 rounded-[32px] bg-[#FAF7F2] border transition-all flex flex-col justify-between space-y-4 shadow-sm group hover:-translate-y-0.5 ${
                    isSelected ? 'border-[#385241] bg-[#E4ECE6]/40' : 'border-[#EBE5D8] hover:border-[#74947F]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompare(candidate.id)}
                          className="text-[#758C7D] hover:text-[#24362A] transition-colors pt-0.5"
                          title="Select for comparison"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-[#385241]" />
                          ) : (
                            <Square className="w-5 h-5 text-[#A3BFAC]" />
                          )}
                        </button>

                        <div className="w-10 h-10 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] flex items-center justify-center font-serif text-sm font-bold text-[#24362A] shrink-0">
                          {candidate.user?.name ? candidate.user.name[0] : 'U'}
                        </div>

                        <div>
                          <h3 className="font-serif text-base font-bold text-[#1F2C23] group-hover:text-[#385241] transition-colors leading-snug">
                            {candidate.user?.name}
                          </h3>
                          <p className="text-xs text-[#586E5F] font-mono">
                            @{candidate.username} {candidate.targetGraduationYear ? `• Class of '${candidate.targetGraduationYear.toString().slice(-2)}` : ''}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#24362A] bg-[#E4ECE6] px-3 py-1 rounded-full border border-[#C7D9CD] shrink-0">
                        {candidate.completenessScore}% Proof
                      </span>
                    </div>

                    <p className="text-xs text-[#405446] font-medium line-clamp-2 leading-relaxed">
                      {candidate.headline || 'Software Engineer'}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {candidate.skills?.slice(0, 5).map((s: any) => (
                        <span
                          key={s.id}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-[#24362A] border border-[#DDD5C4]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EBE5D8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-[#586E5F] font-mono text-[11px]">
                      <span>{candidate.projects?.length || 0} projects</span>
                      <span>•</span>
                      <span>{candidate.certificates?.length || 0} credentials</span>
                    </div>

                    <Link
                      to={`/recruiter/candidates/${candidate.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97043] hover:text-[#C55F34] transition-colors"
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
        <div className="fixed inset-0 bg-[#1F2C23]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#EBE5D8] rounded-[36px] p-6 sm:p-8 w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5D8]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1F2C23]">Side-by-Side Candidate Comparison</h3>
                <p className="text-xs text-[#586E5F]">Comparing technical proof points and verified evidence</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-[#F8F5EE] text-[#1F2C23] text-xs font-semibold border border-[#DDD5C4]"
              >
                Close
              </button>
            </div>

            {isComparing ? (
              <div className="p-12 text-center text-[#586E5F] text-xs">Analyzing comparison signals...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EBE5D8]">
                      <th className="p-3 text-[#586E5F] font-semibold w-40">Attribute</th>
                      {compareData.map((c) => (
                        <th key={c.id} className="p-3 text-[#1F2C23] font-bold">
                          {c.user?.name}
                          <span className="block text-[11px] font-mono text-[#385241] font-bold mt-0.5">
                            {c.completenessScore}% Proof Score
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE5D8]">
                    <tr>
                      <td className="p-3 text-[#586E5F] font-semibold">Headline</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-[#405446]">
                          {c.headline || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-[#586E5F] font-semibold">Verified Projects</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-[#405446]">
                          {c.projects?.length || 0}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-[#586E5F] font-semibold">Certifications</td>
                      {compareData.map((c) => (
                        <td key={c.id} className="p-3 text-[#405446]">
                          {c.certificates?.length || 0}
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
