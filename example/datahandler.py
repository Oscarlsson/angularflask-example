import pandas as pd
import datetime

def get_data():
    df = pd.read_csv('example/static/browsermarket.csv', sep=';', date_parser=['Date'], decimal=",")
    df.columns = [c.lower().replace(' ','_') for c in df.columns] #postgres doesn't like capitals or spaces

    df.date = pd.to_datetime(df.date, format='%d/%m/%Y')
    df['Month'] = df.date.apply(lambda x: datetime.datetime(x.year, x.month, 1))
    df['Year'] = df.date.apply(lambda x: datetime.datetime(x.year, 1, 1))
    df = df.sort_values(by='date')
    df['Date'] = df.date
    df = df.drop('date', axis=1)
    return df

