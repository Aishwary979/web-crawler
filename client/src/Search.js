import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JSONTree } from 'react-json-tree';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import '../styles/search.css'; // Ensure you have imported the CSS file


const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

// const theme = {
//     scheme: 'default',
//     author: 'chris kempson (http://chriskempson.com)',
//     base00: '#181818',
//     base01: '#282828',
//     base02: '#383838',
//     base03: '#585858',
//     base04: '#b8b8b8',
//     base05: '#d8d8d8',
//     base06: '#e8e8e8',
//     base07: '#f8f8f8',
//     base08: '#ab4642',
//     base09: '#dc9656',
//     base0A: '#f7ca88',
//     base0B: '#a1b56c',
//     base0C: '#86c1b9',
//     base0D: '#7cafc2',
//     base0E: '#ba8baf',
//     base0F: '#a16946'
// };

const Search = () => {
  let [status, setStatus] = useState("In Progress"),
    [crawlResult, setCrawlResult] = useState(''),
    timers = [],
    final = false;

  useEffect(() => {
    if (!final) {
      console.log('inside effect');
      timers.push(setInterval(fetchCrawlResult, 2000));
    }
  });

  function checkStatus(response) {
    response = JSON.parse(response);
    console.log('response:', response)
    let status = response && response.status,
      result = response && response.result;

    if (status != "In Progress") {
      console.log('status, result:', status, result);
      timers.forEach(timer => clearInterval(timer));
      setStatus(status);
      setCrawlResult((result));
      final = true;
    }
    else {
      return;
    }
  }

  function fetchCrawlResult() {
    if (!crawlResult) {
      let params = new URL(document.location).pathname,
        parts = params.split('/'),
        id = parts[parts.length - 1];

      if (id.match(v4) == null) {
        setCrawlResult = "Invalid URL supplied. Please navigate to the landing page again.";
        return;
      }

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`/api/crawl?id=${id}`, requestOptions)
        .then(response => response.text())
        .then(result => checkStatus(result))
        .catch(error => console.error('error', error));
    }
  }

  return (
    <div className="search-container">
      <h1 className="search-heading">Crawl Results</h1>
      <Link to="/landing" className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
        </svg>
        Back to Landing
      </Link>
      <p className="status-text">Status: {status}</p>
      <div className="json-view-container">
        {/* <JsonView data={crawlResult} shouldExpandNode={allExpanded} style={darkStyles} /> */}
        <JSONTree data={crawlResult} /> {/*theme={theme} invertTheme={false} />*/}
      </div>
    </div>
  );
};

export default Search;
