const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { emailHandler } = require("./emailSender.js");

admin.initializeApp();

exports.checkUnreadMessages = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const userData = change.after.data();
    const previousUserData = change.before.data();

    // Check if unreadMessages is equal or greater than 2 and isEmailSent is false
    if (userData.unreadMessages >= 2 && !userData.isEmailSent) {
      try {
        await emailHandler(userData.email, userData.name);
        // Update isEmailSent to true
        await change.after.ref.update({ isEmailSent: true });
        console.log("Email sent and user updated");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    // Reset isEmailSent to false when unreadMessages goes back to 0
    if (userData.unreadMessages === 0 && previousUserData.unreadMessages > 0) {
      await change.after.ref.update({ isEmailSent: false });
      console.log("isEmailSent reset to false");
    }
  });
