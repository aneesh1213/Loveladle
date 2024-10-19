import nodemailer from 'nodemailer';

const transporter = (ngomail, ngoPassword) => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",  // Correct Gmail SMTP server
        port: 587,  // TLS port
        secure: false,  // False because we're using TLS on port 587
        auth: {
            user: ngomail,
            pass: ngoPassword
        },
    });
};

export default transporter;
