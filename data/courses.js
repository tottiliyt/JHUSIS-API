//insert sample data to DB
async function addSampleCourse(courses) {
  const data = await courses.readAll();
  
  if (data.length === 0) {
    await courses.create("Gateway Computing: Java","500.112","Fall 2019","taken");
    await courses.create("Intermediate Programming","601.220","Spring 2020","taken");
    await courses.create("Data Structures","601.226","Spring 2020","taken");
    await courses.create("Full-Stack JavaScript","601.280","Fall 2020","enrolled");
    await courses.create("Object-Oriented Software Engineering","601.421","Spring 2021","interested");
  }
}
  
module.exports = { addSampleCourse };