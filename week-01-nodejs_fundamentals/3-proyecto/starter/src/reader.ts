import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Member } from './types.js';

export async function readMembers(): Promise<Member[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'members.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Member[];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`No se pudo leer data/members.json: ${message}`);
  }
}
