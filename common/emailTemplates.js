const { projectName } = require('./../config')

const userRegister = {
  subject: 'Welcome to ' + projectName,
  template: `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Registration Confirmation</title>
            <style>
                /* Add your custom styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #f2f2f2;
                    text-align: center;
                    padding: 10px;
                }
                .content {
                    padding: 20px;
                }
                .button {
                    display: inline-block;
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 4px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Registration Confirmation</h1>
                </div>
                <div class="content">
                    <p>Hello {{Name}},</p>
                    <p>Thank you for registering on our website. We are excited to have you as part of our community!</p>
                    <p>Please click the button below to confirm your registration:</p>
                    
                    <p>If you did not sign up for an account on our website, you can safely ignore this email.</p>
                </div>
                <div class="footer">
                    <p>If you have any questions or need assistance, please contact our support team at support@example.com.</p>
                    <p>Thank you,<br> The {{Your_Company_Name}} Team</p>
                </div>
            </div>
        </body>
    </html>`
}

module.exports = {
  userRegister
}
