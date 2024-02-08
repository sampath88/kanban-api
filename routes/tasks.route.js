const express = require("express");
const router = express.Router();

const {
  getTasks,
  updatedTaskStatus,
  updatedTaskStatusWithOrder,
} = require("../controller/task.controller");

router.route("/task").get(getTasks);
router.route("/task").put(updatedTaskStatus);
router.route("/task/order").put(updatedTaskStatusWithOrder);

module.exports = router;
