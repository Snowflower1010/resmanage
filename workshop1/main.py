from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import json 
from datetime import datetime

with open('config.json', 'r') as c:
    params = json.load(c) ["params"]

local_server = True

app = Flask(__name__)
if(local_server):
    app.config['SQLALCHEMY_DATABASE_URI'] = params['local_uri']

else:
    app.config['SQLALCHEMY_DATABASE_URI'] = params['prod_uri']


     
db = SQLAlchemy(app)

class Review(db.Model):
    # name, email, subject, mes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable = False)
    email = db.Column(db.String(80), nullable = False)
    subject = db.Column(db.String(80), nullable = False)
    mes = db.Column(db.String(80), nullable = False)
    date = db.Column(db.String(12), nullable=True)

class Reservation(db.Model):
    # name, em, date, time, guests
    sn = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(80), nullable = False)
    em = db.Column(db.String(80), nullable = False)
    date = db.Column(db.String(12), nullable = False)
    time = db.Column(db.String(12), nullable = False)
    guests = db.Column(db.Integer, nullable = False)



@app.route('/')
def index():
    return render_template('index.html', params = params)

@app.route('/dinning', methods = ['GET', 'POST']) 
def dinning():
    if(request.method == 'POST'):
        name = request.form.get('name')
        email = request.form.get('email')
        date = request.form.get('date')
        time = request.form.get('time')
        guests = request.form.get('guests')

        entry = Reservation(name = name, em = email, date = date, time = time, guests = guests)
        db.session.add(entry)
        db.session.commit()
    return render_template('dinning.html', params = params)

@app.route('/menu')
def menu():
    return render_template('menu.html', params = params)

@app.route('/about')
def about():
    return render_template('about.html', params = params)

@app.route('/feedback', methods = ['GET', 'POST'])
def feedback():
    if(request.method == 'POST'):
        # entry for db
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')

        entry = Review(name = name, email = email, subject = subject, mes = message, date = datetime.now())    
        db.session.add(entry)
        db.session.commit()


    return render_template('contactus.html', params = params)

if __name__  == '__main__':
    app.run(debug=True)
