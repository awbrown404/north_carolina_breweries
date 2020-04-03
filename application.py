# import dependencies
from flask import Flask, render_template
import pymongo
import pandas as pd

# read in data
master = pd.read_csv("data/master_beer_df.csv")
master_condensed = pd.read_csv("data/master_beer_condensed.csv")
breweries = pd.read_csv("data/nc_breweries_df.csv")

# establish mongo db connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.nc_breweries_db

# drop existing collection to prevent duplicates
db.beer_master.drop()
db.master_condensed.drop()
db.breweries.drop()

# creates a collection and inserts data
db.beer_master.insert_many(master.to_dict('records'))
db.master_condensed.insert_many(master_condensed.to_dict('records'))
db.breweries.insert_many(breweries.to_dict('records'))

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/beerList')
def beerList():
    master = list(db.master_condensed.find({}, {'_id': False}))
    breweries = list(db.breweries.find({}, {'_id': False}))
    return render_template("beerList.html", master=master, breweries=breweries)

@app.route('/beerMap')
def beerMap():
    master = list(db.beer_master.find({}, {'_id': False}))
    breweries = list(db.breweries.find({}, {'_id': False}))
    return render_template("beerMap.html", master=master, breweries=breweries)

if __name__ == "__main__":
    app.run(debug=True)