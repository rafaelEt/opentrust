# OpenTrust React

React hook for the OpenTrust SDK.

```bash
npm install opentrust-react
```

```tsx
import { useOpenTrust } from 'opentrust-react';

function VerifyButton() {
  const { result, loading, verify } = useOpenTrust();

  return (
    <button onClick={() => verify({ camera: true })} disabled={loading}>
      {loading ? 'Verifying...' : "Verify I'm Human"}
    </button>
  );
}
```

[GitHub](https://github.com/rafaelEt/opentrust) · [Docs](https://github.com/rafaelEt/opentrust#readme) · MIT License
