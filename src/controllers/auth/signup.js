import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import bcrypt from "bcryptjs";
import { renderWithErrors } from "../../utils/auth.utils.js";


const Register = async (req, res, next) => {

	const { email, password, repeatedPassword } = req.body;
	const user = { email, password, repeatedPassword};

	const passOk = arePasswordEqual(user.password, user.repeatedPassword)
	if (!passOk) {
		renderWithErrors(res, { password: "Passwords are not the same" }, user);
		return;
	}

	const userOk = await isUserUnique(user.email);
	if (!userOk) {
		renderWithErrors(res, { email: "Email already in use!" }, user);
		return;
	}

	try {
		const newUser = await createUser(user);
		res.redirect(301, "/");
	}
	catch (error) {
		renderWithErrors(error.errors);
	}

};


// True or False if the email is found in DB
const isUserUnique = async (email) => {
	const userSearch = await User.findOne({ email });
	const isUnique = userSearch ? false : true;
	return isUnique;
};

const arePasswordEqual = (passOne, passTwo) => {
	return passOne === passTwo 
}


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