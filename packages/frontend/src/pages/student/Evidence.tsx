import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { ShieldCheck, Plus, Trash2, ExternalLink, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';

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
    return <div className="p-8 text-center text-slate-400">Loading credentials...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Certificates & Credentials</h1>
          <p className="text-sm text-slate-400 mt-1">
            Add official credentials from AWS, Coursera, freeCodeCamp, edX, or universities. Proofly verifies each source honestly.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors shadow-md shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" /> Add Credential
        </button>
      </div>

      {/* Information Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Honest Verification Standard: </span>
          Proofly differentiates between student-provided URLs, reachable web links, official issuer API records, and expired credentials. We never fabricate verification badges.
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No certifications added yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Add recognized certifications with verification URLs to enhance your verified score.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Add Your First Credential
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>

                <p className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-200">{cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-slate-400 font-mono ml-2">ID: {cert.credentialId}</span>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                  {cert.doesNotExpire ? (
                    <span className="text-emerald-400">Does not expire</span>
                  ) : cert.expiryDate ? (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  ) : null}
                  {cert.lastVerifiedAt && (
                    <span className="text-slate-500">
                      Last checked: {new Date(cert.lastVerifiedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline pt-1"
                  >
                    View Credential Record <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleVerify(cert.id)}
                  disabled={verifyingId === cert.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${verifyingId === cert.id ? 'animate-spin' : ''}`} />
                  {verifyingId === cert.id ? 'Verifying...' : 'Verify Credential'}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Certificate & Issuer Details</h3>
            <form onSubmit={handleAddCertificate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Issuer Name
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Amazon Web Services, Coursera, freeCodeCamp"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Verification URL / Credly Link
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://www.credly.com/badges/..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="e.g. AWS-SAA-839201"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    disabled={doesNotExpire}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs disabled:opacity-40 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="doesNotExpire"
                  checked={doesNotExpire}
                  onChange={(e) => setDoesNotExpire(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="doesNotExpire" className="text-xs text-slate-300">
                  This credential does not expire
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
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
