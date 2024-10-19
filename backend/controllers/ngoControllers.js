import Ngo from '../db/ngo.js';
import transporter from '../config/nodemailer.js';

async function connectWithUser(req, res) {
    try {
        const { ngoId, userId } = req.params;

        // Fetch the NGO and User details
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) {
            return res.status(404).json({ message: "NGO not found!" });
        }

        const user = ngo.usersInfo.find(user => user._id.toString() === userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        console.log("NGO Email:", ngo.email);
        console.log("User Email:", user.email);

        // Create a transporter using the NGO's email and password
        const emailTransporter = transporter(ngo.email, ngo.password);
        if (!emailTransporter) {
            return res.status(500).json({ message: "Failed to create email transporter!" });
        }

        // Define the email options
        const mailOptions = {
            from: ngo.email,
            to: user.email,
            subject: `Connection request from ${ngo.name}`,
            text: `Hello ${user.name},\n\n${ngo.name} has requested to connect with you.\n\nThank you!`
        };

        // Send the email
        emailTransporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending mail:', err);
                return res.status(500).json({ message: "Error sending mail", error: err });
            }
            res.status(200).json({ message: "Email sent successfully", info });
        });

    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ message: "Server error occurred" });
    }
}

export default connectWithUser;
