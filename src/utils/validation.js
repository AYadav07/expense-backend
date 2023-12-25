//import { z } from "zod";

const { z } = require("zod");

module.exports.signUpInputValidation = z.object({
  username: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

module.exports.signInInputValidation = z.object({
  userId: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .or(z.string().email({ message: "Invalid email address" })),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});
