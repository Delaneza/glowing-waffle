import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

userSchema.methods = {
  view(full: boolean) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      name: this.name,
    };

    return full
      ? {
        ...view,
        password: this.password,
      }
      : view;
  },
};

export const User = mongoose.model("User", userSchema);