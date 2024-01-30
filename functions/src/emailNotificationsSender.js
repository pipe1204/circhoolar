const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid.key);

const emailNotificationsHandler = async (email, name) => {
  const msg = {
    to: email,
    from: functions.config().email.from,
    subject: "🔔 You've Got New Notifications on Circhoolar!",
    html: `<h4>Hello ${name}! 😊,</h4>
    <p>
      Your posts are creating a buzz in the Circhoolar community! 🎉
    </p>
    <p>
      You have new notifications on your posts. It's the perfect time to engage
      with your fellow Circhoolarians.
    </p>
    <p>
      Dive back into the conversation and see what others are saying.
    </p>
    <a
      href="https://www.circhoolar.com/dashboard"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Notifications
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

module.exports = { emailNotificationsHandler };
