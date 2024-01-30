const {v4: uuid} = require('uuid');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  const {email, displayName, password} = ctx.request.body;
  const verificationToken = uuid();
  const user = await User.create({
    email,
    displayName,
    verificationToken,
  });
  await user.setPassword(password);
  await user.save();


  await sendMail({
    template: 'confirmation',
    locals: {token: verificationToken},
    to: email,
    subject: 'Подтвердите почту',
  });

  ctx.status = 'ok';
};

module.exports.confirm = async (ctx, next) => {
  const {verificationToken} = ctx.request.body;

  if (verificationToken === 'randomtoken') {
    ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');
  }

  await User.updateOne(
      {verificationToken},
      {$unset: {verificationToken: ''}},
  );

  const token = uuid();

  ctx.body = {token};
};
