# import Flask
from flask import Flask

# create a Flask app
app = Flask(__name__)

# We're using the new route that allows us to read a beer style from the URL
@app.route('/beer_style')
def beer(beer_style):
    # Additionally, we're now loading the JSON file's data into file_data 
    # every time a request is made to this endpoint
    with open('./breweries_json.json', 'r') as jsonfile:
        file_data = json.loads(jsonfile.read())
    # We can then find the data for the requested date and send it back as json
    return json.dumps(file_data[beer_style])


if __name__ == '__main__':
    app.run(debug=True)
