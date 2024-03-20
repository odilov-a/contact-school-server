const mongoose = require("mongoose");
const ProgramSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Programs = mongoose.model("program", ProgramSchema);
module.exports = Programs;