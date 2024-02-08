const express = require("express");
const { create } = require("../models/task.model");
const router = express.Router();

router.route("/").post(create);
router.route("/").get(tasks);
router.route("/").put(update);

module.exports = router;
