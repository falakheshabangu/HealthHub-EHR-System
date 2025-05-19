import random
from flask import Blueprint, jsonify, request, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import text
from .models import db, Patient, Doctor, PatientRecord, Admin, Appointment, PatientTreatment, Prescription, Pharmacist, Medication
from datetime import date, datetime, timedelta
from .utils import map_treatments_to_records
import random
routes = Blueprint('routes', __name__)



###APIS THAT USE GET METHOD
@routes.route("/api/get_appointments")
@jwt_required()
def get_appointments():
    patient_id = get_jwt_identity()
    appointments = db.session.query(Appointment).filter_by(patient_id=patient_id).all()
    appointments = [appointment.to_dict(doc_name=db.session.query(Doctor).filter_by(doctor_id=appointment.doctor_id).first().name) for appointment in appointments]
    return jsonify(appointments), 200

@routes.route("/api/get_patient_records/<string:role>")
@jwt_required()
def get_patient_records(role):
    if role == 'doctor':
        doctor_id = get_jwt_identity()
        patient_records = db.session.query(PatientRecord).filter_by().all()
        patient_records = [record.to_dict() for record in patient_records]
        patient_treatments = db.session.query(PatientTreatment).filter_by(patient_id=patient_records[0].get("patient_id")).all()
        patient_treatments = [treatment.to_dict() for treatment in patient_treatments]

        patient_records = map_treatments_to_records(patient_records, patient_treatments)
    elif role == 'patient':
        patient_id = get_jwt_identity()
        patient_records = db.session.query(PatientRecord).filter_by(patient_id=patient_id).all()
        patient_treatments = db.session.query(PatientTreatment).filter_by(patient_id=patient_id).all()

        patient_treatments = [treatment.to_dict() for treatment in patient_treatments]
        patient_records = [record.to_dict()for record in patient_records]

        patient_records = map_treatments_to_records(patient_records, patient_treatments)
    return jsonify(patient_records), 200

@routes.route("/api/get_patient_record/<int:patient_id>")
@jwt_required()
def get_patient_record(patient_id):
    patient = db.session.query(PatientRecord).filter_by(patient_id=patient_id).all()
    if patient:
        return jsonify({"message" : "processed"})#jsonify(patient_record.to_dict()), 200
    return jsonify({"message": "Patient not found"}), 404

@routes.route("/api/get_doctors")
@jwt_required()
def get_doctors():
    doctors = db.session.query(Doctor).all()
    doctors = [doctor.to_dict() for doctor in doctors]
    return jsonify(doctors), 200

@routes.route("/api/get_user_accounts")
@jwt_required()
def get_user_accounts():
    accounts = []

    admins = db.session.query(Admin).all()
    patients = db.session.query(Patient).all()
    doctors = db.session.query(Doctor).all()
    pharmacists = db.session.query(Pharmacist).all()

    for admin in admins:
        accounts.append({"role": "admin", "name": admin.fullname, "email": admin.email, "phone": admin.phone, "is_active": admin.is_active, "created_at":admin.created_at,"id": admin.admin_id})
    for patient in patients:
        accounts.append({"role": "patient", "name": patient.fname + " " + patient.lname, "email": patient.email, "phone": patient.phone, "is_active": patient.is_active, "created_at": patient.created_at, "id": patient.patient_id})
    for doctor in doctors:
        accounts.append({"role": "doctor", "name": doctor.name, "email": doctor.email,"phone": doctor.phone, "is_active":doctor.is_active, "created_at": doctor.created_at, "id": doctor.doctor_id})
    for pharmacist in pharmacists:
        accounts.append({"role": "pharmacist", "name": pharmacist.name, "email": pharmacist.email, "phone": pharmacist.phone, "is_active":pharmacist.is_active, "created_at" : pharmacist.created_at, "id": pharmacist.pharmacist_id})

    return jsonify(accounts), 200

