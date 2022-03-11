// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
import mongoose from "mongoose";

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}\
@${process.env.DB_CLUSTER}\
.0o2bu.mongodb.net/${process.env.DB_NAME}`;

mongoose
	.connect(MONGO_URI)
	.then((x) => {
		console.log(`
  🍀  Connected to Mongo! Database name: "${x.connections[0].name}" 🍀\n`);
	})
	.catch((err) => {
		console.error("Error connecting to mongo: ", err);
	});

