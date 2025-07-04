const securityHeaders = (req, res, next) => {
  // Security headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflare.com https://*.googleapis.com https://*.gstatic.com;
    style-src 'self' 'unsafe-inline' https://*.cloudflare.com https://*.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https: data:;
    connect-src 'self' https://*.cloudflare.com;
    frame-src 'none';
    object-src 'none'
  `);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Request logging headers
  res.setHeader('X-Request-ID', req.id || crypto.randomBytes(16).toString('hex'));
  res.setHeader('X-Response-Time', `${Date.now() - req.startTime}ms`);

  next();
};

module.exports = securityHeaders;
