
const key = process.env.SIS_API_KEY;

const fetch = require("node-fetch");



async function fetchSIS(){
  //url should be https://sis.jhu.edu/api/classes/Whiting School of Engineering/EN Computer Science?key='+key
  //But the fetch data is too large that will report error
  //const url = 'https://sis.jhu.edu/api/classes/Whiting School of Engineering/EN Computer Science/'+term+'?key='+key;
  const url = 'https://sis.jhu.edu/api/classes/Whiting School of Engineering/EN Computer Science?key='+key;
  let SISdata;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => SISdata = data)
    .catch((error) => console.log("error", error));
  return SISdata;
}

module.exports = { fetchSIS };
