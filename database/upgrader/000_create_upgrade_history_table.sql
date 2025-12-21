-- Migration: 000_CreateUpgradeHistoryTable
-- Description: Create upgrade_history table to track applied migrations
-- Created: 2024-12-21

CREATE TABLE IF NOT EXISTS upgrade_history (
  id SERIAL PRIMARY KEY,
  upgrade_name VARCHAR(255) NOT NULL UNIQUE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_upgrade_history_name ON upgrade_history(upgrade_name);
