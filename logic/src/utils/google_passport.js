require('dotenv').config()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user")



passport.use(new GoogleStrategy({
    clientID: '143587678263-10nn86rd82jd3vm869sdcp5egoag5oap.apps.googleusercontent.com',
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId:profile.id,
                });

                await user.save()
            }

            return done(null, user)
        }catch(error){
            return done(error)
        }
    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(async(id,done) => {
    try{
        const user = await User.findById(id)
        done(null,user)
    }catch(error){
        done(error, null)
    }
})
