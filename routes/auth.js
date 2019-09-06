const express = require("express");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

console.log(require("express-validator/check"), "routes");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("wrong email or password, try again")
      .normalizeEmail(),
    body(
      "password",
      "please enter a password with only numbers and text and at least 5 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("this email address is forbidden.");
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "please enter a password with only numbers and text and at least 5 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("password have to match!");
        }
        return true;
      })
      .trim()
  ],

  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

// if we are to separate the validator in a file
// module.exports.checkEmail = [
//   .isEmail()
//       .withMessage("Please enter a valid email.")
//       .custom((value, { req }) => {
//           if(value === "test@test.com") {
//               throw new Error("This email address is forbidden.");
//           }
//           return true;
//       })
//       .isPassword()
//       .withMessage("Bad Password")
//       .isValidAddress()
// ]

// ...

// app.get('/signup', checkEmail, (req, res) => {
//   ...
// })
