const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

sgMail.setApiKey(functions.config().sendgrid.key);

// Updated function to handle different types of notifications
const emailNewItemsPostsSenderHandler = async (email, name, type) => {
  let subject, htmlContent;

  // Customize the email based on the type
  if (type === "items") {
    subject = "🆕 New Items Alert on Circhoolar!";
    htmlContent = `<h4>Hello ${name}! 😊</h4>
    <p>
      Exciting news! There are new items posted on Circhoolar that might catch your interest. 🛍️
    </p>
    <p>
      Whether you're looking for something specific or just browsing, now is the perfect time to explore.
    </p>
    <a
      href="https://www.circhoolar.com/items"
      target="_blank"
      rel="noopener noreferrer"
    >
      Check Out New Items
    </a>
    <p>Happy Shopping,</p>
    <p>The Circhoolar Team</p>
    `;
  } else if (type === "questions") {
    subject = "❓ New Questions Posted on Circhoolar!";
    htmlContent = `<h4>Hello ${name}! 😊</h4>
    <p>
      The Circhoolar community is buzzing with new questions! 🤔
    </p>
    <p>
      Your insight and experience can greatly help others. Take a moment to share your knowledge or even pose your own questions.
    </p>
    <a
      href="https://www.circhoolar.com/questions"
      target="_blank"
      rel="noopener noreferrer"
    >
      Join the Discussion
    </a>
    <p>Together We Grow,</p>
    <p>The Circhoolar Team</p>
    `;
  }

  const msg = {
    to: email,
    from: functions.config().email.from,
    subject: subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { emailNewItemsPostsSenderHandler };
