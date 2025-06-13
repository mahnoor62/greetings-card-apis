const User = require('../../models/user');
const {success_response, error_response} = require('../../utils/response');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const TempUser = require('../../models/temp-user');
const {v4: uuidv4} = require('uuid');
const speakeasy = require('speakeasy');
const {send_email} = require('../../utils/email');

exports.register = async (req, res) => {
    try {
        const {name, email} = req.body;

        if (!(name && email)) {
            return error_response(res, 400, "All inputs are required!");
        }

        const oldUser = await User.findOne({email: email.toLowerCase()});

        if (oldUser) {
            return error_response(res, 400, "User already exists. Please log in.");
        }

        // if (!oldUser.isVerified) {
        //
        // }
        const isVerified = false;
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            isVerified
        });

        const payload = {user_id: user._id, isVerified};

        let jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });

        user.token = jwtToken;
        await user.save();

        const {MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, APP_URL, MAIL_FROM, APP_NAME} = process.env;

        const appUrl = APP_URL + "/verify?token=" + jwtToken;

        let transport = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        });

        const mailOptions = {
            from: `"${APP_NAME}" <${MAIL_FROM}>`,
            to: user.email,
            subject: 'Verifying Your Account',
            html: `<a href=${appUrl}>Click here to verify</a>`
        };


        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return success_response(res, 200, "User register successfully", user);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

exports.verify = async (req, res) => {
    try {

        const {token} = req.body;
        const verifyUser = await User.findOne({token});

        if (!verifyUser) {
            return error_response(res, 400, "Invalid token");
        }
        verifyUser.token = undefined;
        verifyUser.isVerified = true;
        await verifyUser.save();

        return success_response(res, 200, "User verified successfully", verifyUser);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
// exports.login = async (req, res) => {
//     try {
//
//         const {email, password} = req.body;
//
//         if (!(email && password)) {
//             return error_response(res, 400, "All inputs are required!");
//         }
//
//         const oldUser = await User.findOne({email: email.toLowerCase()});
//
//         if (!oldUser) {
//             return error_response(res, 400, "User not exist Please register yourself!");
//         }
//         if (oldUser.isVerified === true) {
//             const passwordMatched = await bcrypt.compare(password, oldUser.password);
//
//             if (!passwordMatched) {
//                 return error_response(res, 400, "Invalid credentials!");
//             }
//             const payload = {user_id: oldUser._id, email: oldUser.email, name: oldUser.name};
//
//             let jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
//                 expiresIn: '24h',
//             });
//
//             oldUser.token = jwtToken;
//             oldUser.save();
//             return success_response(res, 200, "User login successfully", oldUser);
//         }
//
//         return error_response(res, 400, "You are  not verified");
//
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };


// exports.forget = async (req, res) => {
//     try {
//         const authEmail = req.body.email;
//         const user = await User.findOne({email: authEmail.toLowerCase()});
//
//         if (!user) {
//             return error_response(res, 400, "User not found!");
//         }
//
//         const payload = {user_id: user._id};
//
//         let jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
//             expiresIn: process.env.TOKEN_EXPIRE,
//         });
//
//         user.token = jwtToken;
//         await user.save();
//         await Password.deleteMany({email: authEmail.toLowerCase()});
//
//         const created = await Password.create({
//             email: authEmail,
//             token: jwtToken,
//         });
//         const {MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, APP_URL, MAIL_FROM, APP_NAME} = process.env;
//
//         const appUrl = APP_URL + "/reset?token=" + jwtToken;
//
//         let transport = nodemailer.createTransport({
//             host: MAIL_HOST,
//             port: MAIL_PORT,
//             auth: {
//                 user: MAIL_USER,
//                 pass: MAIL_PASS
//             }
//         });
//         const mailOptions = {
//             from: `"${APP_NAME}" <${MAIL_FROM}>`,
//             to: created.email,
//             subject: 'Reset Your Account Password',
//             html: `<a href=${appUrl}>Click here to reset your password</a>`
//         };
//
//
//         transport.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });
//         return success_response(res, 200, "Email successfully sent", created);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.reset = async (req, res) => {
//     try {
//         const {token, confirmPassword} = req.body;
//         const findToken = await Password.findOne({token});
//
//         if (!findToken) {
//             return error_response(res, 400, "Invalid token");
//         }
//         const user = await User.findOne({email: findToken.email});
//
//         if (!user) {
//             return error_response(res, 400, "User not found!");
//         }
//
//         const encryptPassword = await bcrypt.hash(confirmPassword, 10);
//         user.password = encryptPassword;
//         await user.save();
//
//         await Password.deleteMany({email: findToken.email});
//         let userResponse = {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//         };
//         return success_response(res, 200, "Password reset successfully", userResponse);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };

exports.verification_email = async (req, res) => {
    try {
        const email = req.user.email;
        // const {email} = req.body;
        const checkUser = await User.findOne({email: email.toLowerCase()});

        if (!checkUser) {
            return error_response(res, 400, "User not exist!");
        }
        if (checkUser.isVerified) {
            return error_response(res, 400, "User already verified!");
        }

        const payload = {user_id: checkUser._id};

        let jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });

        checkUser.token = jwtToken;
        await checkUser.save();

        const {MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, APP_URL, MAIL_FROM, APP_NAME} = process.env;

        const appUrl = APP_URL + "/verify-account?token=" + jwtToken;

        let transport = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            },
        });

        const mailOptions = {
            from: `"${APP_NAME}" <${MAIL_FROM}>`,
            to: email,
            subject: 'Verifying Your Account',
            html: `<a href=${appUrl}>Click here to verify</a>`
        };


        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return res.status(200).json({success: true, msg: "Email Successfully Sent", data: checkUser});

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};


