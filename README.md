# Stock Tracking and Analysis

This web application helps users discover new stocks and gain important insights about their volatility and overall trends. The backend uses a Flask API to retrieve and process data from Yahoo Finance via an open-source tool, yfinance. Important metrics such as average daily absolute percent change (ADAPC) and average daily percent change (ADPC) are calculated to provide insights about stock volatility and trends, and can be used to sort the stocks, along with other metrics like current price, PE ratio, and EPS. The user can also select the period of time over which certain metrics like ADAPC and ADPC are calculated to provide short and long-term data. The user can also add stocks to a watchlist, implemented using local storage, to focus on their stocks of interest. The frontend receives and dynamically displays this data using Next.js, and is hosted with Vercel. 


![App Screenshot](/frontend/public/web-app-screenshot.png)