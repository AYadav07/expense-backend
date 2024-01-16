const fs = require("fs");
const path = require("path");
const transporter = require("./transporter");

const sendEmail = async (email, subject, payload) => {
  try {
    let emailTransporter = await transporter();
    console.log("after transporter");
    //const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    //const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: payload,
      };
    };

    // Send email
    emailTransporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("mail sent to: " + email);
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
