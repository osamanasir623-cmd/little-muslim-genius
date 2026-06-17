import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../services/emailService.js';


function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function buildUserPayload(user) {
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

  return {
    token: generateToken(user.id),
    user: {
      id:       user.id,
      email:    user.email,
      language: user.language,
      muted:    user.muted,
      isAdmin:  user.isAdmin || (process.env.ADMIN_EMAIL?.toLowerCase() === user.email) || false,
    },
    payment: {
      status:             user.paymentStatus,
      paidAt:             user.paidAt,
      method:             user.paymentMethod,
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
  };
}

// ── POST /api/auth/signup ────────────────────────────────────────
export async function signup(req, res, next) {
  try {
    const { email, password, language = 'en' } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ message: 'Enter a valid email address' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) return res.status(409).json({ message: 'An account with this email already exists' });

    const passwordHash = await bcrypt.hash(password, 12);
    const adminEmail   = process.env.ADMIN_EMAIL?.toLowerCase();

    const user = await prisma.user.create({
      data: {
        email:        email.toLowerCase(),
        passwordHash,
        language,
        lastLogin:    new Date(),
        isAdmin:      adminEmail === email.toLowerCase(),
      },
    });

    sendWelcomeEmail(user.email).catch(console.error);

    const payload = await buildUserPayload(user);
    res.status(201).json(payload);
  } catch (err) { next(err); }
}

// ── POST /api/auth/login ─────────────────────────────────────────
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (user.blocked) return res.status(403).json({ message: 'Account suspended. Contact support.' });

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    const payload = await buildUserPayload(user);
    res.json(payload);
  } catch (err) { next(err); }
}

// ── POST /api/auth/forgot-password ──────────────────────────────
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.json({ message: 'If that email exists, a reset link has been sent.' });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashed   = crypto.createHash('sha256').update(rawToken).digest('hex');

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken:   hashed,
        passwordResetExpires: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}?reset=${rawToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) { next(err); }
}

// ── POST /api/auth/reset-password ───────────────────────────────
export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: 'Token and new password are required' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });

    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken:   hashed,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) return res.status(400).json({ message: 'Reset link is invalid or has expired' });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash:         await bcrypt.hash(password, 12),
        passwordResetToken:   null,
        passwordResetExpires: null,
      },
    });

    res.json({ message: 'Password updated successfully. Please log in.' });
  } catch (err) { next(err); }
}
