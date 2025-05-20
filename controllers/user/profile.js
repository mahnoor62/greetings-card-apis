const User = require('../../models/user');
const {success_response, error_response} = require('../../utils/response');
const bcrypt = require('bcryptjs');

exports.update_password = async (req, res) => {
    try {

        const authId = req.user.user_id;
        const {oldPassword, newPassword, reTypeNewPassword} = req.body;

        if (!(oldPassword && newPassword && reTypeNewPassword)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const findUser = await User.findOne({_id: authId});

        if (!findUser) {
            return error_response(res, 400, "User not found!");
        }
        const comparePassword = await bcrypt.compare(oldPassword, findUser.password);

        if (!comparePassword) {
            return error_response(res, 400, "Old password not matched!");
        }

        let encryptPassword;

        if (newPassword === reTypeNewPassword) {
            encryptPassword = await bcrypt.hash(newPassword, 10);
            findUser.password = encryptPassword;
            await findUser.save();

        } else {
            return error_response(res, 400, "New password and retype password are not same");
        }
        const responseUser = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
        };
        return success_response(res, 200, "Password updated successfully", responseUser);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }

};

exports.update_email = async (req, res) => {
    try {

        const {currentEmail, newEmail, name} = req.body;

        if (!(currentEmail && newEmail && name)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const userEmail = await User.findOne({email: currentEmail.toLowerCase()});

        if (!userEmail) {
            return error_response(res, 400, "Email not matched!");
        }

        const email = newEmail.toLowerCase();
        userEmail.email = email;
        userEmail.name = name;
        await userEmail.save();

        return success_response(res, 200, "Email updated successfully", userEmail);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};