const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true}
},
{
    timestamps: true
}
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const res = await bcrypt.compare(password, this.password);
  return res;
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
