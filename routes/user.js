const router = require("express").Router();
const userController = require("../controllers/userController");
const uploadConfig = require("../uploadConfig");
const fields = uploadConfig.upload.fields([{}]);

router.post("/register", (req, res) => {
  userController
    .register(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
  userController
    .login(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// router.put("/ratings/:id", fields, (req, res) => {
//   let data = req.body; // Mengambil data dari req.body
//   console.log(data);
//   userController
//     .editrating(req.params.id, data)
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

router.get("/getAllUser", (req, res) => {
  userController
    .getAllUser()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.put("/editData/:id", fields, (req, res) => {
  let data = req.body;
  console.log(data);
  userController
    .editData(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
