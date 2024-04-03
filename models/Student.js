const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isIelts: {
      type: Boolean,
      default: false,
      required: true,
    },
    ielts: {
      type: Array,
    },
    score: {
      type: Array,
    },
    image: {
      type: Array,
      required: true,
    },
    image02: {
      type: Array,
      required: true,
    },
    image03: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Students = mongoose.model("student", StudentSchema);
module.exports = Students;