@routes.route('/api/get_user_account/<int:id>')
@jwt_required()
def get_user_account(id):
    user_id = id
    role = request.args.get('role')
    if role == 'admin':
        user = db.session.query(Admin).filter_by(admin_id=user_id).first()
        if user:
            return jsonify({"role": "admin","password":user.password,"username": user.username, "name": user.fullname, "email": user.email, "phone": user.phone, "is_active": user.is_active, "created_at":user.created_at, "id": user.admin_id}), 200
    elif role == 'doctor':
        user = db.session.query(Doctor).filter_by(doctor_id=user_id).first()
        if user:
            return jsonify({"role": "doctor","password":user.password,"username": user.username, "name": user.name, "email": user.email, "phone": user.phone, "is_active":user.is_active, "license_number":user.license_number,"created_at":user.created_at, "speciality":user.specialty,  "id": user.doctor_id}), 200
    elif role == 'pharmacist':
        user = db.session.query(Pharmacist).filter_by(pharmacist_id=user_id).first()
        if user:
            return jsonify({"role": 
                            "pharmacist", 
                            "name": user.name,
                            "username": user.username, 
                            "email": user.email, 
                            "phone": user.phone, 
                            "is_active":user.is_active, 
                            "created_at" :user.created_at, 
                            "license_number":user.license_number,
                             "id": user.pharmacist_id,
                             "password":user.password}), 200
    elif role == 'patient':
        user = db.session.query(Patient).filter_by(patient_id=user_id).first()
        if user:
            return jsonify({"role": "patient", 
                            "name": user.fname + " " + user.lname,
                            "email": user.email, "phone": user.phone,
                            "id_number": user.id_number,
                            "is_active":user.is_active,
                            "created_at" :user.created_at,
                            "sex": user.sex,
                            "address": user.address,
                            "blood_type": user.blood_type,
                            "date_of_birth": user.date_of_birth,
                            "password": user.password,
                             "id": user.patient_id}), 200

    return jsonify({"message": "User not found"}), 404

@routes.route('/api/get_prescriptions')
@jwt_required()
def get_prescriptions():
    patient_id = get_jwt_identity()
    prescriptions = db.session.query(Prescription).filter_by(patient_id=patient_id).all()
    prescriptions = [prescription.to_dict() for prescription in prescriptions]
    return jsonify(prescriptions), 200

@routes.route('/api/pharmacist/get_prescriptions')
@jwt_required()
def get_pharmacist_prescriptions():
    pharmacist_id = get_jwt_identity()
    prescriptions = db.session.query(Prescription).filter_by(pharmacist_id=pharmacist_id).all()
    prescriptions = [prescription.to_dict() for prescription in prescriptions]
    return jsonify(prescriptions), 200

@routes.route('/api/get_medications')
@jwt_required()
def get_medication():
    medications = db.session.query(Medication).all()
    medications = [medication.to_dict() for medication in medications]
    return jsonify(medications), 200

@routes.route('/api/get_patient/<int:id>')
@jwt_required()
def get_patient(id):
    patient = db.session.query(Patient).filter_by(patient_id=id).first()
    if patient:
        return jsonify(patient), 200
    return jsonify({"message": "The patient was not found"}), 404

@routes.route('/api/get_patients')
@jwt_required()
def get_patients():
    patients = db.session.query(Patient).all()

    patients = [patient.to_dict() for patient in patients]
    print(patients)
    return jsonify(patients), 200

##APIS THAT USE POST METHOD
@routes.route('/api/schedule_appointment', methods=['POST'])
@jwt_required()
def schedule_appointment():
    data = request.get_json()
    doctor_id = data.get('doctor')
    date = data.get('date') # comes in this format $2023-10-01
    time = data.get('time') # comes in this format $10:00 AM

    #I don't know why the date and time are coming with a $ sign, but they are.
    #So Imma just replace the $ sign and strip the ting, you feel me?
    date = date.replace('$', '').strip()
    time = time.replace('$', '').strip()
    start_time = datetime.strptime(date + " " + time, "%Y-%m-%d %I:%M %p")
    end_time = start_time + timedelta(hours = random.randint(1, 3)) # Add a random 1-3 hours to the timestamp

    # ahh turns out I was mistaken about using python in string templating just use {} instead of ${}
    reason = data.get('reason')
    notes = data.get('notes')
    status = data.get('status')
    patient_id = get_jwt_identity()
    new_appointment = Appointment(doctor_id=doctor_id,status=status, start_time=start_time, end_time=end_time, appointment_type=reason,notes=notes, patient_id=patient_id )
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment scheduled successfully"}), 201

@routes.route('/api/add_data', methods =['POST'])
@jwt_required()
def add_data():
    data = request.get_json()

    admin = db.session.query(Admin).filter_by(email=data.get('email')).first()
    patient = db.session.query(Patient).filter_by(email=data.get('email')).first()
    pharmacist = db.session.query(Pharmacist).filter_by(email=data.get('email')).first()
    doctor = db.session.query(Doctor).filter_by(email=data.get('email')).first()

    if admin or patient or pharmacist or doctor:
        return {}

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
                        password = patient_password,

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

