const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const telegramCourseController = require("../controller/telegram.course.controller.js");
const telegramCourseRoutes = Router();

telegramCourseRoutes.get("/", telegramCourseController.getAllTelegramCoureInfo);
telegramCourseRoutes.get("/:telegramId", telegramCourseController.getTelegramCoureInfoById);
telegramCourseRoutes.put("/course/:telegramId", authMiddleware, telegramCourseController.updateTelegramCoureInfo);

module.exports = telegramCourseRoutes;