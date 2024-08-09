const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendMail } = require("../utils/nodemailer");
const { pdfmake } = require("../utils/pdfmake");

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
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN });

        const RefreshToken = await jwt.sign({
            _id: user._id
        },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN });

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
        console.log("ok", user);
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashpassoword = await bcrypt.hash(password, 10);
        console.log("ok", hashpassoword);

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
        sendMail();
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
const registerOTP = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "registerOTP successfully send."
    });
}

const verifyOTP = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "verifyOTP successfully session."
    });
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

        // console.log(AccessToken, RefreshToken);
        const newdataf = await Users.findById({ _id: user._id }).select("-password -RefreshToken");

        const option = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("AccessToken", AccessToken, option)
            .cookie("RefreshToken", RefreshToken, option)
            .json({
                success: true,
                message: "data fetch succsesfully.",
                data: {
                    user: { ...newdataf.toObject(), AccessToken }
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server erorr.",
        });
    }
}

const newToken = async (req, res) => {
    // console.log("ok");
    // console.log(req.body);
    try {
        console.log("hhh", req.cookies.RefreshToken);

        const validateToken = await jwt.verify(req.cookies.RefreshToken, "trrerefsdfdfe")
        console.log("uuu", validateToken);

        if (!validateToken) {
            return res.status(401).json({
                success: false,
                message: "invalid refresh token."
            })
        }

        const user = await Users.findById(validateToken._id)
        console.log(user, "ajikshd");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not found."
            })
        }


        const { AccessToken, RefreshToken } = await AccRefToken(user._id);

        if (req.cookies.RefreshToken != user.toObject().RefreshToken) {
            return res.status(401).json({
                success: false,
                message: "invalid Token."
            })
        }

        const option = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("AccessToken", AccessToken, option)
            .cookie("RefreshToken", RefreshToken, option)
            .json({
                success: true,
                message: "data fetch succsesfully.",
                data: {
                    user: { AccessToken }
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server erorr.",
        });
    }
}

const logout = async (req, res) => {
    try {
        console.log(req.body._id);
        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not login.'
            });
        }
        console.log(user);
        res.status(200).json({
            success: true,
            message: 'Logout successful.'
        })
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Logout failed.'
        });
    }
}

module.exports = {
    register,
    login,
    newToken,
    logout,
    registerOTP, verifyOTP
}