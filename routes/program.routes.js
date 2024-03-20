const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const programController = require("../controller/program.controller.js");
const programRoutes = Router();

programRoutes.get("/", programController.getAllPrograms);
programRoutes.get("/:programId", programController.getProgramById);
programRoutes.post("/", authMiddleware, programController.createProgram);
programRoutes.put("/:programId", authMiddleware, programController.updateProgram);
programRoutes.delete("/:programId", authMiddleware, programController.deleteProgram);

module.exports = programRoutes;