from flask import Flask, render_template, request
import csv
import json
import pandas as pd 

app = Flask(__name__)

class Datastore():
      brewery=None
      city=None
data=Datastore()  

@app.route('/', methods=["GET", "POST "])
def homepage():
      data.brewery = request.form.get('breweries', '')
      data.city = request.form.get('city', '')

      df = pd.read_csv('..\north_carolina_brweries\assets\data\nc_breweries_df.csv')
      brewery = data.brewery
      city = data.city

      df = df[df.brewery == brewery]
      df = df[df.city == city]

      df = df[["breweries", "city"]]

if __name__ == "__main__":
    app.run(debug=True)
