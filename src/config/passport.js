const passport  = require("passport")
const { Strategy  }  = require("passport-google-oauth20")
const { User }  = require("../models/User")

const GoogleStrategy = Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          })
          await user.save()
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    },
  ),
)

module.exports = passport;

