/**
 * Database Upgrade CLI
 * Run: npm run db:upgrade
 */

import { initializeUpgrader } from './upgrader-runner';

async function main() {
  try {
    console.log('🔄 Starting database upgrades...\n');
    await initializeUpgrader();
    console.log('\n✅ Database upgrades completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database upgrades failed:');
    console.error(error);
    process.exit(1);
  }
}

main();
