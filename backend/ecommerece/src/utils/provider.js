const passport = require('passport');
const Users = require('../model/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleLoginProvider = async () => {
    try {
        passport.use(new GoogleStrategy({
            clientID: "",
            clientSecret: "",
            callbackURL: "http://localhost:8000/api/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    let user = await Users.findOne({ googleId: profile.id });

                    console.log(user);
                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: "user"
                        })

                        console.log(user, {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: "user"
                        });
                        return cb(null, user);
                    }
                } catch (error) {
                    console.log(error);
                    return cb(error, null);
                }
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("serializeUser", user);
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            console.log("deserializeUser", id);
            // await Users.findById(id, function (err, user) {
            // done(err, user);
            // });
            let user = await Users.findOne({ _id: id });
        });
    } catch (error) {
        console.log(error);
    }

}

const facebookLoginProvider = async () => {
    try {
        passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
            function (accessToken, refreshToken, profile, cb) {
                User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                    return cb(err, user);
                });
            }
        ));
    } catch (error) {
        console.log(error);
    }
}
module.exports = { googleLoginProvider, facebookLoginProvider }





