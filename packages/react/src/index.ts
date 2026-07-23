import { useState, useCallback } from 'react';
import { OpenTrust } from 'opentrust-sdk';
import type { OpenTrustOptions, OpenTrustResult } from 'opentrust-sdk';

interface UseOpenTrustResult {
  result: OpenTrustResult | null;
  loading: boolean;
  error: string | null;
  verify: (options?: OpenTrustOptions) => Promise<OpenTrustResult>;
}

export function useOpenTrust(): UseOpenTrustResult {
  const [result, setResult] = useState<OpenTrustResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (options?: OpenTrustOptions) => {
    setLoading(true);
    setError(null);
    try {
      const res = await OpenTrust.verify(options ?? {});
      setResult(res);
      return res;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Verification failed';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, verify };
}
