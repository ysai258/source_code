const AWS = require("aws-sdk");
// Connecting aws
const initAWS = () => {
 try {
    AWS.config.update({
      accessKeyId: process.env.aws_access_key,
      secretAccessKey: process.env.aws_secret_key,
      region: process.env.aws_region,
    });
    console.log("AWS connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("AWS connection failed");
  }
};

module.exports = { initAWS };
