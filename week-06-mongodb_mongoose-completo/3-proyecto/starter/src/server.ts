import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './lib/mongoose.js';

const PORT = Number(process.env.PORT ?? 3000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/club-social-semana-06';

async function main() {
  await connectDB(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/v1/health`);
  });
}

main().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
