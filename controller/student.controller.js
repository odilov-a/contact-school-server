const Students = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalStudents = await Students.countDocuments();
    const totalPages = Math.ceil(totalStudents / perPage);
    const allStudents = await Students.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!allStudents.length) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allStudents,
      page,
      totalPages,
      totalItems: totalStudents,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ data: student });
  } catch (err) {
    logger.error(`Get student by ID request failed: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    req.body.image = req.images;
    const newStudent = await Students.create(req.body);
    return res.json({ data: newStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    if (!req.images || req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid image length" });
    }
    const oldStudent = await Students.findById(req.params.studentId);
    if (!oldStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    req.body.image = req.images;
    const updatedStudent = await Students.findByIdAndUpdate(
      req.params.studentId,
      {
        achievements: req.body.achievements,
        image: req.body.image,
        ...req.body,
      },
      { new: true }
    );
    return res.json({ data: updatedStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Students.findByIdAndDelete(
      req.params.studentId
    );
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};