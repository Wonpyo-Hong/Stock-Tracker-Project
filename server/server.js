const express = require("express");
const axios = require("axios");
const fs = require("fs");
const Papa = require("papaparse");
const cors = require("cors");

const app = express();
const PORT = 5002;
const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_KEY; // Replace it with your own API key

app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
  const { symbol } = req.body;

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );

    const timeSeries = response.data["Time Series (Daily)"];
    const mostRecentDate = Object.keys(timeSeries)[0];
    const mostRecentData = timeSeries[mostRecentDate];
    const formattedData = {
      symbol,
      timestamp: new Date().toISOString(),
      open: parseFloat(mostRecentData["2. high"]),
      close: parseFloat(mostRecentData["3. low"]),
    };

    const filePath = `stock_data.csv`;
    let csv;
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, "utf8");
      const parsedData = Papa.parse(existingData, { header: true }).data;
      parsedData.push(formattedData);
      csv = Papa.unparse(parsedData);
    } else {
      csv = Papa.unparse([formattedData]);
    }
    fs.writeFileSync(filePath, csv);

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching data from API", error);
    res.status(500).json({ error: "Error fetching data from API" });
  }
});

app.get("/stock/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );

    const timeSeries = response.data["Time Series (Daily)"];
    const formattedData = Object.keys(timeSeries).map((date) => ({
      date,
      open: parseFloat(timeSeries[date]["1. open"]),
      high: parseFloat(timeSeries[date]["2. high"]),
      low: parseFloat(timeSeries[date]["3. low"]),
      close: parseFloat(timeSeries[date]["4. close"]),
      volume: parseInt(timeSeries[date]["5. volume"], 10),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching data from API", error);
    res.status(500).json({ error: "Error fetching data from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
