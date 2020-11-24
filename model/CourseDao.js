const Course = require("./Course");

class CourseDao {
  constructor() {
  }

  //create course and store in db
  async create(title, number, term, status) {
    const course = await Course.create({ title, number, term, status });
    return course;
  }  

  //select all data with the same status from base
  async readAll(status = "") {
    const filter = status ? { status } : {};
    const courses = await Course.find(filter).select('-__v');
    return courses;
  }

  //select all data with the input ID from base
  async read(id) {
    const course = await Course.findById(id).select('-__v');
    return course;
  }

  //update the status of a course
  async update(id, status) {
    const course = await Course.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');
    return course;
  }

  //remove a course from DB
  async delete(id = "") {
    const course = await Course.findByIdAndDelete(id).select('-__v');
    return course;
  }
}

module.exports = CourseDao;