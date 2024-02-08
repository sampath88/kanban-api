exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "Data insufficient",
        message: "The request is missing required data.",
      });
    }
    const { title } = req.body;
  } catch (error) {}
};
