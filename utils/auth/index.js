const passport = require('passport');
const jwtStrategy = require('./strategies/jwt.strategy');

const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy);
passport.use(jwtStrategy);
