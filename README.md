Stock Price Tracker

This is a simple web application built with React that allows users to track stock prices and view related news articles.

Features

Home Page: Enter a stock symbol to track and submit.
Stock Page: View a line chart of historical stock prices and the latest news related to the stock.

Technologies Used

Frontend: React, React Router, Axios, Chart.js
Backend: Node.js, Express.js, Axios, Papaparse
APIs: Alpha Vantage (for stock data), News API (for news articles)

Installation

Clone the repository:
git clone https://github.com/your-username/stock-price-tracker.git
cd stock-price-tracker

Install dependencies:
npm install

Set up environment variables:

Create a .env file in the root directory with the following content:
REACT_APP_ALPHAVANTAGE_KEY=your_alpha_vantage_api_key
REACT_APP_NEWSAPI_KEY=your_news_api_key

Replace your_alpha_vantage_api_key and your_news_api_key with your actual API keys.

Start the server and the React application:

Open two terminal windows:

In one window, start the server:
node server.js

In the other window, start the React application:
npm start

Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Home Page:

Enter a valid stock symbol (e.g., AAPL for Apple) into the input field.
Click the Submit button.

Stock Page:

After submitting the stock symbol, you will be redirected to a page showing a line chart of historical stock prices.
Scroll down to view the latest news articles related to the entered stock symbol.
Contributing
Contributions are welcome! If you have any suggestions, improvements, or find any issues, please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
