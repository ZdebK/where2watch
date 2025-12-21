# Unit Tests

Testing suite dla Where2Watch - sprawdzanie połączenia do bazy danych i usług.

## Setup

Testy używają **Jest** + **ts-jest** do testowania TypeScript kodu.

## Struktura testów

```
src/
└── __tests__/
    ├── database.test.ts        # Testy połączenia z PostgreSQL
    ├── auth.service.test.ts    # Testy authentication service
```

## Uruchamianie testów

```bash
# Wszystkie testy
npm test

# Watch mode (automatycznie re-run przy zmianach)
npm run test:watch

# Tylko testy bazy danych
npm run test:db

# Tylko testy auth service
npm run test:auth

# Coverage report
npm run test:coverage
```

## Testy bazy danych (`database.test.ts`)

Sprawdzają:
- ✅ Połączenie z PostgreSQL
- ✅ Czy można wykonywać queries
- ✅ Czy istnieją wszystkie tabele:
  - `Users`
  - `Movies`
  - `StreamingSites`
  - `MovieStreamingSites`
- ✅ Czy kolumny w tabelach są poprawne

### Wymagania

Muszą być spełnione warunki:
1. PostgreSQL musi być uruchomiony
2. `.env` musi mieć poprawne parametry `DB_*`
3. Upgrady musiały być uruchomione (`npm run db:upgrade`)

### Przykład sukcesu

```
PASS  src/__tests__/database.test.ts (5.234s)
  Database Connection
    ✓ should connect to database successfully (45ms)
    ✓ should be able to execute queries (32ms)
    ✓ should have Users table (28ms)
    ✓ should have Movies table (25ms)
    ✓ should have StreamingSites table (24ms)
    ✓ should have MovieStreamingSites junction table (22ms)
    ✓ should have Users table with correct columns (19ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
```

## Testy Auth Service (`auth.service.test.ts`)

Sprawdzają:
- ✅ Token management (set, get, clear)
- ✅ Authentication status
- ✅ Authorization headers
- ✅ localStorage operations

### Przykład sukcesu

```
PASS  src/__tests__/auth.service.test.ts
  AuthService
    ✓ should not have token on initialization (2ms)
    ✓ should set and get token (1ms)
    ✓ should clear token (2ms)
    ✓ should correctly report authentication status (1ms)
    ✓ should provide correct auth headers without token (1ms)
    ✓ should provide correct auth headers with token (1ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

## Dodawanie nowych testów

1. Stwórz plik `src/__tests__/my-feature.test.ts`
2. Zaimportuj funkcje do testowania
3. Użyj `describe()` i `it()` do organizacji testów
4. Uruchom `npm test`

### Szablon testu

```typescript
/**
 * My Feature Test
 */

import { myFunction } from '../services/my.service';

describe('MyFeature', () => {
  beforeEach(() => {
    // Przygotowanie przed każdym testem
  });

  afterEach(() => {
    // Czyszczenie po każdym teście
  });

  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(true);
  });
});
```

## Debugging testów

```bash
# Run z debuggingiem
node --inspect-brk node_modules/.bin/jest --runInBand

# Lub w VS Code: F5 z configuration do jest
```

## Best Practices

✅ **Test organization**
- Jeden test file = jedna klasa/service
- Logiczne groupowanie w `describe()`
- Descriptive test names

✅ **Test isolation**
- `beforeEach()` - przygotowanie
- `afterEach()` - czyszczenie
- Brak zależności między testami

✅ **Assertions**
- Jeden `expect` na test (jeśli możliwe)
- Jasne komunikaty o błędach
- Test sprawdza jedno zachowanie

✅ **Async testing**
```typescript
it('should handle async', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

## Troubleshooting

### "Cannot find module"
```
rm -rf node_modules
npm install
```

### "Database connection failed"
- Sprawdź czy PostgreSQL działa
- Sprawdź `.env` zmienne
- Uruchom `npm run db:upgrade`

### "Test timeout"
Zwiększ timeout:
```typescript
it('slow test', async () => {
  // test
}, 10000); // 10 second timeout
```
