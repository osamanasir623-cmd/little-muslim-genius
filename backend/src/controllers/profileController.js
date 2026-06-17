import prisma from '../config/prisma.js';

function today()     { return new Date().toISOString().slice(0, 10); }
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }

// ── GET /api/profiles ────────────────────────────────────────────
export async function getProfiles(req, res, next) {
  try {
    const profiles = await prisma.profile.findMany({
      where: { userId: req.user.id },
      include: { data: true },
    });

    res.json(profiles.map((p) => ({
      id: p.id, name: p.name, avatar: p.avatar, age: p.age,
      language_preference: p.languagePreference,
      data: {
        currentDay:        p.data?.currentDay        ?? 1,
        completedDays:     p.data?.completedDays      ?? [],
        lastCompletedDate: p.data?.lastCompletedDate  ?? null,
        timerState:        p.data?.timerState         ?? {},
        stars:             p.data?.stars              ?? 0,
        beads:             p.data?.beads              ?? 0,
        badges:            p.data?.badges             ?? 0,
        stickers:          p.data?.stickers           ?? 0,
        loginStreak:       p.data?.loginStreak        ?? 0,
        lastLoginDate:     p.data?.lastLoginDate      ?? null,
        cartoonUnlocks:    p.data?.cartoonUnlocks      ?? [],
        cityBuildings:     p.data?.cityBuildings       ?? [],
      },
    })));
  } catch (err) { next(err); }
}

// ── POST /api/profiles ───────────────────────────────────────────
export async function createProfile(req, res, next) {
  try {
    const count = await prisma.profile.count({ where: { userId: req.user.id } });
    if (count >= 4) return res.status(400).json({ message: 'Maximum 4 profiles per account' });

    const { name, avatar = '🐣', age } = req.body;
    if (!name || !age) return res.status(400).json({ message: 'Name and age are required' });

    const profile = await prisma.profile.create({
      data: { userId: req.user.id, name, avatar, age: Number(age) },
    });
    await prisma.profileData.create({ data: { profileId: profile.id } });

    res.status(201).json({ id: profile.id, name: profile.name, avatar: profile.avatar, age: profile.age });
  } catch (err) { next(err); }
}

// ── PUT /api/profiles/:id ────────────────────────────────────────
export async function updateProfile(req, res, next) {
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const { name, avatar, age, language_preference } = req.body;
    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        ...(name               && { name }),
        ...(avatar             && { avatar }),
        ...(age                && { age: Number(age) }),
        ...(language_preference && { languagePreference: language_preference }),
      },
    });

    res.json({ id: updated.id, name: updated.name, avatar: updated.avatar, age: updated.age });
  } catch (err) { next(err); }
}

// ── DELETE /api/profiles/:id ─────────────────────────────────────
export async function deleteProfile(req, res, next) {
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // Cascade delete handles profileData automatically
    await prisma.profile.delete({ where: { id: profile.id } });
    res.json({ message: 'Profile deleted' });
  } catch (err) { next(err); }
}

// ── PUT /api/profiles/:id/login ──────────────────────────────────
export async function recordLogin(req, res, next) {
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const data = await prisma.profileData.findUnique({ where: { profileId: profile.id } });
    if (!data) return res.status(404).json({ message: 'Profile data not found' });

    const td = today();
    if (data.lastLoginDate !== td) {
      const isConsecutive = data.lastLoginDate === yesterday();
      const newStreak  = isConsecutive ? data.loginStreak + 1 : 1;
      const newStickers = data.stickers + 1;

      await prisma.profileData.update({
        where: { profileId: profile.id },
        data: { loginStreak: newStreak, lastLoginDate: td, stickers: newStickers, lastAccessedAt: new Date() },
      });

      return res.json({ loginStreak: newStreak, lastLoginDate: td, stickers: newStickers });
    }

    res.json({ loginStreak: data.loginStreak, lastLoginDate: data.lastLoginDate, stickers: data.stickers });
  } catch (err) { next(err); }
}
