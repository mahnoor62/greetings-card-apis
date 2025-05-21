const Transaction = require('../../models/transaction');
const {success_response, error_response} = require('../../utils/response');
const Game = require('../../models/game');
const Game_Customization = require('../../models/card_customization');
const nodemailer = require("nodemailer");
const User = require('../../models/user');

exports.create_transaction = async (req, res) => {
    try {
        const {userId, slug, transactionId} = req.body;

        if (!(userId && slug && transactionId)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const game = await Game.findOne({slug});
        const gameId = game._id
        let transaction = await Transaction.findOne({userId, gameId});
        if (!transaction) {
            transaction = await Transaction.create({
                userId,
                gameId,
                transactionId
            });
        }

        return success_response(res, 200, "Transaction successfully created ", transaction);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }

};

exports.get_all_transaction = async (req, res) => {
    try {
        // populate array values
        const transactions = await Transaction.find().populate('userId gameId', 'name').sort({createdAt: -1}).exec();
        if (transactions.length > 0) {
            return success_response(res, 200, "All transactions fetch successfully", transactions);
        }

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.approved_status = async (req, res) => {
    try {
        const {id} = req.params;

        const transaction = await Transaction.findOne({_id: id});
        if (transaction) {
            transaction.approved = true;
            await transaction.save();
        }

        // Assuming you also want to update the associated game customization
        const gameCustomization = await Game_Customization.findOne({
            userId: transaction.userId,
            gameId: transaction.gameId
        });

        if (gameCustomization) {
            gameCustomization.isPaid = true; // Set the isPaid status based on the approved status
            await gameCustomization.save();
        }

        const user = await User.findOne({_id: transaction.userId});
        const {MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, APP_URL, MAIL_FROM, APP_NAME} = process.env;

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
            subject: 'Transaction Approval',
            html: "Your transaction is approved , your game is public now."
        };


        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return success_response(res, 200, "Approved status set successfully", {transaction, email: user.email});
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

