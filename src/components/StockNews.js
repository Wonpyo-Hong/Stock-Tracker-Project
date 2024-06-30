// src/components/StockNews.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function StockNews({ symbol }) {
  const [news, setNews] = useState([]);
  const API_KEY = process.env.REACT_APP_NEWSAPI_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${API_KEY}`
        );
        setNews(response.data.articles.slice(0, 5)); // Limit to 5 articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [symbol, API_KEY]);

  return (
    <div>
      <h2>Latest News for {symbol}</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>
              {article.source.name} -{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockNews;
