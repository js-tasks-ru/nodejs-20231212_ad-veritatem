const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');
const Product = require('../models/Product');

module.exports.checkout = async function checkout(ctx, next) {
  const {product, phone, address} = ctx.request.body;
  const user = ctx.user;
  const order = await Order.create({product, phone, address, user: user.id});
  const ordredProduct = await Product.findById(product);

  await sendMail({
    to: user.email,
    subject: 'Подтвердите почту',
    locals: {id: user.id, product: ordredProduct},
    template: 'order-confirmation',
  });

  ctx.body = {order: order.id};
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const user = ctx.user;
  const orders = await Order.find({user: user.id});

  ctx.body = {orders};
};
