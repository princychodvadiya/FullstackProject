const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const AccRefToken = async (id) => {
    try {
        const user = await Users.findById(id);
        console.log("juhivbndfikjvn", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid request."
            })
        }

        const AccessToken = await jwt.sign({
            _id: user.id,
            role: user.role,
            expiresIn: '1 h'
        },
            'jnkjfnhroin4456jljdsd',
            { expiresIn: 60 * 60 });

        const RefreshToken = await jwt.sign({
            _id: user._id
        },
            'trrerefsdfdfe',
            { expiresIn: '2 days' });


        user.RefreshToken = RefreshToken;
        await user.save({ validateBeforeSave: false })
        return { AccessToken, RefreshToken }

    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log(user);
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashpassoword = await bcrypt.hash(password, 10);
        console.log(hashpassoword);

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

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log("defefg", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist.",
            });
        }

        const validateUser = await bcrypt.compare(password, user.password);
        console.log(validateUser);

        if (!validateUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const { AccessToken, RefreshToken } = await AccRefToken(user._id);

        console.log(AccessToken, RefreshToken);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login
}