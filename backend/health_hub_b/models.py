# models.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import base64
from werkzeug.security import generate_password_hash, check_password_hash



db = SQLAlchemy()

class Admin(db.Model):
    __tablename__ = 'admin'
    
    admin_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    fullname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    phone = db.Column(db.String(10))
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self) :
        return {
            "admin_id": self.admin_id,
            "username": self.username,
            "password": self.password,
            "fullname": self.fullname,
            "email": self.email,
            "last_login": self.last_login,
            "created_at": self.created_at,
            "is_active": self.is_active
        }

class Patient(db.Model):
    __tablename__ = 'patient'
    login_id = db.Column(db.String(15), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(30), nullable=False)
    lname = db.Column(db.String(30), nullable=False)
    id_number = db.Column(db.String(13), unique=True, nullable=False)
    sex = db.Column(db.String(1), nullable=False)
    date_of_birth = db.Column(db.Date)
    address = db.Column(db.Text)
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100))
    blood_type = db.Column(db.String(3))
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    responsible_parties = db.relationship('ResponsibleParty', backref='patient', lazy=True)
    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    treatments = db.relationship('PatientTreatment', backref='patient', lazy=True)
    records = db.relationship('PatientRecord', backref='patient', lazy=True)
    allergies = db.relationship('PatientAllergy', backref='patient', lazy=True)
    prescriptions = db.relationship('Prescription', backref='patient', lazy=True)
    
    def __init__(self, **kwargs):
        super(Patient, self).__init__(**kwargs)
        self.generate_login_id()
        self.generate_patient_id()

    def to_dict(self):
        data = {
            "id": self.login_id,
            "patient_id": self.patient_id,
            "fname": self.fname,
            "lname":  self.lname,
            "id_number": self.id_number,
            "sex": self.sex,
            "date_of_birth": self.date_of_birth,
            "address": self.address,
            "phone": self.phone,
            "email": self.email,
            "blood_type": self.blood_type,
            "created_at": self.created_at,
            "account_updated_at": self.updated_at
        }

        return data


    def generate_patient_id(self):
        lastId = db.session.query(func.max(Patient.patient_id)).scalar()
        self.patient_id = lastId + 1 if lastId else 1
    
    def generate_login_id(self):
        if self.id_number and self.account_created_date:
            year_part = self.account_created_date.strftime('%y')
            id_part = self.id_number[6:]  # Skip first 6 digits (birthdate)
            self.username = f"P{year_part}{id_part[:7]}"  # P + YY + 7 digits from ID
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class ResponsibleParty(db.Model):
    __tablename__ = 'responsible_party'
    
    responsible_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    title = db.Column(db.String(10))
    fname = db.Column(db.String(30), nullable=False)
    lname = db.Column(db.String(30), nullable=False)
    relationship = db.Column(db.String(30))
    cellno = db.Column(db.String(15), nullable=False)
    address = db.Column(db.Text)
    post_code = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Doctor(db.Model):
    __tablename__ = 'doctor'
    
    doctor_id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(15), unique=True, nullable=False)
    
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    specialty = db.Column(db.String(50))
    license_number = db.Column(db.String(20), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100), unique=True, nullable=False)
    account_created_date = db.Column(db.Date, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    treatments = db.relationship('PatientTreatment', backref='doctor', lazy=True)
    prescriptions = db.relationship('Prescription', backref='doctor', lazy=True)
    records = db.relationship('PatientRecord', foreign_keys='PatientRecord.recorded_by', 
                            backref='recording_doctor', lazy=True)
    
    def __init__(self, **kwargs):
        super(Doctor, self).__init__(**kwargs)
        self.gen_emp_id()
    
    def to_dict(self):
        return {
            "doctor_id": self.doctor_id,
            "employee_id": self.employee_id,
            "username": self.username,
            "name": self.name,
            "specialty": self.specialty,
            "license_number": self.license_number,
            "phone": self.phone,
            "email": self.email,
            "account_created_date": self.account_created_date,
            "created_at": self.created_at,
            "is_active": self.is_active
        }
    
    def gen_emp_id(self):
        self.employee_id = 'D' +str(self.username)

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Pharmacist(db.Model):
    __tablename__ = 'pharmacist'
    
    pharmacist_id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(15), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    license_number = db.Column(db.String(20), unique=True, nullable=False)
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100), unique=True, nullable=False)
    account_created_date = db.Column(db.Date, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    prescriptions = db.relationship('Prescription', backref='pharmacist', lazy=True)
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Appointment(db.Model):
    __tablename__ = 'appointment'
    
    appointment_id = db.Column(db.Integer, primary_key=True)
    appointment_type = db.Column(db.String(30), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Scheduled')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



    
    __table_args__ = (
        db.CheckConstraint("end_time > start_time", name="valid_appointment_time"),
        db.CheckConstraint("status IN ('Scheduled', 'Completed', 'Cancelled', 'No-show')", 
                         name="valid_status")
    )

    def to_dict(self, doc_name=None):
        return {
            "appointment_id": self.appointment_id,
            "appointment_type": self.appointment_type,
            "doctor_id": self.doctor_id,
            "patient_id": self.patient_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "status": self.status,
            "notes": self.notes,
            "created_at": self.created_at,
            "doctor_name": doc_name
        }

class PatientTreatment(db.Model):
    __tablename__ = 'patienttreatment'
    
    treat_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'))
    treatment_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    treat_description = db.Column(db.Text, nullable=False)
    diagnosis = db.Column(db.String(100))
    follow_up_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "treat_id": self.treat_id,
            "date": self.treatment_date,
            "description": self.treat_description,
            "diagnosis": self.diagnosis,
            "follow_up_date": self.follow_up_date,
        }


class PatientRecord(db.Model):
    __tablename__ = 'patientrecord'
    
    record_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    treat_id = db.Column(db.Integer, db.ForeignKey('patienttreatment.treat_id'))
    record_type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text)
    date_of_event = db.Column(db.DateTime, nullable=False)
    recorded_by = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        db.CheckConstraint("record_type IN ('Examination', 'Lab Result', 'Imaging', 'Note', 'Procedure')", 
                         name="valid_record_type"),
    )

    def to_dict(self):
        return {
            "patient_record_id": db.session.query(Patient).filter_by(patient_id=self.patient_id).first().login_id,
            "patient_id": self.patient_id,
            "record_id": self.record_id,
            "treat_id": self.treat_id,
            "name": db.session.query(Patient).filter_by(patient_id=self.patient_id).first().fname,
            "surname": db.session.query(Patient).filter_by(patient_id=self.patient_id).first().lname,
            "type": self.record_type,
            "description": self.description,
            "details": self.details,
            "date": self.date_of_event,
            "doctor": db.session.query(Doctor).filter_by(doctor_id=self.recorded_by).first().name,
            "treatment": None,
        }

