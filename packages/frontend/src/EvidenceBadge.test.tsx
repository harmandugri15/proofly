import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { EvidenceBadge } from './components/common/EvidenceBadge';

describe('EvidenceBadge Component', () => {
  it('should render Issuer Verified badge for ISSUER_VERIFIED status', () => {
    const html = renderToString(<EvidenceBadge status="ISSUER_VERIFIED" />);
    expect(html).toContain('Issuer Verified');
    expect(html).toContain('text-emerald-400');
  });

  it('should render Demo Verified badge for DEMO_VERIFIED status', () => {
    const html = renderToString(<EvidenceBadge status="DEMO_VERIFIED" />);
    expect(html).toContain('Demo Verified');
    expect(html).toContain('text-teal-400');
  });

  it('should render Expired badge for EXPIRED status', () => {
    const html = renderToString(<EvidenceBadge status="EXPIRED" />);
    expect(html).toContain('Expired');
    expect(html).toContain('text-rose-400');
  });

  it('should render Unverified badge for default status', () => {
    const html = renderToString(<EvidenceBadge status="UNVERIFIED" />);
    expect(html).toContain('Unverified');
  });
});
