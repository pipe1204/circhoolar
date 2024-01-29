export const emailMessagesTemplate = (name: string) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message Notification</title>
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                }
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-top: 20px;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h4>Hi, ${name}! 👋🏼</h4>
                <p>
                    Great news! You've sparked some interest in the Circhoolar community. 🚀
                </p>
                <p class="message">
                    There are unread messages waiting for you. They might be inquiries about
                    your items or potential offers!
                </p>
                <p class="message">
                    Don't keep them waiting! Check your messages now and connect with other
                    Circhoolar users.
                </p>
                <a href="https://www.circhoolar.com/" target="_blank" rel="noopener noreferrer">
                    Go to Messages
                </a>
                <p>Regards,</p>
                <p>The Circhoolar Team</p>
            </div>
        </body>
        </html>
    `;
};
