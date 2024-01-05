const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
const subscribers = new Set();
// let subscribers = new Map();

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve) => {
    subscribers.add(resolve);

    ctx.res.on('close', () => {
      subscribers.delete(resolve);
      resolve();
    });
  });

  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;
  console.log('subscribers', subscribers);
  if (!message) {
    ctx.throw(400, 'Message field is missing.');
  }

  subscribers.forEach((resolve) => resolve(message));
  subscribers.clear();
  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
