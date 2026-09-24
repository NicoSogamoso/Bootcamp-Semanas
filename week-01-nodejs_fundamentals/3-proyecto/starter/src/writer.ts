import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function writeReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  await mkdir(outputDir, { recursive: true });

  const filePath = join(outputDir, 'report.json');
  const content = JSON.stringify(report, null, 2);
  await writeFile(filePath, content, 'utf-8');

  console.log(`📄 Reporte guardado en: ${filePath}`);
}
