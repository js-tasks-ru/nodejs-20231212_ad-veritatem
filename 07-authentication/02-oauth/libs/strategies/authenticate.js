const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Не указан email');
  }

  try {
    const user = await User.findOne({email, displayName});

    if (!user) {
      const newUser = await User.create({email, displayName});
      return done(null, newUser, 'New user created');
    }

    return done(null, user, 'User record');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return done(error, false, 'Некорректный email.');
    }
  }
};
