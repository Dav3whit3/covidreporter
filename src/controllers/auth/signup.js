import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import bcrypt from 'bcryptjs';
import { renderWithErrors } from '../../utils/auth.js'; 

const saltRounds = 10;


const Register = async (req, res, next) => {

  const {email, password} = req.body
  const user = {email, password}

	//const user = {email, password} = req.body
	const unique = await isUserUnique(user.email)

	if (unique) {
		createUser(req, res, next, user)
	} else {
		renderWithErrors(res, { email: "Email already in use!" }, user);
	}
};


const isUserUnique = async (email) => {

	try {
		const userSearch = await User.findOne({ email })
		const isUnique = userSearch ? false : true
		return isUnique

	}

	catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			renderWithErrors(error.errors);
		} else {
			next(err);
		}
	}
};


const createUser = async (req, res, next, user) => {
	const salt = await bcrypt.genSalt(saltRounds)
	const hashedPassword = await bcrypt.hash(user.password, salt)
	console.log(hashedPassword)
	try {

		const createdUser = await User.create({
			email: user.email,
			passwordHash: hashedPassword,
		});

		res.render('index', {user: createdUser})

	}
	catch (error) {
		console.error(`Logging error: ${error}`)
		renderWithErrors(res, error);
	}
	
};


export { Register }