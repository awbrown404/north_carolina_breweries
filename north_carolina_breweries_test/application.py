from flask import Flask, render_template, request
import csv
import json
import sqlite3
from sqlalchemy import create_engine
import pandas as pd 

app = Flask(__name__)

file = '..\north_carolina_breweries_Andrew\assets\data\brewery_df.csv'

breweries_db = create_engine('sqlite:///breweries_db.db')

for df in pd.read_csv(file)

@app.route('/', methods=["GET", "POST "])
def homepage():
      data.brewery = request.form.get('breweries', '')
      data.city = request.form.get('city', '')

      df = pd.read_csv('..\north_carolina_breweries_Andrew\assets\data\brewery_df.csv')
      brewery = data.brewery
      city = data.city

      df = df[df.brewery == brewery]
      df = df[df.city == city]

      df = df[["breweries", "city"]]

if __name__ == "__main__":
