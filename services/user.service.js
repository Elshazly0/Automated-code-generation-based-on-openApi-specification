const userModel = require("../models/review");

class userService {
  async postuser(Object) {
    const newuser = new userModel(Object);
    return await newuser;
  }

  async postuser(Object) {
    const newuser = new userModel(Object);
    return await newuser;
  }

  async getuserbyusername(username) {
    return await user;
  }

  async getuser() {
    return await user;
  }

  async getuserbyusername(username) {
    return await user;
  }

  async deleteuser(id) {
    return await user;
  }
}

module.exports = userService;
