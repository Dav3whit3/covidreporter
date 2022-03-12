import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import bcrypt from "bcryptjs";
import { renderWithErrors } from "../../utils/auth.js";


const Register = async (req, res, next) => {
	const { email, password } = req.body;
	const user = { email, password };

	const userIsUnique = await isUserUnique(user.email);

	if (userIsUnique) {
		try {
			const newUser = await createUser(user);
			res.redirect(301, "/");
		} catch (error) {
			if (error instanceof mongoose.Error.ValidationError) {
				renderWithErrors(error.errors);
			} else {
				console.error(`Logging error: ${error}`);
				renderWithErrors(res, error);
			}
		}
	} else {
		renderWithErrors(res, { email: "Email already in use!" }, user);
	}
};


// True or False if the email is found in DB
const isUserUnique = async (email) => {
	const userSearch = await User.findOne({ email });
	const isUnique = userSearch ? false : true;
	return isUnique;
};


const createUser = async (user) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(user.password, salt);

	const createdUser = await User.create({
		email: user.email,
		passwordHash: hashedPassword,
	});
	console.info(`New user created: ${user.email}`);

	return createdUser;
};


export { Register };