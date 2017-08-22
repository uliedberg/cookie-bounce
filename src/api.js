
module.exports = function (opts = {}) {
  const { logger } = opts;

  return async (ctx, next) => {
    if (ctx.path == '/redirect') {
      const redirectUrl = ctx.request.query['url'];
      if (!redirectUrl) ctx.throw(400, 'no redirect-url query param', { path: ctx.path, method: ctx.method });
      logger.info({ hostname: ctx.hostname, redirect_url: redirectUrl }, 'will redirect (303)')

      ctx.status = 303;
      ctx.set('location', redirectUrl);
    } else {
      ctx.throw(400, 'unsupported', { path: ctx.path, method: ctx.method });
    }
  };
}