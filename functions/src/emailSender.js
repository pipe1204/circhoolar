const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid.key);

const emailHandler = async (email, name) => {
  const msg = {
    to: email,
    from: functions.config().email.from,
    subject: "💌 You've Got New Messages on Circhoolar!",
    html: `<h4>Hi ${name},</h4>
    <p>
      Great news! You've sparked some interest in the Circhoolar community. 🚀
    </p>
    <p>
      There are unread messages waiting for you. They might be inquiries about
      your items or potential offers!
    </p>
    <p>
      Don't keep them waiting! Check your messages now and connect with other
      Circhoolar users.
    </p>
    <a
      href="https://www.circhoolar.com/dashboard"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to Messages
    </a>
    <p>Regards,</p>
    <p>The Circhoolar Team</p>
    `,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { emailHandler };
