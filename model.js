const mongoose = require("mongoose");

const isAlphaWithSpaces = (value) => /^[a-zA-Z\s]+$/.test(value);
const isValidStreet = (value) =>
  /^[a-zA-Z0-9\s.,-]+$/.test(value) && /[a-zA-Z]/.test(value);
const isValidMobileNo = (value) => {
  return /^[1-9][0-9]{9}$/.test(value);
};
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: {
      validator: isAlphaWithSpaces,
      message: "First name can only contain alphabetic characters",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: isAlphaWithSpaces,
      message: "Last name can only contain alphabetic characters and spaces",
    },
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    validate: {
      validator: isValidMobileNo,
      message:
        "Mobile number must be 10 digits, not start with 0, and not be all zeros",
    },
  },
  emailId: {
    type: String,
    required: [true, "required"],
    // match: [
    //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    //   "Email format is invalid. Only @gmail.com is accepted",
    // ],
    match: [/\S+@\S+\.\S+/+ /^[a-zA-Z0-9._%+-]+@yahoo\.com$/, "Email format is invalid"],
  },
  address: { 
    street:{
      type: String,
      required: [true, "street is required"],
      validate: {
        validator: isValidStreet,
        message:
          "Street must contain at least one alphabetic character",
    },
  },
    
    city: {
      type: String,
      required: [true, "City is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "City can only contain alphabetic characters and spaces",
      },
    },
    state: {
      type: String,
      required: [true, "State is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "State can only contain alphabetic characters and spaces",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "Country can only contain alphabetic characters and spaces",
      },
    },
  },
  loginId: {
    type: String,
    required: [true, "Login ID is required"],
    match: [
      /^[a-zA-Z0-9]{8}$/ && /[a-zA-Z]/,
      "Login ID must be exactly 8 alphanumeric characters",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },
  creationTime: { type: Date, default: Date.now },
  lastUpdatedOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;