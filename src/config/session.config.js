import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMaxAge = process.env.SESSION_AGE || 7;

const expressSession = () => session({
	secret: process.env.SESS_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: {
		sameSite: "none",
		httpOnly: true,
		maxAge: 60000, // 60 * 1000 ms === 1 min
	},
	store: MongoStore.create({
		// Store session cookies
        mongoUrl: MONGO_URI,
        ttl: 24 * 3600 * sessionMaxAge,
	}),
});


export { expressSession }


/* module.exports.loadUser = (req, res, next) => {
    const userId = req.session.userId;

    if(userId) {
        User.findById(userId)
            .then(user => {
                res.locals.currentUser = user;
                req.user = user;
                next();
            })
            .catch(err => next(err))
    } else {
        next()
    }
}; */
