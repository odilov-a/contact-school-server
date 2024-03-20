const Programs = require("../models/program");

exports.getAllPrograms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalPrograms = await Programs.countDocuments();
    const totalPages = Math.ceil(totalPrograms / perPage);
    const allPrograms = await Programs.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!allPrograms.length) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allPrograms,
      page,
      totalPages,
      totalItems: totalPrograms,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Programs.findById(req.params.programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    return res.json({ data: program });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const newProgram = await Programs.create(req.body);
    return res.json({ data: newProgram });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const oldProgram = await Programs.findById(req.params.programId);
    if (!oldProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    const updatedProgram = await Programs.findByIdAndUpdate(
      req.params.programId,
      req.body,
      { new: true }
    );
    return res.json({ data: updatedProgram });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const deletedProgram = await Programs.findByIdAndDelete(
      req.params.programId
    );
    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    return res.json({ message: "Program deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
