from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, Patient, Doctor, PatientRecord, Admin, Appointment
import json

routes = Blueprint('routes', __name__)

###APIS THAT USE GET METHOD
@routes.route("/api/get_appointments")
@jwt_required()
def get_appointments():
    patient = json.loads(get_jwt_identity().replace("'", '"').replace(" ", "").replace(":", ': "').replace(",", '" ,').replace("}", '"}'))
    appointments = db.session.query(Appointment).filter_by(patient_id=patient['patient_id']).all()
    appointments = [appointment.to_dict(doc_name=db.session.query(Doctor).filter_by(doctor_id=appointment.doctor_id).first().name) for appointment in appointments]
    return jsonify(appointments), 200

@jwt_required()
@routes.route("/api/get_patient_record/<int:patient_id>")
def get_patient_record(patient_id):
    patient = db.session.query(PatientRecord).filter_by(patient_id=patient_id).all()
    print(patient)
    if patient:
        return jsonify({"message" : "processed"})#jsonify(patient_record.to_dict()), 200
    return jsonify({"message": "Patient not found"}), 404

##APIS THAT USE POST METHOD
@routes.route("/api/create_appointment", methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    date = data.get('date')
    time = data.get('time')
    type = data.get('type')

    new_appointment = Appointment(patient_id=patient_id, doctor_id=doctor_id, date=date, time=time, type=type)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment created successfully"}), 201