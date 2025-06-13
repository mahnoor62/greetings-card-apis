const nodemailer = require('nodemailer');

exports.send_email = async (MAIL_USER, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_FROM, APP_NAME, email, code) => {

    let transport = await nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    });


    await new Promise((resolve, reject) => {
        transport.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    const mailOptions = {
        from: `"${APP_NAME}" <${MAIL_FROM}>`,
        to: email,
        subject: 'Verification Code for Login',
        html: `Your verification code is: <b>${code}</b>`
    };

    await new Promise((resolve, reject) => {
        // send mail
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
                throw new Error('Email not sent!');
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });


};


