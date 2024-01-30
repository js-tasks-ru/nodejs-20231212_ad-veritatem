module.exports = async function checkUserMiddleware(ctx, next) {
  const user = ctx.user;

  if (!user) {
    ctx.throw(401, 'Пользователь не авторизован.');
  }

  return next();
};
