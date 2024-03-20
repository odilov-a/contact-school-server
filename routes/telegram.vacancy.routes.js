const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const telegramVacancyController = require("../controller/telegram.vacancy.controller.js");
const telegramVacancyRoutes = Router();

telegramVacancyRoutes.get("/", telegramVacancyController.getAllTelegramVacaniesInfo);
telegramVacancyRoutes.get("/:telegramId", telegramVacancyController.getTelegramVacaniesInfoById);
telegramVacancyRoutes.put("/vacancy/:telegramId", authMiddleware, telegramVacancyController.updateTelegramVacaniesInfo);

module.exports = telegramVacancyRoutes;