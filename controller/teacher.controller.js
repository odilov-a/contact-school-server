const Teachers = require("../models/Teacher");

exports.getAllTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalTeachers = await Teachers.countDocuments();
    const totalPages = Math.ceil(totalTeachers / perPage);
    const teachers = await Teachers.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: teachers,
      page,
      totalPages,
      totalItems: totalTeachers,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teachers.findById(req.params.teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: teacher });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    req.body.image = req.images;
    const newTeacher = await Teachers.create(req.body);
    return res.json({ data: newTeacher });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    if (req.image && req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid image length" });
    }
    req.body.image = req.images;
    const updatedTeacher = await Teachers.findByIdAndUpdate(
      req.params.teacherId,
      req.body,
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ data: updatedTeacher });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teachers.findByIdAndDelete(
      req.params.teacherId
    );
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
