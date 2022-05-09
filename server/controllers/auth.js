import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password should be at least 6 characters long");
  }
  try {
    let userExist = await User.findOne({ email: email }).exec();
    if (userExist) {
      return res.status(400).send("Email is already taken");
    } else {
      const user = new User(req.body);
      user.password = await bcrypt.hash(password, 12);
      await user.save();
      return res.status(200).send("Congratulations.User created successfully");
    }
  } catch (e) {
    return res.send(500).send("Something went wrong, please try again");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await User.findOne({ email }).exec();
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stripe_account_id: user.stripe_account_id,
            stripe_seller: user.stripe_seller,
            stripe_session: user.stripe_session,
          },
        });
        // return res.status(200).send("Logged in successfully. Thanks");
      } else {
        return res.status(401).send("Invalid password provided, try again");
      }
    } else {
      return res.status(401).send("User with that email address doesn't exist");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something went wrong, please try again", e);
  }
};

export default register;
