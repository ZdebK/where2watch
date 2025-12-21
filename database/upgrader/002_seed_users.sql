-- Seed: 002_SeedUsersTable
-- Description: Insert sample users (passwords pre-hashed by seed runner)
-- Created: 2024-12-21

INSERT INTO users (username, email, password_hash, created_at) VALUES
  ('alice', 'alice@example.com', '$2a$10$973Mc.HymYcDBKwoSije.OqzEfeqvlEKrI8XJRK5ncTwOzhpqS2A2', CURRENT_TIMESTAMP),
  ('bob', 'bob@example.com', '$2a$10$7BIDUyvONCoPGJrsj7qDwuUR/902DD8b9KjCTxzhtPv04eDRiuT2O', CURRENT_TIMESTAMP),
  ('charlie', 'charlie@example.com', '$2a$10$J5qMU11/yfNfaCHFrpEd6eWIkHbayO5tt8DYnHWGwgmck6JedxjoO', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;
