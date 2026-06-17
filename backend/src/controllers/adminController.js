import prisma from '../config/prisma.js';

// GET /api/admin/stats
export async function getStats(req, res, next) {
  try {
    const [total, paid, blocked, activeToday] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { paymentStatus: 'paid' } }),
      prisma.user.count({ where: { blocked: true } }),
      prisma.user.count({ where: { lastLogin: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } }),
    ]);
    res.json({ total, paid, trial: total - paid, blocked, activeToday });
  } catch (err) { next(err); }
}

// GET /api/admin/users?page=1&search=
export async function listUsers(req, res, next) {
  try {
    const page   = Math.max(1, parseInt(req.query.page) || 1);
    const limit  = 50;
    const search = (req.query.search || '').trim();
    const where  = search ? { email: { contains: search, mode: 'insensitive' } } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users: users.map((u) => ({
        id:            u.id,
        email:         u.email,
        isAdmin:       u.isAdmin,
        blocked:       u.blocked,
        paymentStatus: u.paymentStatus,
        paidAt:        u.paidAt,
        createdAt:     u.createdAt,
        lastLogin:     u.lastLogin,
      })),
      total,
      pages: Math.ceil(total / limit),
      page,
    });
  } catch (err) { next(err); }
}

// PUT /api/admin/users/:id/block
export async function blockUser(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isAdmin || user.email === process.env.ADMIN_EMAIL?.toLowerCase()) {
      return res.status(403).json({ message: 'Cannot block an admin account' });
    }
    const updated = await prisma.user.update({ where: { id: user.id }, data: { blocked: !user.blocked } });
    res.json({ id: updated.id, blocked: updated.blocked });
  } catch (err) { next(err); }
}

// PUT /api/admin/users/:id/payment
export async function setPayment(req, res, next) {
  try {
    const { status } = req.body;
    if (!['paid', 'trial'].includes(status)) return res.status(400).json({ message: "status must be 'paid' or 'trial'" });

    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const patch = { paymentStatus: status };
    if (status === 'paid') {
      patch.paidAt           = user.paidAt ?? new Date();
      patch.paymentMethod    = user.paymentMethod ?? 'admin';
      patch.subscriptionEndDate = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    } else {
      patch.paidAt = null; patch.paymentMethod = null; patch.subscriptionEndDate = null;
    }

    const updated = await prisma.user.update({ where: { id: user.id }, data: patch });
    res.json({ id: updated.id, paymentStatus: updated.paymentStatus });
  } catch (err) { next(err); }
}

// DELETE /api/admin/users/:id
export async function adminDeleteUser(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isAdmin || user.email === process.env.ADMIN_EMAIL?.toLowerCase()) {
      return res.status(403).json({ message: 'Cannot delete an admin account' });
    }
    await prisma.user.delete({ where: { id: user.id } }); // cascade handles everything
    res.json({ message: 'User permanently deleted' });
  } catch (err) { next(err); }
}
