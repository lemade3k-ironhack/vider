const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

/* GET / */
router.get("/", (req, res, next) => {
  res.render("users/signin.hbs");
});

/* GET /signup */
router.get("/signup", (req, res) => {
  res.render("users/signup.hbs");
});

/* Custom Middleware: Validate user input 
   ToDo: refactor - move validation to another file 
   or maybe start using express-validation package
*/
const validateEmpty = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("users/signup.hbs", { msg: "Please fill all the fields!" });
  }
  next();
};

const validPwd = (req, res, next) => {
  const { username, password } = req.body;
  const pwReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  if (!pwReg.test(String(password))) {
    res.render("users/signup.hbs", {
      username,
      password,
      msg:
        "Password must have at least 8 characters, contain a number, upper and lower letters",
    });
  }
  next();
};

/* POST /signup */
router.post("/signup", validateEmpty, validPwd, (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  User.findOne({ username }).then((user) => {
    if (user) {
      res.render("users/signup.hbs", { msg: "Username already taken" });
      return;
    }

    User.create({ username, password: hash })
      .then((user) => res.redirect(`/profiles/${user._id}`))
      .catch((err) => next(err));
  });
});

module.exports = router;
