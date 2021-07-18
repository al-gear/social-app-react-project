import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../models/authModel.js";

const secret = "gear";

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await AuthModel.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist! Please check your information." });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials!" })

        const token = jwt.sign({ email: oldUser, id: oldUser._id }, secret, { expiresIn: "1h" })

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await AuthModel.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exist!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await AuthModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
