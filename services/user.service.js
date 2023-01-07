const userModel = require("../models/review");

class userService {
  async postuser(Object) {
    const newuser = new userModel(Object);
    return await newuser.save();
  }

  async postuser(Object) {
    const newuser = new userModel(Object);
    return await newuser.save();
  }

  async getuserbyusername(username) {
    return await userModel.find({});
  }

  async getuser() {
    return await userModel.find({});
  }

  async getuserbyusername(username) {
    return await userModel.find({});
  }

  async deleteuser(id) {
    return await userModel.findByIdAndDelete(id);
  }
}

module.exports = userService;
