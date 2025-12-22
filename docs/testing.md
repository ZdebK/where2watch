# Aktualny stan testów (22.12.2025)

Wszystkie testy frontendowe przechodzą poprawnie:

Test Suites: 5 passed, 5 total
Tests: 15 passed, 15 total

## Przykład testu (MovieList)

```typescript
import { render, screen } from '@testing-library/react';
import { MovieList } from '../components/movie-list';

function mockFetchJson(data: any) {
  return jest.fn(() => Promise.resolve({
    ok: true,
    status: 200,
    headers: { get: () => '123' },
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  }));
}

global.fetch = mockFetchJson([...]);
render(<MovieList />);
expect(await screen.findByText('Matrix')).toBeInTheDocument();
```

## Best practices
- Mockuj fetch w każdym teście, jeśli komponent korzysta z API
- Używaj providerów (AuthProvider, StreamingSitesProvider) jeśli komponent ich wymaga
- Resetuj mocki w beforeEach
- Sprawdzaj rzeczywiste komunikaty błędów w asercjach

## Troubleshooting
- Jeśli test nie przechodzi, sprawdź czy dane testowe mają odpowiedni kształt
- Jeśli pojawia się błąd z fetch, zamockuj go jak wyżej

## Raport
Test Suites: 5 passed, 5 total
Tests: 15 passed, 15 total


# Testing (Frontend)

Testy frontendowe korzystają z **Jest** oraz **React Testing Library**.

## Struktura testów

```
client/src/__tests__/
  ├── movie-list.test.tsx      # Testy listy filmów
  ├── auth.service.test.ts     # Testy serwisu autoryzacji
  ...
```

## Uruchamianie testów

```powershell
Push-Location "c:\projects\where2watch\where2watch\client"
npm test
Pop-Location
```

Możesz uruchomić wybrane testy:
```powershell
npm test -- --testPathPattern=movie-list
```

## Mockowanie fetch w testach

W testach komponentów korzystających z API (np. MovieList) należy zamockować `global.fetch`:

```typescript
function mockFetchJson(data: any) {
  return jest.fn(() => Promise.resolve({
    ok: true,
    status: 200,
    headers: { get: () => '123' },
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  }));
}
global.fetch = mockFetchJson([...]);
```

## Przykład testu komponentu

```typescript
import { render, screen } from '@testing-library/react';
import { MovieList } from '../components/movie-list';

it('fetches and displays movies', async () => {
  global.fetch = mockFetchJson([{ name: 'Matrix', ... }]);
  render(<MovieList />);
  expect(await screen.findByText('Matrix')).toBeInTheDocument();
});
```

## Przykład raportu

```
PASS  src/__tests__/movie-list.test.tsx
  Movie List
    √ fetches and displays movies after login (168 ms)
    √ handles empty movie list (43 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

## Troubleshooting

- Jeśli pojawia się błąd `Response is not defined`, użyj mocka jak powyżej (nie używaj klasy Response).
- Jeśli testy nie widzą tekstu, sprawdź czy dane testowe mają odpowiednie pola (`name`, `title`).
- Jeśli testy nie przechodzą przez brak kontekstu, owiń komponent w odpowiednie providery (np. `AuthProvider`, `StreamingSitesProvider`).

## Best Practices

- Każdy test powinien być niezależny (`beforeEach`, `afterEach` do czyszczenia mocków i localStorage).
- Testuj tylko jedno zachowanie na test.
- Używaj descriptive test names.

## Dodawanie nowych testów

1. Stwórz plik w `client/src/__tests__`
2. Zaimportuj testowany komponent/funkcję
3. Zamockuj zależności (fetch, context)
4. Uruchom `npm test`
