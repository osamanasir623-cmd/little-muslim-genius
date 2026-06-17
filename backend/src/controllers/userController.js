import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

// ── GET /api/user/me ─────────────────────────────────────────────
export async function getMe(req, res, next) {
  try {
    const user = req.user;
    const profiles = await prisma.profile.findMany({
      where: { userId: user.id },
      include: { data: true },
    });

    const profileData = {};
    profiles.forEach((p) => {
      profileData[p.id] = {
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
      };
    });

    res.json({
      user: {
        id:       user.id,
        email:    user.email,
        language: user.language,
        muted:    user.muted,
        isAdmin:  user.isAdmin || (process.env.ADMIN_EMAIL?.toLowerCase() === user.email) || false,
      },
      payment: {
        status:              user.paymentStatus,
        paidAt:              user.paidAt,
        method:              user.paymentMethod,
        subscriptionEndDate: user.subscriptionEndDate,
      },
      profiles: profiles.map((p) => ({
        id:                  p.id,
        name:                p.name,
        avatar:              p.avatar,
        age:                 p.age,
        language_preference: p.languagePreference,
      })),
      profileData,
    });
  } catch (err) { next(err); }
}

// ── PUT /api/user/settings ────────────────────────────────────────
export async function updateSettings(req, res, next) {
  try {
    const { language, muted, email, currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const patch = {};

    if (language) patch.language = language;
    if (muted !== undefined) patch.muted = Boolean(muted);

    if (email && email !== user.email) {
      const taken = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      if (taken) return res.status(409).json({ message: 'That email is already in use' });
      patch.email = email.toLowerCase();
    }

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password is required' });
      if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      if (newPassword.length < 8) return res.status(400).json({ message: 'New password must be at least 8 characters' });
      patch.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    const updated = await prisma.user.update({ where: { id: user.id }, data: patch });
    res.json({ message: 'Settings updated', language: updated.language, muted: updated.muted, email: updated.email });
  } catch (err) { next(err); }
}

// ── GET /api/user/billing ─────────────────────────────────────────
export async function getBillingHistory(req, res, next) {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(payments.map((p) => ({
      id:            p.id,
      amountPkr:     p.amountPkr,
      currency:      p.currency,
      gateway:       p.paymentGateway,
      transactionId: p.transactionId,
      status:        p.status,
      createdAt:     p.createdAt,
    })));
  } catch (err) { next(err); }
}

// ── DELETE /api/user ──────────────────────────────────────────────
export async function deleteAccount(req, res, next) {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password confirmation required' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Cascade delete handles profiles, profileData, payments automatically
    await prisma.user.delete({ where: { id: user.id } });
    res.json({ message: 'Account and all data permanently deleted.' });
  } catch (err) { next(err); }
}
