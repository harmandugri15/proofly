import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { ShieldCheck, Plus, Trash2, ExternalLink, RefreshCw, AlertCircle, Info, Sparkles, Award } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING VERIFIED CREDENTIALS...</p>
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
              VERIFICATION VAULT
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-terracotta-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Certificates & Credential Proof
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Attach official certifications from AWS, Coursera, freeCodeCamp, CNCF, or universities. Proofly verifies certificate URL accessibility and cryptographic issuer hashes.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Credential
        </button>
      </div>

      {/* Information Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sand-50/80 border border-sand-200/80 flex items-start gap-3.5 text-xs text-forest-800">
        <div className="w-8 h-8 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center shrink-0 text-sage-800 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="font-serif font-normal text-forest-900 text-sm">Evidence Integrity Protocol: </span>
          <p className="text-forest-700/70 leading-relaxed">
            Proofly evaluates verification URLs, reachable web endpoints, official issuer APIs, and expiration timetables. We never generate superficial or fake verification badges.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-sand-100 border border-sand-200 mx-auto flex items-center justify-center text-forest-700/40">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-base font-serif font-normal text-forest-900">No certifications recorded yet</h3>
          <p className="text-xs text-forest-700/70 max-w-sm mx-auto leading-relaxed">
            Add recognized certifications with verification URLs to enhance your verified completeness score.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
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
              className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-sand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-sage-400/60 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm sm:text-base font-serif font-normal text-forest-900 group-hover:text-terracotta-600 transition-colors">
                    {cert.title}
                  </h3>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>

                <p className="text-xs text-forest-700/80 font-medium">
                  <span>{cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-forest-700/60 font-mono ml-2 bg-sand-100 px-2 py-0.5 rounded-full border border-sand-200">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-forest-700/60 font-mono">
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                  {cert.doesNotExpire ? (
                    <span className="text-sage-700 font-bold">No Expiry</span>
                  ) : cert.expiryDate ? (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  ) : null}
                  {cert.lastVerifiedAt && (
                    <span className="text-forest-700/50">
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta-600 hover:text-terracotta-700 transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-sage-600 ${verifyingId === cert.id ? 'animate-spin' : ''}`} />
                  {verifyingId === cert.id ? 'Checking...' : 'Re-verify'}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 rounded-full text-forest-700/40 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
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
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-normal text-forest-900">Add Verified Credential</h3>
            <form onSubmit={handleAddCertificate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Issuer Name
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Amazon Web Services, Coursera, Meta"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Verification URL / Credly Link
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://www.credly.com/badges/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="e.g. AWS-SAA-839201"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    disabled={doesNotExpire}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs disabled:opacity-30 focus:outline-none focus:border-sage-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="doesNotExpire"
                  checked={doesNotExpire}
                  onChange={(e) => setDoesNotExpire(e.target.checked)}
                  className="rounded border-sand-300 text-sage-600 focus:ring-0"
                />
                <label htmlFor="doesNotExpire" className="text-xs text-forest-700/80 font-mono">
                  This credential does not expire
                </label>
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
