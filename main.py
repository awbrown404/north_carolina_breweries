from flask import Flask, flash, redirect, render_template, jsonify, request, session, abort, send_from_directory, send_file 
import json
import pandas as pd

app = Flask(__name__)

class Datastore(): 
    City=None
    brewery_type=None
data=Datastore()


@application.route("/main",methods=['GET'])

@application.route("/",methods=["GET"])
def homepage():
    City = request.form.get('city', 'Raleigh')
    brewery_type = request.form.get('brewery_type')

    data.City=City
    data.brewery_type=brewery_type

    df = pd.read_csv('nc_breweries_df.csv')

    #choose columns to keep
    df = df[df.City == city]
    df = df[df.brewery == brewery_type]

if __name__ == "__main__":
    app.run(debug=True)