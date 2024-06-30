import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [symbol, setSymbol] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5002/save", { symbol });
      navigate(`/stock/${symbol}`);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Stock Price Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
