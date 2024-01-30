const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { emailHandler } = require("./emailSender.js");
const { emailNotificationsHandler } = require("./emailNotificationsSender.js");

admin.initializeApp();

exports.checkUnreadMessages = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const userData = change.after.data();
    const previousUserData = change.before.data();

    // Check if unreadMessages is equal or greater than 2 and isEmailSent is false
    if (
      userData.unreadMessages >= 2 &&
      !userData.isUnreadMessagesEmailSent &&
      userData.hasOptOutNotifications === false
    ) {
      try {
        await emailHandler(userData.email, userData.name);
        // Update isUnreadMessagesEmailSent to true
        await change.after.ref.update({ isUnreadMessagesEmailSent: true });
        console.log("Email sent and user updated");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    // Reset isUnreadMessagesEmailSent to false when unreadMessages goes back to 0
    if (userData.unreadMessages === 0 && previousUserData.unreadMessages > 0) {
      await change.after.ref.update({ isUnreadMessagesEmailSent: false });
      console.log("isUnreadMessagesEmailSent reset to false");
    }
  });

exports.checkUnreadNotifications = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const userData = change.after.data();
    const previousUserData = change.before.data();

    // Check if notifications is equal or greater than 2 and isUnreadNotificationsEmailSent is false
    if (
      userData.notifications.length >= 2 &&
      !userData.isUnreadNotificationsEmailSent &&
      userData.hasOptOutNotifications === false
    ) {
      try {
        await emailNotificationsHandler(userData.email, userData.name);
        // Update isUnreadNotificationsEmailSent to true
        await change.after.ref.update({ isUnreadNotificationsEmailSent: true });
        console.log("Email sent and user updated");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    // Reset isUnreadNotificationsEmailSent to false when unreadMessages goes back to 0
    if (
      userData.notifications.length === 0 &&
      previousUserData.notifications.length > 0
    ) {
      await change.after.ref.update({ isUnreadNotificationsEmailSent: false });
      console.log("isUnreadNotificationsEmailSent reset to false");
    }
  });
