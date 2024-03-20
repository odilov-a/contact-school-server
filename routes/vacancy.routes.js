const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const vacancyController = require("../controller/vacancy.controller.js");
const vacancyRoutes = Router();

vacancyRoutes.get("/", vacancyController.getAllVacancies);
vacancyRoutes.get("/:vacancyId", vacancyController.getVacancyById);
vacancyRoutes.post("/", authMiddleware, vacancyController.createVacancy);
vacancyRoutes.put("/:vacancyId", authMiddleware, vacancyController.updateVacancy);
vacancyRoutes.delete("/:vacancyId", authMiddleware, vacancyController.deleteVacancy);

module.exports = vacancyRoutes;