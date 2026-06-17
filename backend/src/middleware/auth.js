import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export async function protect(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized — no token' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: 'User no longer exists' });
    if (user.blocked) return res.status(403).json({ message: 'Account suspended. Contact support.' });

    req.user = user;
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError'
      ? 'Token expired — please log in again'
      : 'Token invalid';
    return res.status(401).json({ message: msg });
  }
}

export function adminProtect(req, res, next) {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const isAdmin = req.user?.isAdmin || (adminEmail && req.user?.email === adminEmail);
  if (!isAdmin) return res.status(403).json({ message: 'Admin access required' });
  next();
}
