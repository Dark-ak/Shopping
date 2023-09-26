require("dotenv").config()
const passport = require("passport")
const {Strategy: JwtStrategy,ExtractJwt} = require("passport-jwt")

const jwtSecretKey = process.env.KEY
const User = require("../models/user")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecretKey   
}

passport.use(
    new JwtStrategy(options, async (payload, done) => {

        try{
            const user = await User.findById(payload.userId);

            if(user){
                return done(null,user);
            }else{
                return done(null,false)
            }
        }catch(error){
            return done(error,false)
        }
    })
)