@routes.route('/api/add_user', methods=['POST'])
@jwt_required()
def add_user():
    data = request.get_json()
    role = data.get('role')
    if role == 'doctor':
        print(data)
        doctor_name = data.get('name')
        doc_username = data.get("username")
        doctor_email = data.get('email')
        doctor_phone = data.get('phone')
        doctor_password = data.get('password')
        doctor_specialization = data.get('speciality')
        license_number = data.get('license_number')

        doctor = Doctor(name=doctor_name,
                        username =  doc_username,
                        email=doctor_email,
                        phone=doctor_phone,
                        password=doctor_password,
                        specialty=doctor_specialization,
                        license_number = license_number)
        db.session.add(doctor)
        db.session.commit()
        return jsonify({"message": "Doctor added successfully"}), 200
    elif role == 'pharmacist':
        pharmacist_name = data.get('name')
        pharmacist_email = data.get('email')
        pharmacist_phone = data.get('phone')
        pharmacist_password = data.get('password')

        pharmacist = Pharmacist(name=pharmacist_name,
                                email=pharmacist_email,
                                phone=pharmacist_phone,
                                password=pharmacist_password)
        db.session.add(pharmacist)
        db.session.commit()
        return jsonify({"message": "Pharmacist added successfully"}), 200
    elif role == 'admin':
        admin_name = data.get('fullname')
        admin_email = data.get('email')
        admin_username = data.get("username")
        admin_phone = data.get('phone')
        admin_password = data.get('password')

        admin = Admin(fullname=admin_name,
                      username=admin_username,
                      email=admin_email,
                      phone=admin_phone,
                      password=admin_password)
        db.session.add(admin)
        db.session.commit()
        return jsonify({"message": "Admin added successfully"}), 200
    elif role == 'patient':
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
        if int(patient_id[:2]) <= 25:
            patient_dob = date(2000 + int(patient_id[:2]), int(patient_id[2:4]), int(patient_id[4:6]))
        else:
            patient_dob = date(1900 + int(patient_id[:2]), int(patient_id[2:4]), int(patient_id[4:6]))

        patient = Patient(fname=patient_name,
                        lname=patient_surname,
                        id_number=str(patient_id),
                        sex=patient_sex,
                        date_of_birth=patient_dob,
                        address=patient_address,
                        phone=patient_phone,
                        email=patient_email,
                        blood_type=blood_type,
                        password=patient_password
                        )
        db.session.add(patient)
        db.session.commit()
        return jsonify({"message": "Patient added successfully"}), 200



    return jsonify({"message": "Could Not Add User"}), 404

@routes.route('/api/create_record', methods=['POST'])
@jwt_required()
def create_record():
    doctor_id = get_jwt_identity()
    data = request.get_json()
        
    # Validate required fields
    required_fields = ['patient_id', 'type', 'description', 'treatment']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
        


    # Get doctor ID from JWT or request
    doctor = Doctor.query.filter_by(doctor_id=doctor_id).first()
    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404
        
    # Create treatment first
    treatment_data = data['treatment']
    treatment = PatientTreatment(
        patient_id=data['patient_id'],
        doctor_id=doctor.doctor_id,
        treatment_date=treatment_data.get('treatment_date', datetime.utcnow()),
        treat_description=treatment_data.get('treatment_description', ''),
        diagnosis=treatment_data.get('diagnosis', ''),
        follow_up_date=treatment_data.get('follow_up_date')
    )
        
    db.session.add(treatment)
    db.session.flush()  # To get the treatment ID
        
        # Create patient record
    record = PatientRecord(
        patient_id=data['patient_id'],
        treat_id=treatment.treat_id,
        record_type=data['type'],
        description=data['description'],
        details=data.get('details', ''),
        date_of_event=data.get('date', datetime.utcnow()),
        recorded_by=doctor.doctor_id
    )

    db.session.add(record)
    db.session.commit()

    # Prepare response
    response_data = {
        "message": "Record and treatment created successfully",
        "record_id": record.record_id,
        "treatment_id": treatment.treat_id,
        "patient_id": record.patient_id
    }
    
    return jsonify(response_data), 201
    
