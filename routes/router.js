const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const blogRoutes = require("./blog.routes.js");
const vacancyRoutes = require("./vacancy.routes.js");
const teacherRoutes = require("./teacher.routes.js");
const studentRoutes = require("./student.routes.js");
const galleryRoutes = require("./gallery.routes.js");
const programRoutes = require("./program.routes.js");
const telegramVacancyRoutes = require("./telegram.vacancy.routes.js");
const telegramCourseRoutes = require("./telegram.course.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use(userRoutes);
router.use("/blogs", blogRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/teachers", teacherRoutes);
router.use("/students", studentRoutes);
router.use("/galleries", galleryRoutes);
router.use("/programs", programRoutes);
router.use("/telegram-vacancies", telegramVacancyRoutes);
router.use("/telegram-courses", telegramCourseRoutes);

module.exports = router;
