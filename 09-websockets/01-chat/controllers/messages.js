const Message = require('../models/Message');
const mapMessage = require('../mappers/message');

module.exports.messageList = async function messages(ctx, next) {
  const user = ctx.user;
  const messagesRes = await Message.find({chat: user.id}).limit(20);
  const messages = messagesRes.map(mapMessage);

  ctx.body = {messages};
};
