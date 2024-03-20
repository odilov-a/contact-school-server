const Vacancies = require("../models/Vacancy");

exports.getAllVacancies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalVacancies = await Vacancies.countDocuments();
    const totalPages = Math.ceil(totalVacancies / perPage);
    const allVacancies = await Vacancies.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!allVacancies.length) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allVacancies,
      page,
      totalPages,
      totalItems: totalVacancies,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancies.findById(req.params.vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    return res.json({ data: vacancy });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createVacancy = async (req, res) => {
  try {
    const newVacancy = await Vacancies.create(req.body);
    return res.json({ data: newVacancy });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const updatedVacancy = await Vacancies.findByIdAndUpdate(
      req.params.vacancyId,
      req.body,
      { new: true }
    );
    if (!updatedVacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    return res.json({ data: updatedVacancy });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const deletedVacancy = await Vacancies.findByIdAndDelete(
      req.params.vacancyId
    );
    if (!deletedVacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    return res.json({ message: "Vacancy deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};