###APIS THAT USE PUT METHOD
@routes.route("/api/cancel_appointment/<int:id>", methods=['PUT'])
@jwt_required()
def cancel_appointment(id):
    appointment_id = id
    appointment = db.session.query(Appointment).filter_by(appointment_id=appointment_id).first()

    if appointment:
        appointment.status = 'Cancelled'
        db.session.commit()
        return jsonify({"message": "Appointment cancelled successfully"}), 200
    else:
        return jsonify({"message": "Appointment not found"}), 404
    
@routes.route("/api/update_user/<int:id>", methods=['PUT'])
@jwt_required()
def update_user(id):
    user_id = id
    role = request.get_json().get('role')
    if role == 'admin':
        user = db.session.query(Admin).filter_by(admin_id=user_id).first()
        if user:
            user.username = request.get_json().get('username')
            user.fullname = request.get_json().get('name')
            user.password = request.get_json().get('password')
            user.email = request.get_json().get('email')
            user.phone = request.get_json().get('phone')
            db.session.commit()
            return jsonify({"message": "Admin updated successfully"}), 200
    elif role == 'doctor':
        user = db.session.query(Doctor).filter_by(doctor_id=user_id).first()
        if user:
            user.name = request.get_json().get('name')
            user.email = request.get_json().get('email')
            user.phone = request.get_json().get('phone')
            user.password = request.get_json().get('password')
            db.session.commit()
            return jsonify({"message": "Doctor updated successfully"}), 200
    elif role == 'pharmacist':
        user = db.session.query(Pharmacist).filter_by(pharmacist_id=user_id).first()
        if user:
            user.name = request.get_json().get('name')
            user.email = request.get_json().get('email')
            user.phone = request.get_json().get('phone')
            user.password = request.get_json().get('password')
            db.session.commit()
            return jsonify({"message": "Pharmacist updated successfully"}), 200
    elif role == 'patient':
        user = db.session.query(Patient).filter_by(patient_id=user_id).first()
        if user:
            user.fname = request.get_json().get('fname')
            user.lname = request.get_json().get('lname')
            user.id_number = request.get_json().get('id_number')
            user.address = request.get_json().get('address')
            user.phone = request.get_json().get('phone')
            user.email = request.get_json().get('email')
            user.blood_type = request.get_json().get('blood_type')
            user.password = request.get_json().get('password')
            user.sex = request.get_json().get('sex')
            user.date_of_birth = request.get_json().get('date_of_birth')

            db.session.commit()
            return jsonify({"message": "Patient updated successfully"}), 200
    else:
        return jsonify({"message": "Invalid role"}), 400

@routes.route('/api/issue_prescription/<int:id>', methods=['PUT'])
@jwt_required()
def issue_prescription(id):
    pharmacist_id = get_jwt_identity()
    prescription_id = id
    prescription = db.session.query(Prescription).filter_by(prescription_id=prescription_id).first()
    medication = db.session.query(Medication).filter_by(name=prescription.medication).first()
    print(str(medication.medication_id) + "  " + str(prescription_id))
    if prescription:
        db.session.execute(text("CALL issue_medication(:p_medication_id, :p_prescription_id, :p_quantity, :p_pharmacist_id )"),
                            {"p_medication_id": medication.medication_id, "p_pharmacist_id": pharmacist_id, "p_quantity": random.randint(1, 10), "p_prescription_id":prescription_id} )
        db.session.commit()
        return jsonify({"message": "Prescription issued successfully"}), 200
    else:
        return jsonify({"message": "Prescription not found"}), 404

#APIS THAT USE DELETE METHOD
@routes.route("/api/delete_user/<int:id>", methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_id = id
    role = request.get_json().get('role')
    if role == 'admin':
        user = db.session.query(Admin).filter_by(admin_id=user_id).first()
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Admin deleted successfully"}), 200
    elif role == 'doctor':
        user = db.session.query(Doctor).filter_by(doctor_id=user_id).first()
        user.is_active = False
        db.session.commit()
    elif role == 'pharmacist':
        user = db.session.query(Pharmacist).filter_by(pharmacist_id=user_id).first()
        user.is_active = False
        db.session.commit()
    elif role == 'patient':
        user = db.session.query(Patient).filter_by(patient_id=user_id).first()
        user.is_active = False
        db.session.commit()
    else:
        return jsonify({"message": "Invalid role"}), 400
    
    return jsonify({"message": "User Deactivated successfully"}), 200