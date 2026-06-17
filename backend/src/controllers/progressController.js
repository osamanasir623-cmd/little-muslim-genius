import prisma from '../config/prisma.js';

function today() { return new Date().toISOString().slice(0, 10); }

async function getOwnedData(profileId, userId) {
  const profile = await prisma.profile.findFirst({ where: { id: profileId, userId } });
  if (!profile) return null;
  return prisma.profileData.findUnique({ where: { profileId: profile.id } });
}

// ── POST /api/progress/:profileId/complete ───────────────────────
export async function completeDay(req, res, next) {
  try {
    const { dayNumber } = req.body;
    if (!dayNumber) return res.status(400).json({ message: 'dayNumber is required' });

    const data = await getOwnedData(req.params.profileId, req.user.id);
    if (!data) return res.status(404).json({ message: 'Profile not found' });

    const dn = Number(dayNumber);
    if (data.completedDays.includes(dn)) {
      return res.json({
        completedDays: data.completedDays, currentDay: data.currentDay,
        lastCompletedDate: data.lastCompletedDate, badges: data.badges,
        cartoonUnlocks: data.cartoonUnlocks,
      });
    }

    const completedDays    = [...data.completedDays, dn].sort((a, b) => a - b);
    const cartoonUnlocks   = dn % 3 === 0 ? [...data.cartoonUnlocks, dn] : data.cartoonUnlocks;
    const timerState       = typeof data.timerState === 'object' ? { ...data.timerState } : {};
    delete timerState[String(dn)];

    const updated = await prisma.profileData.update({
      where: { profileId: data.profileId },
      data: {
        completedDays,
        currentDay:        Math.max(...completedDays) + 1,
        lastCompletedDate: today(),
        badges:            data.badges + 1,
        cartoonUnlocks,
        timerState,
        lastAccessedAt:    new Date(),
      },
    });

    res.json({
      completedDays:     updated.completedDays,
      currentDay:        updated.currentDay,
      lastCompletedDate: updated.lastCompletedDate,
      badges:            updated.badges,
      cartoonUnlocks:    updated.cartoonUnlocks,
    });
  } catch (err) { next(err); }
}

// ── POST /api/progress/:profileId/rewards ───────────────────────
export async function addRewards(req, res, next) {
  try {
    const { stars = 0, beads = 0 } = req.body;
    const data = await getOwnedData(req.params.profileId, req.user.id);
    if (!data) return res.status(404).json({ message: 'Profile not found' });

    const updated = await prisma.profileData.update({
      where: { profileId: data.profileId },
      data: { stars: data.stars + Number(stars), beads: data.beads + Number(beads), lastAccessedAt: new Date() },
    });

    res.json({ stars: updated.stars, beads: updated.beads });
  } catch (err) { next(err); }
}

// ── PUT /api/progress/:profileId/timer ──────────────────────────
export async function saveTimer(req, res, next) {
  try {
    const { dayNumber, secondsLeft } = req.body;
    if (dayNumber == null || secondsLeft == null) {
      return res.status(400).json({ message: 'dayNumber and secondsLeft are required' });
    }

    const data = await getOwnedData(req.params.profileId, req.user.id);
    if (!data) return res.status(404).json({ message: 'Profile not found' });

    const timerState = typeof data.timerState === 'object' ? { ...data.timerState } : {};
    timerState[String(dayNumber)] = Number(secondsLeft);

    await prisma.profileData.update({
      where: { profileId: data.profileId },
      data: { timerState, lastAccessedAt: new Date() },
    });

    res.json({ ok: true });
  } catch (err) { next(err); }
}

// ── DELETE /api/progress/:profileId/timer/:dayNumber ─────────────
export async function clearTimer(req, res, next) {
  try {
    const data = await getOwnedData(req.params.profileId, req.user.id);
    if (!data) return res.status(404).json({ message: 'Profile not found' });

    const timerState = typeof data.timerState === 'object' ? { ...data.timerState } : {};
    delete timerState[String(req.params.dayNumber)];

    await prisma.profileData.update({
      where: { profileId: data.profileId },
      data: { timerState },
    });

    res.json({ ok: true });
  } catch (err) { next(err); }
}
