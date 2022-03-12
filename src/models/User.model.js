import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

//Create moongose.model arg=>modelSchema
// export model

const User = mongoose.model('User', userSchema);


export { User }