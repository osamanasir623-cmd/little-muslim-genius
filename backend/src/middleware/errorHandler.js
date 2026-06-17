export function notFound(req, res, next) {
  const err = new Error(`Not found — ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
}

export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || err.status || 500;

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ message: `${field} already exists` });
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join('. ') });
  }

  // JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const isDev = process.env.NODE_ENV === 'development';
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
}
