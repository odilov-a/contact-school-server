const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    achievements: {
      type: {
        listening: {
          type: Number,
          default: 0,
        },
        reading: {
          type: Number,
          default: 0,
        },
        writing: {
          type: Number,
          default: 0,
        },
        speaking: {
          type: Number,
          default: 0,
        },
        overall: {
          type: Number,
          default: 0,
        },
      },
      default: {},
    },
    image: {
      type: Array, 
      required:true,
    },
  },
  { timestamps: true }
);

const Students = mongoose.model("student", StudentSchema);
module.exports = Students;