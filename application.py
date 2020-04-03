# import Flask
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

# create a Flask app
app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017')

# Define the database in Mongo
db = client.beers_project

# Collections
breweries = db.breweries
beer_list = db.beers
master_beer = db.master_beer

# route to "landing" page
@app.route('/')
def index():
        return render_template('index.html')

#route to beer list page
@app.route('/beerList')
def beerList():
    return render_template('beerList.html')

#route to beer map page
@app.route('/beerMap')
def beerMap():
    return render_template('beerMap.html')


if __name__ == '__main__':
    app.run(debug=True)
