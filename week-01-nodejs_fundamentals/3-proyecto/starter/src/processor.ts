import type { Member, MemberSummary } from './types.js';

/**
 * Filtra por membershipType (usado como "category" en CLI: --category vip).
 * Comparación case-insensitive.
 */
export function filterByCategory(
  members: Member[],
  categoryFilter: string | null
): Member[] {
  if (categoryFilter === null) {
    return members;
  }

  const filter = categoryFilter.toLowerCase();
  const filtered = members.filter(
    (m) => m.membershipType.toLowerCase() === filter
  );

  if (filtered.length === 0) {
    const available = Array.from(
      new Set(members.map((m) => m.membershipType))
    ).join(', ');
    throw new Error(
      `No hay socios con membershipType "${categoryFilter}". Disponibles: ${available}`
    );
  }

  return filtered;
}

export function calculateSummary(members: Member[]): MemberSummary {
  if (members.length === 0) {
    throw new Error('No hay socios para calcular el resumen');
  }

  const active = members.filter((m) => m.active).length;
  const inactive = members.filter((m) => !m.active).length;

  const totalFees = members.reduce((sum, m) => sum + m.monthlyFee, 0);
  const averageFee = Math.round((totalFees / members.length) * 100) / 100;

  const mostExpensive = members.reduce((max, m) =>
    m.monthlyFee > max.monthlyFee ? m : max
  );
  const cheapest = members.reduce((min, m) =>
    m.monthlyFee < min.monthlyFee ? m : min
  );

  const categories = Array.from(
    new Set(members.map((m) => m.membershipType))
  );

  return {
    total: members.length,
    active,
    inactive,
    averageFee,
    mostExpensive,
    cheapest,
    categories,
  };
}
