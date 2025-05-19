from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, Patient, Doctor, PatientRecord, Admin, Pharmacist
from datetime import date
from sqlalchemy import null

auth = Blueprint('auth', __name__)

@auth.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('username')
    password = data.get('password')
    
    if data.get('role') == 'patient':
        patient = db.session.query(Patient).filter_by(email=email, password=password).first()
        if patient:
            access_token = create_access_token(identity=str(patient.patient_id))
            patient_info = {"access_token": access_token,"name" : patient.fname, "surname": patient.lname, "role": "patient"}
            return jsonify(patient_info), 200
        
    elif data.get('role') == 'admin':
        admin = db.session.query(Admin).filter_by(email=email, password=password).first()
        if admin:
            access_token = create_access_token(identity=str(admin.admin_id))
            admin_info = {"access_token": access_token,"name" : admin.fullname.split(' ')[0] , "surname": admin.fullname.split(' ')[1], "role": "admin"}
            return jsonify(admin_info), 200
        
    elif data.get('role') == 'doctor':
        doctor = db.session.query(Doctor).filter_by(email=email, password=password).first()
        if doctor:
            access_token = create_access_token(identity= str(doctor.doctor_id))
            doctor_info = {"access_token":access_token, "name":doctor.name.split(" ")[0], "surname":doctor.name.split(" ")[1] }
            return jsonify(doctor_info), 200
        
    elif data.get('role') == 'pharmacist':
        pharmacist = db.session.query(Pharmacist).filter_by(email=email, password=password).first()
        if pharmacist:
            access_token = create_access_token(identity=str(pharmacist.pharmacist_id))
            pharmacist_info = {"access_token": access_token,"name" : pharmacist.name.split(' ')[0] , "surname": pharmacist.name.split(' ')[1], "role": "pharmacist"}
            return jsonify(pharmacist_info), 200
    
    return jsonify({"message": "Invalid credentials"}), 401