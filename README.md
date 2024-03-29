# physalis-fetch

Fetch with timeout support and an ability to set default settings

## Installation

Add the following line to the `.npmrc` in your project root.

```
@akr4:registry=https://npm.pkg.github.com/akr4
```

Then, install the package.

```
npm install @akr4/physalis-fetch
```

## Usage

Basic

```typescript
import { makeFetch } from '@akr4/physalis-fetch';

const fetch = makeFetch();
const response = await fetch('/foo');
```

With default settings

```typescript
import { makeFetch } from '@akr4/physalis-fetch';

const fetch = makeFetch({
  timeout: 30 * 1000,
  headers: { 'X-Custom-Header': 'foo' },
});
const response = await fetch('/foo');
```

With merged headers

```typescript
import { makeFetch, mergeHeaders } from '@akr4/physalis-fetch';

const fetch = makeFetch(
  {
    timeout: 30 * 1000,
    headers: { 'X-Custom-Header': 'foo' },
  },
  mergeHeaders,
);

const response = await fetch('/foo', {
  headers: { 'X-Custom-Header2': 'bar' },
});
```

Evaluate options on every fetch

```typescript
import { makeFetch } from '@akr4/physalis-fetch';

const fetch = makeFetch((init) => ({
  timeout: 30 * 1000,
  headers: { 'X-Custom-Header': getCustomHeaderValue() },
}));
```

## Release procedure

1. Bump version
2. Publish

```bash
npm publish
```
