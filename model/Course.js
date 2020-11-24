const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//set up a schema for course info
const CourseSchema = new Schema({
    title: { type: String, required: true  },
    number: { type: String, required: true  },
    term: { type: String, required: true  },
    status: { type: String, required: true, enum : ["taken", "enrolled", "interested"],  }
});

const Course = mongoose.model("courses", CourseSchema);

module.exports = Course;