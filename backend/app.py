from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app) 

@app.route("/")
def hello():
    return jsonify({"message": "Hello from Flask!"})
    
@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route("/stock/<symbol>")
def get_stock(symbol):
    adapc_days = request.args.get('adapcDays', default=5, type=int)
    adpc_days = request.args.get('adpcDays', default=5, type=int)
    adv_days = request.args.get('advDays', default=5, type=int)
    try:
        jsonData = jsonify(populate_single_stock_data(symbol, adapc_days, adpc_days, adv_days))
        return jsonData
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/stocks")
def get_stocks():
    try:
        stock_symbols_str = request.args.get('symbols')
        adapc_days = request.args.get('adapcDays', default=5, type=int)
        adpc_days = request.args.get('adpcDays', default=5, type=int)
        adv_days = request.args.get('advDays', default=5, type=int)

        if stock_symbols_str == None:
            return {"error": "No stock symbols specified"}

        stock_symbols = stock_symbols_str.split(',')
        formatted_stocks = stock_symbols_str.replace(',', ' ')

        num_days_of_interest = max(adapc_days, adpc_days, adv_days)
        hist = yf.download(tickers=formatted_stocks, period=f"{num_days_of_interest}d", auto_adjust=True, progress=False)

        full_data = populate_full_data(hist, stock_symbols, adapc_days, adpc_days, adv_days)
        return jsonify(full_data)
    except Exception as e:
        print(f"Error in /stocks: {e}")
        return jsonify({"success": False, "error": str(e), "data": {}}), 500

def populate_full_data(hist_df, stock_symbols, adapc_days, adpc_days, adv_days):
    full_data = {}

    for stock_symbol in stock_symbols:
        data = {}
        if (('Close', stock_symbol.upper()) in hist_df.columns) and (('Volume', stock_symbol.upper()) in hist_df.columns):
            try:
                closing_prices = hist_df[('Close', stock_symbol.upper())].dropna().tolist()
            except KeyError:
                print(f"KeyError accessing ('Close', {stock_symbol.upper()})")
                raise  
            try:
                volumes = hist_df[('Volume', stock_symbol.upper())].dropna().tolist()
            except KeyError:
                print(f"KeyError accessing ('Volume', {stock_symbol.upper()})")
                raise          
            arr = closing_prices[-adapc_days:]
            arr2 = closing_prices[-adpc_days:]
            arr3 = volumes[-adv_days:] 
            if closing_prices and volumes:
                data = {
                    "ticker": stock_symbol.upper(),   
                    "currentPrice": closing_prices[len(closing_prices) - 1],
                    "volume": volumes[len(volumes) - 1],
                    "adapc": get_adpc(arr),
                    "adpc": get_adpc(arr2, False),
                    "averageVolume": get_avg_volume(arr3),
                }
                full_data[stock_symbol.upper()] = data
    return full_data

def populate_single_stock_data(symbol, adapc_days, adpc_days, adv_days):
    stock = yf.Ticker(symbol)  
    try:
        info = stock.fast_info
    except Exception as e:
        print("FAILED TO FETCH FAST INFO:", str(e))
    num_days_of_interest = max(adapc_days, adpc_days, adv_days)  
    hist = stock.history(period=f"{num_days_of_interest}d")

    closing_prices = hist["Close"].to_list()
    volumes = hist["Volume"].to_list()

    arr = closing_prices[-adapc_days:]
    arr2 = closing_prices[-adpc_days:]
    arr3 = volumes[-adv_days:]

    data = {
        "ticker": symbol.upper(),   
        "currentPrice": info.get("lastPrice"),
        "volume": info.get("lastVolume"),
        "adapc": get_adpc(arr),
        "adpc": get_adpc(arr2, False),
        "averageVolume": get_avg_volume(arr3),
    }    
    return data
    
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