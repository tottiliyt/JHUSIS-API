const express = require("express");
const router = express.Router();
const Cache = require("../model/Cache")
const {fetchSIS} = require("../data/fetchSIS");
const cache = new Cache();

// fetch process too slow in china, fetch them one by one
const terms = [
  "Spring 2021",
  "Fall 2020",
  "Summer 2020",
  "Spring 2020",
  "Fall 2019",
  "Summer 2019",
  "Spring 2019",
  "Fall 2018",
  "Summer 2018",
  "Spring 2018",
  "Fall 2017",
  "Summer 2017",
  "Spring 2017",
  "Fall 2016",
  "Summer 2016",
  "Spring 2016",
  "Fall 2015",
  "Summer 2015",
  "Spring 2015",
  "Fall 2014",
  "Summer 2014",
  "Spring 2014",
  "Fall 2013",
  "Summer 2013",
  "Spring 2013",
  "Fall 2012",
  "Summer 2012",
  "Spring 2012",
  "Fall 2011",
  "Summer 2011",
  "Spring 2011",
  "Fall 2010",
  "Summer 2010",
  "Spring 2010",
  "Fall 2009",
  "Summer 2009",
  "Spring 2009",
];

const invalidPage =
  {
    "status": 400,
    "detail": "Resource not found"
  };



router.get('/api/search', async (req, res) => {

  const query = req.query.query;
  const page = req.query.page;
  const limit = req.query.limit;

  if (parseInt(page)<1){
    const error =
  {
    "status": 400,
    "detail": "Page must be >= 1"
  };
    return res.json({ error })

  };
  if (parseInt(limit)<1){
    const error =
  {
    "status": 400,
    "detail": "Limit must be >= 1"
  };
    return res.json({ error })
  };
  

    // Check the cache
  if (cache.has()) {
    const data = await cache.get(query,page,limit);
    return res.json({ data });
  }
    // If no cache, then get data from datastore

  const SISdata = await fetchSIS();
    // Set the cache for future request
  await cache.set(SISdata);

    // Send the response
  const data = await cache.get(query,page,limit);
  return res.json({ data });
});

module.exports = router;