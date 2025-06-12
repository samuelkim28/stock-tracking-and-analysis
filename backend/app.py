from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route("/")
def hello():
    return jsonify({"message": "Hello from Flask!"})

# @app.route("/<symbol>")
# def get_stock(symbol):
#     try:
#         stock = yf.Ticker(symbol)  # Create a yfinance Ticker object
#         info = stock.info  # Fetch stock info dictionary
#         # Pick out useful data fields from info
#         hist = stock.history(period="11d")
#         closing_prices = hist["Close"].to_list()
#         volumes = hist["Volume"].to_list()

#         # print(closing_prices)
#         # print(get_adpc(closing_prices, False))

#         data = {
#             "ticker": symbol.upper(),               # Normalize ticker to uppercase
#             "currentPrice": info.get("currentPrice"),
#             "previousClose": info.get("previousClose"),
#             "open": info.get("open"),
#             "dayHigh": info.get("dayHigh"),
#             "dayLow": info.get("dayLow"),
#             "volume": info.get("volume"),
#             "currency": info.get("currency"),
#             "longName": info.get("longName"),
#             "adapc": get_adpc(closing_prices),
#             "adpc": get_adpc(closing_prices, False),
#             "averageVolume": get_avg_volume(volumes),
#             "peRatio": info.get("trailingPE"),
#             "eps": info.get("trailingEps")
#         }
#         return jsonify(data)  # Return the selected data as JSON

#     except Exception as e:
#         # If something goes wrong (invalid ticker, network error, etc), return an error
#         return jsonify({"error": str(e)}), 500
    
@app.route("/<symbol>")
def get_stock(symbol):

    adapc_days = request.args.get('adapcDays', default=5, type=int)
    adpc_days = request.args.get('adpcDays', default=5, type=int)
    adv_days = request.args.get('advDays', default=5, type=int)

    try:
        stock = yf.Ticker(symbol)  
        info = stock.info
        num_days_of_interest = max(adapc_days, adpc_days, adv_days)  
        hist = stock.history(period=f"{num_days_of_interest}d")

        closing_prices = hist["Close"].to_list()
        volumes = hist["Volume"].to_list()

        arr = closing_prices[-adapc_days:]
        arr2 = closing_prices[-adpc_days:]
        arr3 = volumes[-adv_days:]

        data = {
            "ticker": symbol.upper(),   
            "currentPrice": info.get("currentPrice"),
            "previousClose": info.get("previousClose"),
            "open": info.get("open"),
            "dayHigh": info.get("dayHigh"),
            "dayLow": info.get("dayLow"),
            "volume": info.get("volume"),
            "currency": info.get("currency"),
            "longName": info.get("longName"),
            "adapc": get_adpc(arr),
            "adpc": get_adpc(arr2, False),
            "averageVolume": get_avg_volume(arr3),
            "peRatio": info.get("trailingPE"),
            "eps": info.get("trailingEps")
        }
        return jsonify(data)  

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/api/<field>', methods=['GET'])
# def get_previous_data(field):
#     symbol = request.args.get('symbol')
#     days = request.args.get('days', default=5, type=int)

#     if not symbol:
#         return jsonify({"error": "Missing 'symbol' parameter"}), 400

#     try:
#         ticker = yf.Ticker(symbol)
#         hist = ticker.history(period=f"{days}d")

#         columnName = 'Close'
#         if field == 'closing-prices':
#             columnName = 'Close'
#         if field == 'volume':
#             columnName = 'Volume'
            
#         fieldValues = hist[columnName]

#         # Convert to date: price dictionary
#         result = {str(date.date()): float(price) for date, price in fieldValues.items()}

#         return jsonify(result)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
@app.route('/stats/<stat>', methods=['GET'])
def get_adapc_data(stat):
    symbol = request.args.get('symbol')
    days = request.args.get('days', default=5, type=int)

    if not symbol:
        return jsonify({"error": "Missing 'symbol' parameter"}), 400

    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=f"{days}d")
        closing_prices = hist["Close"].to_list()
        volumes = hist["Volume"].to_list()
        adapc = 0
        adpc = 0
        volume = 0
        data = {}
        if stat == "adapc":
            adapc = get_adpc(closing_prices)
            data = {
                "adapc": adapc 
            }            
        if stat == "adpc":
            adpc = get_adpc(closing_prices, False)
            data = {
                "adpc": adpc 
            } 
        if stat == "volume":
            volume = get_avg_volume(volumes)
            data = {
                "adv": volume 
            } 
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_adpc(closing_prices, absolute=True):
    prices = closing_prices[::-1]
    daily_percent_change = 0
    sum = 0
    num_days = len(prices) - 1
    for i in range(len(prices) - 1):
        if absolute:
            daily_percent_change = abs(((prices[i] - prices[i + 1]) / prices[i + 1]) * 100)
        else:
            daily_percent_change = ((prices[i] - prices[i + 1]) / prices[i + 1]) * 100
        sum = sum + daily_percent_change
    result = sum / num_days
    return round(result, 3)

def get_avg_volume(volumes):
    list = volumes[::-1]
    sum = 0
    num_days = len(list) - 1
    for i in range(1, len(list)):
        sum = sum + list[i]
    avg_volume = sum / num_days
    return round(avg_volume, 0)