// 2FA flow

exports.login = async (req, res) => {
    try {

        const {email} = req.body;

        if (!email) {
            return error_response(res, 400, "Email is  required!");
        }

        const oldUser = await User.findOne({email});

        if (!oldUser) {
            return error_response(res, 400, "User not exist.Please register yourself!");
        }

        if (oldUser.isVerified === true) {
            await TempUser.deleteMany({email});

            const secret = speakeasy.generateSecret({
                length: 6,
                name: 'Greetings-Card'
            });

            const code = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32'
            });

            const user = await TempUser.create({
                email: email.toLowerCase(),
                unique_id: uuidv4(),
                code
            });

            const {MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_FROM, APP_NAME} = process.env;

            await send_email(MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_FROM, APP_NAME, email, code);

            return success_response(res, 200, "Verification code successfully sent to the user", user.unique_id);
        }
        return error_response(res, 400, "You are  not verified");


        // }

    } catch
        (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

exports.login_verification = async (req, res) => {
    try {

        const {code, unique_id} = req.body;
        const verifyUser = await TempUser.findOne({code, unique_id});

        if (!verifyUser) {
            return error_response(res, 400, "Invalid code");
        }

        let user;
        const userEmail = verifyUser.email;
        user = await User.findOne({email: userEmail});
        // if (!user) {
        //     user = await User.create({email: userEmail});
        //     let payload = {user_email: user.email, user_id: user._id}
        //     let jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
        //         expiresIn: process.env.TOKEN_EXPIRE
        //     })
        //
        //     await TempUser.deleteMany({code, unique_id});
        //     return success_response(res, 200, "User login successfully", {user, token: jwtToken});
        // }
        payload = {user_email: user.email, user_id: user._id}
        jwtToken = jwt.sign(payload, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRE
        })
        await TempUser.deleteOne({
            code, unique_id
        });
        return success_response(res, 200, "User login successfully", {user, token: jwtToken});


    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.auth = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const user = await User.findById({_id: userId});

        if (!user) {
            return error_response(res, 400, "User not found!");
        }
        return success_response(res, 200, "Auth successfully found", user);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};