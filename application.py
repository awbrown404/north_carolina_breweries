# import Flask
from flask import Flask, render_template, request
from pymongo import MongoClient

# create a Flask app
app = Flask(__name__)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

#Define the database in Mongo
db = nc_beers

# We're using the new route that allows us to read a date from the URL
@app.route('/')
def index():
        return render_template('index.html')
@app.route('/<beerList>')
def beerList():
    return render_template



if __name__ == '__main__':
    app.run(debug=True)
