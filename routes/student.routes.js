const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const studentControllers = require("../controller/student.controller.js");
const studentRoutes = Router();

studentRoutes.get("/", studentControllers.getAllStudents);
studentRoutes.get("/:studentId", studentControllers.getStudentById);
studentRoutes.post("/", authMiddleware, uploadMiddleware, studentControllers.createStudent);
studentRoutes.put("/:studentId", authMiddleware, uploadMiddleware, studentControllers.updateStudent);
studentRoutes.delete("/:studentId", authMiddleware, studentControllers.deleteStudent);

module.exports = studentRoutes;