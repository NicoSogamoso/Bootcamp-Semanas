import { readMembers } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

function parseCategoryFilter(): string | null {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');
  if (categoryIndex !== -1 && args[categoryIndex + 1]) {
    return args[categoryIndex + 1];
  }
  return null;
}

async function main(): Promise<void> {
  try {
    const categoryFilter = parseCategoryFilter();

    console.log('🏛️  Club Social — Procesador de socios\n');

    const members = await readMembers();
    console.log(`📂 Leídos ${members.length} socios desde data/members.json`);

    const filtered = filterByCategory(members, categoryFilter);
    if (categoryFilter) {
      console.log(`🔍 Filtro aplicado: membershipType = "${categoryFilter}" (${filtered.length} resultados)`);
    }

    const summary = calculateSummary(filtered);

    console.log('\n── Resumen ──────────────────────────');
    console.log(`  Total:          ${summary.total}`);
    console.log(`  Activos:        ${summary.active}`);
    console.log(`  Inactivos:      ${summary.inactive}`);
    console.log(`  Cuota promedio: $${summary.averageFee.toLocaleString('es-CO')}`);
    console.log(`  Más cara:       ${summary.mostExpensive.fullName} ($${summary.mostExpensive.monthlyFee.toLocaleString('es-CO')})`);
    console.log(`  Más barata:     ${summary.cheapest.fullName} ($${summary.cheapest.monthlyFee.toLocaleString('es-CO')})`);
    console.log(`  Tipos:          ${summary.categories.join(', ')}`);
    console.log('─────────────────────────────────────\n');

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filtered,
    };

    await writeReport(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Error: ${message}`);
    process.exit(1);
  }
}

main();
