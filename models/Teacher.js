const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required : true
    },
    subject: {
      type: String,
      required : true
    },
    description: {
      type: String,
      required : true
    },
    image: {
      type: Array,
      required : true
    },
  },
  { timestamps: true }
);

const Teachers = mongoose.model("teacher", TeacherSchema);
module.exports = Teachers;