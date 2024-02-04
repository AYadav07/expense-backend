const User = require("../../models/users");
const fs = require("fs");
const path = require("path");

const profilePicUpload = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const oldPic = user.profile_pic;
    user.profile_pic = req.body.name;
    if (oldPic && oldPic.length > 0) {
      const filePath = path.join(
        __dirname,
        "../../../uploads/profile_pics/",
        oldPic
      );
      // await fs.access(filePath);
      // await fs.unlink(filePath);
      fs.access(filePath, (error) => {
        if (error) {
        } else {
          fs.unlink(filePath, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    }

    await user.save();

    res.status(200).json({
      username: user.username,
      email: user.email,
      name: user.name,
      profile_pic: user.profile_pic,
    });
  } catch (err) {
    return res.status(400).json("Error in profilePicUpload");
  }
};

module.exports = profilePicUpload;
