const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    async function(email, password, done) {
      const user = User.findOne({email});

      if (!user) {
        done(null, false, 'Нет такого пользователя');
      }
      console.log(user);
      const passwordHash = await user.schema.methods.checkPasswor(password);

      if (!passwordHash) {
        done(null, false, 'Нет такого пользователя');
      }

      done(user, false, 'User');
    },
);
