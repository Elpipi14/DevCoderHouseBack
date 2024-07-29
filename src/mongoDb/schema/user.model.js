import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  isGithub: { type: Boolean, default: false },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  role: {
    type: String,
    default: "user",
  },
  cartId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",  
  },  
  last_connection: {
    type: Date,
    default: null
  },
  documents: [
      {
        name: String,
        reference: String
      }
    ]
});

export const UserModel = mongoose.model("users", userSchema);