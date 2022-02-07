import React, { useState, useEffect } from "react";
import Page from "./Page";
import axios from "axios";

function SearchInfo(props) {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");

  const [art, setArt] = useState([]);

  const [start, setStart] = useState(false);

  // let [objectURL, setObjectURL] = useState('');
  let decade = 0;
  let i = 0;

  let objectURL;

  function getYear(e) {
    setYear(e.target.value);
  }
  function getDomain(e) {
    setDomain(e.target.value);
  }
  function getKeyword(e) {
    setKeyword(e.target.value);
  }

  function randomYear(x, y) {
    decade = Math.floor(Math.random() * (y - x) + x);
  }

  if (year === "1400") {
    randomYear(1400, 1499);
    console.log(decade);
  } else if (year === "1500") {
    randomYear(1500, 1599);
  } else if (year === "1600") {
    randomYear(1600, 1699);
  } else if (year === "1700") {
    randomYear(1700, 1799);
  } else if (year === "1800") {
    randomYear(1800, 1899);
  } else if (year === "1900") {
    randomYear(1900, 1999);
  } else if (year === "2000") {
    randomYear(2000, 2099);
  }

  if (keyword) {
    objectURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&isOnView=true`;
  } else if (keyword && decade && domain === true) {
    objectURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&search?q=${decade}&isPublicDomain=true&isOnView=true`;
  } else if (keyword && domain === true) {
    objectURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&isPublicDomain=true&isOnView=true`;
  } else if (keyword && decade) {
    objectURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&search?q=${decade}isOnView=true`;
  }

  const submitFunction = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setStart(true);
    if (start) {
      await axios.get(objectURL)
      .then((res) => {
        setArt(res.data);

        for (let i = 0; i < 5; i++) {

          let theID = res.data.objectIDs[i];

          let theURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${theID}`;

          if (theID) {
            axios.get(theURL).then((res) => {
              console.log(res.data);
              setArt(res.data);
            });
          }
        }

      });
    }
  };

  useEffect(() => {
    submitFunction();
  });

  return (
    <div>
      <form action="submit" id="metsearch">
        <input
          className="search"
          type="text"
          placeholder="keyword"
          required
          onChange={getKeyword}
        />
        <label className="search" for="era">
          Era:
        </label>
        <select name="era" id="era" form="metsearch" onChange={getYear}>
          <option value="">select</option>
          <option value="1400">1400s</option>
          <option value="1500">1500s</option>
          <option value="1600">1600s</option>
          <option value="1700">1700s</option>
          <option value="1800">1800s</option>
          <option value="1900">1900s</option>
          <option value="2000">2000s</option>
        </select>
        <label className="search" for="domain">
          Public Domain?
        </label>
        <select name="domain" id="domain" form="metsearch" onChange={getDomain}>
          <option value="">select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <div>
          <button
            className="button"
            type="submit"
            value="SEARCH!"
            onClick={submitFunction}
          >
            SEARCH!
          </button>
        </div>
      </form>

      <Page art={art} />
    </div>
  );
}

export default SearchInfo;
