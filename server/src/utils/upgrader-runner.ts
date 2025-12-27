

import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import { AppDataSource } from '../config/database';

// Load environment variables from .env file
dotenv.config();

/**
 * Database Upgrader Runner
 * Executes SQL upgrades from database/upgrader folder
 * Tracks applied upgrades to avoid re-running them
 */
export class UpgraderRunner {
  private upgraderPath = path.join(__dirname, '..', '..', '..', 'database', 'upgrader');
  private historyTableName = 'upgrade_history';

  /**
   * Get list of already applied upgrades
   */
  private async getAppliedUpgrades(): Promise<Set<string>> {
    try {
      // Check if table exists first
      const tableExists = await AppDataSource.query(`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_name = '${this.historyTableName}'
        );
      `);

      if (!tableExists[0].exists) {
        return new Set(); // Return empty set if table doesn't exist yet
      }

      const result = await AppDataSource.query(`
        SELECT upgrade_name FROM ${this.historyTableName}
      `);
      return new Set(result.map((row: any) => row.upgrade_name));
    } catch (error) {
      // If query fails, return empty set (table doesn't exist yet)
      return new Set();
    }
  }

  /**
   * Mark upgrade as applied
   */
  private async markUpgradeAsApplied(upgradeFile: string): Promise<void> {
    await AppDataSource.query(`
      INSERT INTO ${this.historyTableName} (upgrade_name) 
      VALUES ('${upgradeFile}')
    `);
  }

  /**
   * Run all pending upgrades
   */
  async runUpgrades(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('✓ Database connected');

      const upgradeFiles = this.getUpgradeFiles();
      const appliedUpgrades = await this.getAppliedUpgrades();

      const pendingUpgrades = upgradeFiles.filter(f => !appliedUpgrades.has(f));

      if (pendingUpgrades.length === 0) {
        console.log('✓ No pending upgrades');
        return;
      }

      for (const file of pendingUpgrades) {
        const filePath = path.join(this.upgraderPath, file);
        const sqlQuery = fs.readFileSync(filePath, 'utf-8');

        try {
          // Remove comment lines first
          const cleanedQuery = sqlQuery
            .split('\n')
            .filter(line => !line.trim().startsWith('--'))
            .join('\n');

          // Split by semicolon to handle multiple statements
          const statements = cleanedQuery
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

          for (const statement of statements) {
            await AppDataSource.query(statement);
          }

          await this.markUpgradeAsApplied(file);
          console.log(`✓ Applied upgrade: ${file}`);
        } catch (error) {
          console.error(`✗ Failed to apply upgrade: ${file}`);
          throw error;
        }
      }

      console.log('✓ All upgrades applied successfully');
    } catch (error) {
      console.error('Upgrade failed:', error);
      throw error;
    } finally {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }
    }
  }

  /**
   * Get sorted upgrade files
   */
  private getUpgradeFiles(): string[] {
    const files = fs.readdirSync(this.upgraderPath);
    return files
      .filter(f => f.endsWith('.sql'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_')[0]);
        const numB = parseInt(b.split('_')[0]);
        return numA - numB;
      });
  }
}

/**
 * Run upgrades on startup
 */
export async function initializeUpgrader(): Promise<void> {
  const shouldRunUpgrades = process.env.RUN_UPGRADES === 'true';

  if (!shouldRunUpgrades) {
    console.log('Database upgrades disabled (RUN_UPGRADES not set to true in .env)');
    return;
  }

  const runner = new UpgraderRunner();
  await runner.runUpgrades();
}
