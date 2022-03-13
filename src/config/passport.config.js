import { User } from "../models/User.model.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const passportSession = () => {
	passport.serializeUser((user, cb) => cb(null, user._id));

	passport.deserializeUser((id, cb) => {
		User.findById(id)
			.then((user) => cb(null, user))
			.catch((err) => cb(err));
	});

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      {
        usernameField: "email", // by default
        passwordField: "password", // by default
      },
      (username, password, done) => {
        User.findOne({ username })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }
  
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: "Incorrect password" });
            }
  
            done(null, user);
          })
          .catch((err) => done(err));
      }
    ) 
  )
};


export { passportSession }
