import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { ShieldCheck, Plus, Trash2, ExternalLink, RefreshCw, AlertCircle, Info, Sparkles, Award } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { BocSparkle, TactileSticker } from '../../components/common/CreativeArt';

export const StudentEvidencePage: React.FC = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [doesNotExpire, setDoesNotExpire] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setCertificates(data.certificates || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/student/certificates', {
        title,
        issuer,
        credentialId: credentialId || null,
        credentialUrl: credentialUrl || null,
        issueDate: issueDate || new Date().toISOString().split('T')[0],
        expiryDate: doesNotExpire ? null : expiryDate || null,
        doesNotExpire,
      });

      setShowModal(false);
      setTitle('');
      setIssuer('');
      setCredentialId('');
      setCredentialUrl('');
      setIssueDate('');
      setExpiryDate('');
      setDoesNotExpire(false);
      loadCertificates();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    try {
      await api.post(`/student/certificates/${id}/verify`);
      await loadCertificates();
    } catch (e) {
      console.error(e);
    } finally {
      setVerifyingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/student/certificates/${id}`);
      loadCertificates();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#080c16] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#ff451a] animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">RETRIEVING VERIFIED CREDENTIALS...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#0c1326]/90 border border-white/10 p-5 sm:p-8 overflow-hidden shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ff451a]/15 via-[#00f59b]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <TactileSticker color="lime" text="HONEST VERIFICATION VAULT" />
            <BocSparkle size={18} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Certificates & Credential Proof
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Attach official certifications from AWS, Coursera, freeCodeCamp, CNCF, or universities. Proofly verifies certificate URL accessibility and cryptographic issuer hashes.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] text-white font-black text-xs transition-transform hover:scale-105 shadow-glow-coral shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Credential
        </button>
      </div>

      {/* Information Notice */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex items-start gap-3.5 text-xs text-slate-300">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-white font-sans">Evidence Integrity Protocol: </span>
          <p className="text-slate-400 leading-relaxed">
            Proofly evaluates verification URLs, reachable web endpoints, official issuer APIs, and expiration timetables. We never generate superficial or fake verification badges.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 mx-auto flex items-center justify-center text-slate-500">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">No certifications recorded yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Add recognized certifications with verification URLs to enhance your verified completeness score.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors"
            >
              Add First Credential
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all shadow-md group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h3>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  <span>{cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-slate-400 font-mono ml-2 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                  {cert.doesNotExpire ? (
                    <span className="text-emerald-400 font-bold">No Expiry</span>
                  ) : cert.expiryDate ? (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  ) : null}
                  {cert.lastVerifiedAt && (
                    <span className="text-slate-500">
                      Verified: {new Date(cert.lastVerifiedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {cert.credentialUrl && (
                  <div className="pt-1">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Inspect Credential Evidence</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleVerify(cert.id)}
                  disabled={verifyingId === cert.id}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${verifyingId === cert.id ? 'animate-spin' : ''}`} />
                  {verifyingId === cert.id ? 'Checking...' : 'Re-verify'}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Certificate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white font-sans">Add Verified Credential</h3>
            <form onSubmit={handleAddCertificate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Issuer Name
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Amazon Web Services, Coursera, Meta"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Verification URL / Credly Link
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://www.credly.com/badges/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="e.g. AWS-SAA-839201"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    disabled={doesNotExpire}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs disabled:opacity-30 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="doesNotExpire"
                  checked={doesNotExpire}
                  onChange={(e) => setDoesNotExpire(e.target.checked)}
                  className="rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="doesNotExpire" className="text-xs text-slate-300 font-mono">
                  This credential does not expire
                </label>
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
                  Add Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
