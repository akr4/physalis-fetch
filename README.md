# physalis-fetch

Fetch with timeout support and an ability to set default settings

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
