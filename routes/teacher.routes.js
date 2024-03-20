const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const teacherController = require("../controller/teacher.controller.js");
const teacherRoutes = Router();

teacherRoutes.get("/", teacherController.getAllTeachers);
teacherRoutes.get("/:teacherId", teacherController.getTeacherById);
teacherRoutes.post("/", authMiddleware, uploadMiddleware, teacherController.createTeacher);
teacherRoutes.put("/:teacherId", authMiddleware, uploadMiddleware, teacherController.updateTeacher);
teacherRoutes.delete("/:teacherId", authMiddleware, teacherController.deleteTeacher);

module.exports = teacherRoutes;