# import Flask
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

# create a Flask app
app = Flask(__name__)
conn = MongoClient('mongodb://localhost:27017')
client = pymongo.MongoClient(conn)

# Define the database in Mongo
db = client.beers_project

# drop existing collection to prevent duplicates
db.beer_master.drop()
db.breweries.drop()

# create a collection and insert data
db.beer_master.insert_many(master.to_dict('records'))
db.breweries.insert_many(breweries.to_dict('records'))

# route to "landing" page
@app.route('/')
def index():
        return render_template('index.html')

#route to beer list page
@app.route('/beerList')
def beerList():
    master =list(db.beer_master.find())
    breweries = list(db.breweries.find()
    return render_template("beerList.html", master=master, breweries=breweries)

#route to beer map page
@app.route('/beerMap')
def beerMap():
    master = list(db.beer_master.find())
    breweries = list(db.breweries.find())
    return render_template("beerMap.html", master=master, breweries=breweries)


if __name__ == '__main__':
    app.run(debug=True)
