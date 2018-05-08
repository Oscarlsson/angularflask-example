from flask import json
from flask import Flask, url_for, render_template, send_from_directory, Response, send_file
from datahandler import get_data

app = Flask(__name__)

# load the data
df = get_data()


@app.route('/getTimeperiods/')
def getTimeperiods():
    columns = ['Date', 'Month', 'Year']
    resp = Response(response=json.dumps(columns),
                    status=200,
                    mimetype="application/json")
    return resp

@app.route('/getBrowsers/')
def getBrowsers():

    columns = [column for column in df.columns if column not in ['Date', 'Month', 'Year']]
    resp = Response(response=json.dumps(columns),
                    status=200,
                    mimetype="application/json")
    return resp

@app.route('/getDateTimeseries/')
@app.route('/getDateTimeseries/<option>')
def getDateTimeseries(option='internet_explorer_6.0'):

    df_1 = df[['Date', option]].copy()
    df_1.columns = ['x', 'y']
    response = json.dumps(df_1.to_json(orient='records', date_format='iso'))
    resp = Response(response=response,
                    status=200,
                    mimetype="application/json")
    return resp

@app.route('/getMonthTimeseries/')
@app.route('/getMonthTimeseries/<option>')
def getMonthTimeseries(option='internet_explorer_6.0'):

    df_1 = df.groupby('Month', as_index=False).mean().copy()
    df_1 = df_1[['Month', option]].copy()
    df_1.columns = ['x', 'y']
    response = json.dumps(df_1.to_json(orient='records', date_format='iso'))
    resp = Response(response=response,
                    status=200,
                    mimetype="application/json")
    return resp

@app.route('/getYearTimeseries/')
@app.route('/getYearTimeseries/<option>')
def getYearTimeseries(option='internet_explorer_6.0'):

    df_1 = df.groupby('Year', as_index=False).mean().copy()
    df_1 = df_1[['Year', option]].copy()
    df_1.columns = ['x', 'y']
    response = json.dumps(df_1.to_json(orient='records', date_format='iso'))
    resp = Response(response=response,
                    status=200,
                    mimetype="application/json")
    return resp

@app.route('/')
def index():
    return send_file("static/index.html")

def run():
    TEST = True
    PORT = 8000
    HOST = '0.0.0.0'
    app.run(threaded=True, host=HOST, port=PORT, debug=TEST)

if __name__ == '__main__':
    run()
