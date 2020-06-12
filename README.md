# physalis-fetch

Fetch with timeout support and an ability to set default settings

## Usage

```typescript
const fetch = makeFetch({
  timeout: 30 * 1000,
  headers: { 'X-Custom-Header': 'foo' },
});
```

or

```typescript
const fetch = makeFetch(init => {
    return {
      timeout: 30 * 1000,
      headers: { 'X-Custom-Header': 'foo', init.headers },
    };
  });
```
