const CourseDao = require("../model/CourseDao.js");
const express = require("express");
const { addSampleCourse } = require("../data/courses.js");
const router = express.Router();

const courses = new CourseDao();
addSampleCourse(courses);

const error404 =
  {
    "status": 404,
    "detail": "Resource not found"
  };

//Read Courses(filter by status)
router.get("/api/courses", (req, res) => {
  const status = req.query.status;
  courses
    .readAll(status)
    .then((courses) => res.json({ data: courses }))
    .catch((err) =>data );
});

//Read a Course (given its ID)
router.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  courses
    .read(id)
    .then((courses) => res.json({ data: courses }))
    .catch((err) => errorHandler(res, error404.status, error404.detail));
});

//Create a Course
router.post("/api/courses", (req, res) => {
  const title = req.body.title;
  const number = req.body.number;
  const term = req.body.term;
  const status = req.body.status;
  courses
    .create(title, number, term, status)
    .then((courses) => removeVersion(courses))
    .then((courses) => res.status(201).json({ data: courses}))
    .catch((err) => errorHandler(res, 400, err));
});

//Delete a Course
router.delete("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  courses
    .delete(id)
    .then((course) =>
    course
      ? res.json({ data: course })
      : errorHandler(res, error404.status, error404.detail)
    )
    .catch((err) => {
      errorHandler(res, error404.status, error404.detail);
    });
});

//Update the Status of a Course
router.patch("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  courses.read(id)
  .catch((err) => {
    errorHandler(res, error404.status, error404.detail);
  });

  courses
    .update(id, status)
    .then((course) =>
    course
      ? res.json({ data: course })
      : errorHandler(res, 404, "Resource not found")
    )
    .catch((err) => errorHandler(res, 400, err));
});

function errorHandler(res, status, error) {
  res.status(status).json({
    errors: [
      {
        status: status,
        detail: error.message || error,
      },
    ],
  });
}

// remove __v from response
function removeVersion(c){
  c= c.toObject();
  delete c.__v;
  return c;
}

module.exports = router;