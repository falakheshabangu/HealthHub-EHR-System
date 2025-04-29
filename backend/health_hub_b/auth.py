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
            access_token = create_access_token(identity=f"{{'username': {patient.username}, 'patient_id': {patient.patient_id}}}")
            return jsonify(access_token=access_token), 200
    elif data.get('role') == 'admin':
        admin = db.session.query(Admin).filter_by(email=email, password=password).first()
        if admin:
            access_token = create_access_token(identity={'username': admin.username, 'patient_id': admin.patient_id})
            return jsonify(access_token=access_token), 200
    elif data.get('role') == 'doctor':
        doctor = db.session.query(Doctor).filter_by(email=email, password=password).first()
        if doctor:
            access_token = create_access_token(identity={'username': doctor.username, 'doctor_id': doctor.doctor_id})
            return jsonify(access_token=access_token), 200
    elif data.get('role') == 'pharmacist':
        pharmacist = db.session.query(Pharmacist).filter_by(email=email, password=password).first()
        if pharmacist:
            access_token = create_access_token(identity={'username': pharmacist.username, 'pharmacist_id': pharmacist.pharmacist_id})
            return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401



@auth.route("/api/delete_data", methods=['DELETE'])
def delete_data():
    table = request.args.get('table')
    
    # print(data)
    #Expected data {id, table} /
    
    if table == 'admin':
        admin_id = int(request.args.get('id'))
        admin = db.session.query(Admin).filter_by(admin_id=admin_id).first()

        if admin:
            db.session.delete(admin)
            db.session.commit()
            return jsonify({"message": "Admin deleted deleted successfully"}), 200
    if table == 'doctor':
        doctor_id = int(request.args.get('id'))
        doctor = db.session.query(Doctor).filter_by(doctor_id=doctor_id).first()

        if doctor:
            setattr(doctor, 'is_active', False)
            db.session.commit()
            return jsonify({"message": "Doctor deleted successfully"}), 200

    

    return jsonify({"message": "Data not found"}), 404

@auth.route("/api/update_data", methods=['PUT'])
def update_data():
    #Expected data {table, id}
    data = request.get_json()
    print(data)

    if data['table'] == 'admin':
        admin_id = data.get('id')
        admin = db.session.query(Admin).filter_by(admin_id=admin_id).first()
        if admin:
            for key, value in data.items():
                if hasattr(admin, key):
                    setattr(admin, key, value)
            db.session.commit()
            return jsonify({"message": "Admin updated successfully"}), 200
    
    elif data['table'] == 'doctor':
        doctor_id = data.get('id')
        doctor = db.session.query(Doctor).filter_by(doctor_id=doctor_id).first()
        if doctor:
            for key, value in data.items():
                if hasattr(doctor, key):
                    setattr(doctor, key, value)
            db.session.commit()
            return jsonify({"message": "Doctor updated successfully"}), 200
    

    return jsonify({"message": "Record not found"}), 404


@auth.route('/api/add_data', methods =['POST'])
def add_data():
    data = request.get_json()
    print(data)
    if data['table']== 'patient':
        patient_name = data.get('fname')
        patient_surname = data.get('lname')
        patient_id = data.get('id_number')
        patient_sex = data.get('sex')
        patient_address = data.get('address')
        patient_email = data.get('email')
        patient_phone = data.get('phone')
        blood_type = data.get('blood_type')
        patient_password = data.get('password')
        
        patient_dob = None
        if int(patient_id [:2]) <= 25:
            patient_dob = date(2000 + int(patient_id [:2]) , int(patient_id[2:4]), int(patient_id[4:6]))
        else:
            patient_dob = date(1900 + int(patient_id [:2]) , int(patient_id[2:4]), int(patient_id[4:6]))
        patient_sex = int(patient_id[6:7]) > 4 and 'M' or 'F'
        
        patient = Patient(fname = patient_name,
                        lname = patient_surname,
                        id_number = str(patient_id),
                        sex = patient_sex,
                        date_of_birth = patient_dob,
                        address = patient_address,
                        phone = patient_phone,
                        email = patient_email,
                        blood_type = blood_type,
                        password = patient_password
                    )
        db.session.add(patient)
        db.session.commit()
        return jsonify({"message": "Patient added successfully"}), 200
    elif data['table'] == 'admin':
        admin_password = data.get('password')
        admin_username = data.get('username')
        admin_email = data.get('email')
        admin_fullname = data.get('fullname')
        admin_created_at = data.get('created_at')

        admin = Admin(username=admin_username,
                    password=admin_password,
                    email=admin_email,
                    fullname=admin_fullname,
                    created_at=admin_created_at)
        db.session.add(admin)
        db.session.commit()
        return jsonify({"message": "Admin added successfully"}), 200
    return jsonify({"message": "Could Not Add Data"}), 404



@auth.route('/api/get_data', methods = ['POST'])
def get_data():
    data = request.get_json()
    #Expected data {table}
    if data['table'] == 'admin':
        admins = db.session.query(Admin).all()
        return jsonify([admin.to_dict() for admin in admins]), 200
    if data['table'] == 'patient':
        patients = db.session.query(Patient).all()
        return jsonify([patient.to_dict() for patient in patients]), 200
    if data['table'] == 'doctor':
        doctors = db.session.query(Doctor).all()
        return jsonify([doctor.to_dict() for doctor in doctors]), 200
    return jsonify({"message": "Data not found"}), 404

@auth.route('/api/get_admin', methods = ['POST'])
def get_admin():
    data = request.get_json()
    print(data)
    #Expected data {table}

    admin = db.session.query(Admin).filter_by(admin_id=data['id']).first()

    if admin:
        return jsonify(admin.to_dict()), 200
    return jsonify({"message": "Admin not found"}), 404

@auth.route('/api/get_doctor', methods = ['POST'])
def get_doctor():
    data = request.get_json()
    #Expected data {table}

    doctor = db.session.query(Doctor).filter_by(doctor_id=data['id']).first()

    if doctor:
        return jsonify(doctor.to_dict()), 200
    return jsonify({"message": "Admin not found"}), 404