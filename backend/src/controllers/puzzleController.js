import prisma from '../config/prisma.js';

// GET /api/puzzles — all active puzzles (any logged-in user)
export async function listPuzzles(req, res, next) {
  try {
    const puzzles = await prisma.puzzle.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    res.json(puzzles);
  } catch (err) { next(err); }
}

// POST /api/admin/puzzles — create (admin only)
export async function adminCreatePuzzle(req, res, next) {
  try {
    const { topic, title, pieces, learnFact, order } = req.body;
    if (!topic || !title?.en || !pieces?.length || !learnFact) {
      return res.status(400).json({ message: 'topic, title.en, pieces[], and learnFact are required' });
    }
    const puzzle = await prisma.puzzle.create({
      data: {
        topic,
        title,
        pieces,
        learnFact,
        order: order ?? 0,
      },
    });
    res.status(201).json(puzzle);
  } catch (err) { next(err); }
}

// PUT /api/admin/puzzles/:id — update (admin only)
export async function adminUpdatePuzzle(req, res, next) {
  try {
    const { topic, title, pieces, learnFact, active, order } = req.body;
    const puzzle = await prisma.puzzle.findUnique({ where: { id: req.params.id } });
    if (!puzzle) return res.status(404).json({ message: 'Puzzle not found' });

    const updated = await prisma.puzzle.update({
      where: { id: puzzle.id },
      data: {
        ...(topic     !== undefined && { topic }),
        ...(title     !== undefined && { title }),
        ...(pieces    !== undefined && { pieces }),
        ...(learnFact !== undefined && { learnFact }),
        ...(active    !== undefined && { active }),
        ...(order     !== undefined && { order }),
      },
    });
    res.json(updated);
  } catch (err) { next(err); }
}

// DELETE /api/admin/puzzles/:id — delete (admin only)
export async function adminDeletePuzzle(req, res, next) {
  try {
    const puzzle = await prisma.puzzle.findUnique({ where: { id: req.params.id } });
    if (!puzzle) return res.status(404).json({ message: 'Puzzle not found' });
    await prisma.puzzle.delete({ where: { id: puzzle.id } });
    res.json({ message: 'Puzzle deleted' });
  } catch (err) { next(err); }
}
