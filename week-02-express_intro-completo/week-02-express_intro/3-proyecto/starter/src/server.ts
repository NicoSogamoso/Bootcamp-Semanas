import 'dotenv/config';
import { app } from './app.js';

const PORT = Number(process.env.PORT ?? 3000);

const server = app.listen(PORT, () => {
  console.log(`Club Social API → http://localhost:${PORT}`);
});

function shutdown(signal: string) {
  console.log(`\n${signal} received — shutting down`);
  server.close(() => process.exit(0));
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
