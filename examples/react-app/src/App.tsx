import React from 'react';
import { useOpenTrust } from 'opentrust-react';
import type { OpenTrustResult } from 'opentrust-sdk';

function ResultCard({ result }: { result: OpenTrustResult }) {
  return (
    <div style={{
      background: '#1e293b',
      borderRadius: 12,
      padding: 24,
      margin: 16,
      maxWidth: 480,
    }}>
      <h2 style={{ margin: 0, color: '#e2e8f0', fontSize: '1.5rem' }}>
        Human Score: {(result.humanScore * 100).toFixed(0)}%
      </h2>
      <pre style={{
        color: '#94a3b8',
        marginTop: 12,
        fontSize: '0.9rem',
        whiteSpace: 'pre-wrap',
      }}>
        {JSON.stringify(result.signals, null, 2)}
      </pre>
    </div>
  );
}

export function App() {
  const { result, loading, error, verify } = useOpenTrust();
  const [useCamera, setUseCamera] = React.useState(true);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 32,
      fontFamily: '-apple-system, sans-serif',
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 24,
      }}>
        OpenTrust + React
      </h1>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: '#94a3b8', marginRight: 8 }}>
          <input
            type="checkbox"
            checked={useCamera}
            onChange={(e) => setUseCamera(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Use Camera
        </label>
      </div>

      <button
        onClick={() => verify({ camera: useCamera })}
        disabled={loading}
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          padding: '12px 32px',
          borderRadius: 8,
          fontSize: '1rem',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Verifying...' : 'Run Verification'}
      </button>

      {error && (
        <p style={{ color: '#ef4444', marginTop: 12 }}>{error}</p>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}