class PatientAllergy(db.Model):
    __tablename__ = 'patient_allergy'
    
    allergy_id = db.Column(db.Integer, primary_key=True)
    allergy = db.Column(db.String(50), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    severity = db.Column(db.String(10))
    reaction = db.Column(db.String(100))
    first_identified = db.Column(db.Date)
    last_occurrence = db.Column(db.Date)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        db.UniqueConstraint('allergy', 'patient_id', name='unique_allergy_per_patient'),
        db.CheckConstraint("severity IN ('Mild', 'Moderate', 'Severe', 'Unknown')", 
                         name="valid_severity"),
    )

class Prescription(db.Model):
    __tablename__ = 'prescription'
    
    prescription_id = db.Column(db.Integer, primary_key=True)
    pres_code = db.Column(db.String(10), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'))
    pharmacist_id = db.Column(db.Integer, db.ForeignKey('pharmacist.pharmacist_id'))
    medication = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50), nullable=False)
    instructions = db.Column(db.Text)
    date_prescribed = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_filled = db.Column(db.DateTime)
    refills_remaining = db.Column(db.Integer, nullable=False, default=0)
    status = db.Column(db.String(20), nullable=False, default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        db.CheckConstraint("status IN ('Pending', 'Filled', 'Cancelled', 'Expired')", 
                         name="valid_status"),
    )


    def to_dict(self):
        return {
            "id": self.prescription_id,
            "code": self.pres_code,
            "medication": self.medication,
            "dosage": self.dosage,
            "patient": db.session.query(Patient).filter_by(patient_id=self.patient_id).first().fname + " " + db.session.query(Patient).filter_by(patient_id=self.patient_id).first().lname,
            "doctor": db.session.query(Doctor).filter_by(doctor_id=self.doctor_id).first().name,
            "pharmacist": db.session.query(Pharmacist).filter_by(pharmacist_id=self.pharmacist_id).first().name,
            "prescription_date": self.date_prescribed,
            "status": self.status,
            "instruction": self.instructions,
            "date_filled": self.date_filled,
            "refills_remaining": self.refills_remaining,
            "date_prescribed": self.date_prescribed
        }

class Medication(db.Model):
    __tablename__ = 'medication'
    
    medication_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(100))
    in_stock = db.Column(db.Integer, nullable=False, default=0)
    
    def to_dict(self):
        return {
            "medication_id": self.medication_id,
            "name": self.name,
            "ingredients": self.ingredients,
            "in_stock": self.in_stock
        }

    __table_args__ = (
        db.UniqueConstraint('name', name='unique_medication'),
    )


class AuditLog(db.Model):
    __tablename__ = 'audit_log'
    
    audit_id = db.Column(db.Integer, primary_key=True)
    table_name = db.Column(db.String(50), nullable=False)
    record_id = db.Column(db.Integer, nullable=False)
    action = db.Column(db.String(10), nullable=False)
    old_values = db.Column(db.JSON)
    new_values = db.Column(db.JSON)
    changed_by = db.Column(db.Integer, db.ForeignKey('admin.admin_id'))
    changed_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (
        db.CheckConstraint("action IN ('INSERT', 'UPDATE', 'DELETE')", 
                         name="valid_action"),
    )