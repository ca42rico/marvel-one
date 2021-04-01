const GoogleStrategy = require("passport-google-oauth20").Strategy;

const config = require("../config");

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.oauth.client_id,
        clientSecret: config.oauth.client_server,
        callbackURL: "/api/characters",
      },
      async (accessToken, refreshToken, profile, done) => {
        if (accessToken) done(null, true);
        else done(true, null);
      }
    )
  );
};
