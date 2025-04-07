from flask import Blueprint, jsonify, request
from .models import db, Patient

auth = Blueprint('auth', __name__)


@auth.route("/")
def dash():
    return "GROUP X WEBSITE"


@auth.route('/api/login', methods =['POST', 'GET'])
def send_data():
    data = request.get_json()
    
    person = db.session.query(Patient).filter_by(email=data.get("email")).first()


    
    if person:
        return jsonify({"id" : person.patient_id, "name" : f'{person.fname} {person.lname}', "role" : "patient"})
    
    data = jsonify([{"resp" : 'Server says welcome No ONE'}])
    return data, 404



@auth.route('/api/get_data', methods = ['GET'])
def get_data():
    
    return None