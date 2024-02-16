import { Schema, model } from "mongoose";

export type UserDocument = {
  email: string;
  password: string;
  name: string;
  view(full: boolean): any;
}

const userSchema = new Schema<UserDocument>({
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

export const User = model<UserDocument>("User", userSchema);