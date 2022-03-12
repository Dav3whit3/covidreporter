import mongoose from "mongoose";
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';


const saltRounds = 10;


const doRegister = (req, res, next) => {
	const user = ({ email, password } = req.body);

	if (isUserUnique(user.email)) {
		createUser(user)
	} else {
		renderWithErrors({ email: "Email already in use!" }, user);
	}
};


const isUserUnique = (email) => {
	User.findOne({ email })
		.then((result) => {
			if (result) {
				return false;
			} else {
				return true;
			}
		})
		.catch((err) => {
			if (err instanceof mongoose.Error.ValidationError) {
				renderWithErrors(err.errors);
			} else {
				next(err);
			}
		});
};


const createUser = (user) => {
	bcrypt
		.genSalt(saltRounds)
		.then((salt) => bcrypt.hash(user.password, salt))
		.then((hashedPassword) => console.log(`Password hash: ${hashedPassword}`))
		.then((hashedPassword) => {
			return User.create({
				// username: username
				email: user.email,
				// passwordHash => this is the key from the User model
				//     ^
				//     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
				passwordHash: hashedPassword,
			});
		})
		.then((userFromDB) => {
			console.log("Newly created user is: ", userFromDB);
		})
		.then(() => res.redirect("/"))

		.catch((error) => next(error));
};
