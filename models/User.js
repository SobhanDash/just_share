// Model for User
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    about: {
      profilepic: {
        type: String,
        default: null,
      },
      bio: {
        type: String,
        default: "",
      },
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
