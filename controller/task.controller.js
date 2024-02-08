const Task = require("../models/task.model");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

exports.updatedTaskStatus = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "Data insufficient",
        message: "The request is missing required data",
      });
    }
    const { sourceId, status: destColStatus } = req.body;
    const task = await Task.findById(sourceId);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const sourceOrder = task.order;
    const sourceColStatus = task.status;

    const maxOrderTask = await Task.findOne({ status: destColStatus }).sort(
      "-order"
    );

    //Step1: update the moved task
    task.order = maxOrderTask.order + 1;
    task.status = destColStatus;
    await task.save();

    //Step2: update the source column order
    const sourceColTasks = await Task.find({
      status: sourceColStatus,
      order: { $gt: sourceOrder },
    });
    if (sourceColTasks.length) {
      const bulkOps = sourceColTasks.map((task) => ({
        updateOne: {
          filter: { _id: task._id },
          update: { $inc: { order: -1 } },
        },
      }));

      await Task.bulkWrite(bulkOps);
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong",
    });
  }
};
exports.updatedTaskStatusWithOrder = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "Data insufficient",
        message: "The request is missing required data",
      });
    }
    const { sourceId, destId, include } = req.body;
    if (!(sourceId && destId)) {
      return res.status(400).json({
        error: "Data insufficient",
        message: "The request is missing required data",
      });
    }

    const sourceTask = await Task.findById(sourceId);
    const destTask = await Task.findById(destId);
    if (!(sourceTask && destTask)) {
      return res.status(404).send({ message: "Task not found" });
    }

    const sourceOrder = sourceTask.order;
    const sourceColStatus = sourceTask.status;

    const destOrder = destTask.order;
    const destColStatus = destTask.status;

    if (sourceColStatus === destColStatus) {
      let destColQuery = {
        status: destColStatus,
      };

      let orderInc = 1;
      if (sourceOrder > destOrder) {
        destColQuery.order = {
          $gte: include ? destOrder : destOrder + 1,
          $lt: sourceOrder,
        };
      } else {
        destColQuery.order = {
          $gt: sourceOrder,
          $lte: include ? destOrder-1 : destOrder,
        };
        orderInc = -1;
      }

      const destColTasks = await Task.find(destColQuery);

      //Step1: update destination column order
      if (destColTasks.length) {
        const bulkOps = destColTasks.map((task) => ({
          updateOne: {
            filter: { _id: task._id },
            update: { $inc: { order: orderInc } },
          },
        }));

        await Task.bulkWrite(bulkOps);
      }

      //Step2: update the moved task
      let sourceTaskOrder = include ? destOrder - 1 : destOrder;
      if (sourceOrder > destOrder) {
        sourceTaskOrder = include ? destOrder : destOrder + 1;
      }
      sourceTask.order = sourceTaskOrder;
      await sourceTask.save();
    } else {
      let destColQuery = {
        status: destColStatus,
      };
      if (include) {
        destColQuery.order = { $gte: destOrder };
      } else {
        destColQuery.order = { $gt: destOrder };
      }
      const destColTasks = await Task.find(destColQuery);

      //Step1: update destination column order
      if (destColTasks.length) {
        const bulkOps = destColTasks.map((task) => ({
          updateOne: {
            filter: { _id: task._id },
            update: { $inc: { order: 1 } },
          },
        }));

        await Task.bulkWrite(bulkOps);
      }

      //Step2: update the moved task
      if (include) {
        sourceTask.order = destOrder;
      } else {
        sourceTask.order = destOrder + 1;
      }

      sourceTask.status = destColStatus;
      await sourceTask.save();

      //Step3: update source column order
      const sourceColTasks = await Task.find({
        status: sourceColStatus,
        order: { $gt: sourceOrder },
      });
      if (sourceColTasks.length) {
        const bulkOps = sourceColTasks.map((task) => ({
          updateOne: {
            filter: { _id: task._id },
            update: { $inc: { order: -1 } },
          },
        }));

        await Task.bulkWrite(bulkOps);
      }
    }

    res.status(200).json(sourceTask);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong",
    });
  }
};
