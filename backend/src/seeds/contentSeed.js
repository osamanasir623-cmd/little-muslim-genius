import prisma from '../config/prisma.js';
import { DAYS } from '../../../src/data/content.js';

const NEURO_TYPES   = new Set(['buildBrain','trainNetwork','layersGame','isThisACat','learningRace','designAI']);
const DATA_TYPES    = new Set(['makeChart','dataSort','patternFinder']);
const AI_TYPES      = new Set(['aiOrHuman','goodBadAI','robotChef','commandRobot']);
const COMPUTE_TYPES = new Set(['binary','inputOutput']);

function inferWorld(games) {
  const types = games.map((g) => g.type);
  if (types.some((t) => NEURO_TYPES.has(t)))   return 'neuro';
  if (types.some((t) => DATA_TYPES.has(t)))    return 'data';
  if (types.some((t) => AI_TYPES.has(t)))      return 'ai';
  if (types.some((t) => COMPUTE_TYPES.has(t))) return 'compute';
  return 'light';
}

export async function seedDaysIfEmpty() {
  const count = await prisma.day.count();
  if (count > 0) {
    console.log(`   Content: ${count} days already in DB — skipping seed.`);
    return;
  }

  await prisma.day.createMany({
    data: DAYS.map((d, i) => ({
      dayNumber: i + 1,
      world:     inferWorld(d.games),
      title:     d.title,
      games:     d.games,
      active:    true,
    })),
  });

  console.log(`   Content: seeded ${DAYS.length} days into PostgreSQL ✅`);
}
