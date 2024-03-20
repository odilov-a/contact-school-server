const mongoose = require("mongoose");
const VacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    clock: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vacancies = mongoose.model("vacancy", VacancySchema);
module.exports = Vacancies;