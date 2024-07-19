const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const register = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashpassoword = await bcrypt.hash(password, 10);

        if (!hashpassoword) {
            return res.status(409).json({
                success: false,
                message: "password is valid while hasing error.",
            });
        }

        const newdata = await Users.create({ ...req.body, password: hashpassoword })

        if (!newdata) {
            return res.status(500).json({
                success: false,
                message: "internal server erorr.",
            });
        }

        const newdataf = await Users.findById({ _id: newdata._id }).select("-password");

        if (!newdataf) {
            return res.status(500).json({
                success: false,
                message: "internal server erorr.",
            });
        }
        res.status(201).json({
            success: true,
            message: "user created successfully.",
            data: newdataf
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server erorr.",
        });
    }
}

module.exports = {
    register
}