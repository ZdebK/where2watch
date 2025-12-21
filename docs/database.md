# Database Upgrader

Struktura upgradera SQL dla zachowania kompatybilności wstecznej i wersjonowania schematu bazy danych.

## Struktura

```
database/
└── upgrader/
    ├── 001_create_users_table.sql
    ├── 002_create_movies_table.sql
    ├── 003_create_streaming_sites_table.sql
    ├── 004_create_movie_streaming_sites_table.sql
    └── UPGRADER_HISTORY.md
```

## Konwencja nazewnictwa

Każdy upgrade ma format: `NNN_DescriptiveName.sql`
- `NNN` - numer sekwencyjny (001, 002, 003, ...)
- Upgrady są uruchamiane w kolejności numerycznej
- Każdy upgrade powinien być idempotentny (użyj `IF NOT EXISTS`)

## Dodawanie nowych upgraderów

1. Stwórz nowy plik w formacie `NNN_Description.sql`
2. Dodaj `IF NOT EXISTS` lub `IF NOT` do operacji DDL
3. Dodaj indeksy dla kolumn, które będą używane w WHERE/JOIN
4. Dodaj foreign keys z `ON DELETE CASCADE` jeśli potrzebne
5. Uruchom: `npm run db:upgrade`

## Biegła migracja SQL

```sql
-- Każdy upgrade powinien być idempotentny
-- Czyli bezpieczny do wielokrotnego uruchomienia

CREATE TABLE IF NOT EXISTS "table_name" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ...
);

CREATE INDEX IF NOT EXISTS idx_name ON "table_name"(column);
```

## Komendy

```bash
# Uruchom wszystkie pending upgrades
npm run db:upgrade

# Sprawdź status upgradów (manual check w database folder)
cat database/upgrader/UPGRADER_HISTORY.md
```

## Best Practices

✅ **Zawsze używaj `IF NOT EXISTS`** - bezpieczne do wielokrotnego uruchomienia
✅ **Dodawaj indeksy** - dla kolumn w WHERE, JOIN, ORDER BY
✅ **Dokumentuj zmiany** - komentarz na górze każdego SQL
✅ **Testuj upgrady** - sprawdź rollback scenario
✅ **Numeruj sekwencyjnie** - nie zmieniaj numerów istniejących upgraderów
✅ **Dodawaj timestamps** - `created_at`, `updated_at`

## Rollback

W PostgreSQL nie ma "automatycznego" rollback z SQL scripts. Aby wycofać upgrade:

1. Utwórz nowy upgrade z instrukcjami DROP
2. Lub wykonaj ręczne DROP w database shell

Przykład rollback upgradu:
```sql
-- 005_RollbackPreviousUpgrade.sql
DROP TABLE IF EXISTS "table_to_drop";
DROP INDEX IF EXISTS idx_name;
```
