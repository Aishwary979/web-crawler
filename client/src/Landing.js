import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import '../styles/landing.css';

const Landing = () => {
  const navigate = useNavigate();
  let [inputWebpage, setInputWebpage] = useState(''),
    [crawlHistory, setCrawlHistory] = useState();

  function handleCrawlClick(webpage) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "webpage": webpage,
      "depth": 10
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    fetch("/api/crawl", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result)

        navigate(`/search/${result.id}`)
      })
      .catch(error => console.log('error', error));
  }

  function generateCrawlHistoryList (crawlHistory) {
    console.log('crawlHistory:', crawlHistory);
    let ids = Object.keys(crawlHistory),
      historyList = [];

    ids.forEach((id) => {
      console.log('id:', id);
      try {
        historyList.push({
          id: id,
          name: Object.keys(crawlHistory[id].result)[0]
        });
      }
      catch (error) {
        console.error('Error processing:', id);
      }
    })

    setCrawlHistory(historyList);
  }

  useEffect(() => {
    if (crawlHistory != undefined) return;

    console.log('in effect');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("/api/crawl", requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result); return result; })
      .then(result => generateCrawlHistoryList(result))
      .catch(error => console.log('error', error));
  }, [crawlHistory]);

  

  return (
    <div className="container">
    <h1 id="crawl-webpage-heading">Web Crawler 2.0</h1>
    <p id="crawl-webpage-instructions">Enter a URL below to get started. The application will then crawl all links present in the webpage.</p>
    <div className="input-container">
      <input
        id="crawl-webpage-input"
        placeholder="Enter a webpage to begin. Format: https://www.example.com"
        onChange={(e) => setInputWebpage(e.target.value)}
      />
      <button id="crawl-button" onClick={() => handleCrawlClick(inputWebpage)}>Crawl!</button>
    </div>
    {/* <JsonView data={{ a: 'b' }} shouldExpandNode={allExpanded} style={darkStyles} /> */}
    <h2 id="crawl-history-heading">Crawl History</h2>
    {crawlHistory == undefined ? null : (
      <ul id='crawl-history-list'>
        {crawlHistory.map((item) => (
          <li key={item.id}>
            <Link to={`/search/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}

export default Landing;
