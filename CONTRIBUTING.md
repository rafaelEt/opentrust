# Contributing to OpenTrust

We welcome contributions! Here's how to get started.

## Development

```bash
git clone https://github.com/rafaelEt/opentrust.git
cd opentrust
npm install
npm run build
```

## Project Structure

```
packages/
  core/     # OpenTrust SDK (opentrust-sdk)
  react/    # React hook (opentrust-react)
  demo/     # Landing page demo
examples/
  react-app/  # Example React app
```

## Running Tests

```bash
npm test
```

## Making Changes

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test`
5. Build: `npm run build`
6. Push and open a PR

## Guidelines

- Keep the SDK privacy-first — no server-side processing
- Add tests for new detection patterns
- Use TypeScript with strict mode
- Follow the existing code style (no semicolons, 2-space indent)
