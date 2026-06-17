import prisma from '../config/prisma.js';

function fmt(d) {
  return { _id: d.id, dayNumber: d.dayNumber, world: d.world, title: d.title, games: d.games, active: d.active };
}

// GET /api/content/days — public
export async function getDays(req, res, next) {
  try {
    const days = await prisma.day.findMany({ where: { active: true }, orderBy: { dayNumber: 'asc' } });
    res.json(days.map(fmt));
  } catch (err) { next(err); }
}

// GET /api/admin/content/days
export async function adminListDays(req, res, next) {
  try {
    const days = await prisma.day.findMany({ orderBy: { dayNumber: 'asc' } });
    res.json(days.map(fmt));
  } catch (err) { next(err); }
}

// POST /api/admin/content/days
export async function adminCreateDay(req, res, next) {
  try {
    const { dayNumber, world, title, games, active } = req.body;
    if (!dayNumber || !title?.en || !title?.ur) {
      return res.status(400).json({ message: 'dayNumber, title.en and title.ur are required' });
    }
    const day = await prisma.day.create({
      data: { dayNumber: Number(dayNumber), world: world || 'light', title, games: games || [], active: active !== false },
    });
    res.status(201).json(fmt(day));
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ message: `Day ${req.body.dayNumber} already exists` });
    next(err);
  }
}

// PUT /api/admin/content/days/:id
export async function adminUpdateDay(req, res, next) {
  try {
    const { world, title, games, active, dayNumber } = req.body;
    const day = await prisma.day.update({
      where: { id: req.params.id },
      data: {
        ...(world     !== undefined && { world }),
        ...(title     !== undefined && { title }),
        ...(games     !== undefined && { games }),
        ...(active    !== undefined && { active }),
        ...(dayNumber !== undefined && { dayNumber: Number(dayNumber) }),
      },
    });
    res.json(fmt(day));
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Day not found' });
    next(err);
  }
}

// DELETE /api/admin/content/days/:id
export async function adminDeleteDay(req, res, next) {
  try {
    const day = await prisma.day.delete({ where: { id: req.params.id } });
    res.json({ message: `Day ${day.dayNumber} deleted` });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Day not found' });
    next(err);
  }
}
