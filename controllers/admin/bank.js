const Bank = require('../../models/bank');
const {error_response, success_response} = require('../../utils/response');

exports.update_acc_details = async (req, res) => {
    try {
        const {name, account_no, iban, description} = req.body;
        if (!(name && account_no && iban)) {
            return error_response(res, 400, "All inputs are required!");
        }
        let findAcc = await Bank.findOne();

        if (!findAcc) {
            findAcc = await Bank.create({
                name: name.toLowerCase(),
                account_no,
                iban,
                description,
            });
            return success_response(res, 200, "Bank details created successfully", findAcc);
        }
        findAcc.name = name;
        findAcc.account_no = account_no;
        findAcc.iban = iban;
        findAcc.description = description;
        await findAcc.save();
        return success_response(res, 200, "Bank details created successfully", findAcc)
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.get_acc_details = async (req, res) => {
    try {
        const getAccDetails = await Bank.findOne();
        if (getAccDetails) {
            return success_response(res, 200, "Details of bank account fetch successfully", getAccDetails);
        }

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
