-- Drop all tables in reverse order of dependency
DROP TABLE IF EXISTS AuditLog CASCADE;
DROP TABLE IF EXISTS Prescription CASCADE;
DROP TABLE IF EXISTS PatientAllergy CASCADE;
DROP TABLE IF EXISTS PatientRecord CASCADE;
DROP TABLE IF EXISTS PatientTreatment CASCADE;
DROP TABLE IF EXISTS Appointment CASCADE;
DROP TABLE IF EXISTS Pharmacist CASCADE;
DROP TABLE IF EXISTS Doctor CASCADE;
DROP TABLE IF EXISTS ResponsibleParty CASCADE;
DROP TABLE IF EXISTS Patient CASCADE;
DROP TABLE IF EXISTS Admin CASCADE;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create login ID generation function
CREATE OR REPLACE FUNCTION generate_login_id(id_number VARCHAR, account_date DATE, prefix VARCHAR DEFAULT '') 
RETURNS VARCHAR AS $$
BEGIN
    RETURN prefix || 
           SUBSTRING(TO_CHAR(account_date, 'YY') FROM 1 FOR 2) || 
           SUBSTRING(id_number FROM 7 FOR 7);
END;
$$ LANGUAGE plpgsql;

-- Admin table with improved security
CREATE TABLE Admin (
  admin_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Patient table with login credentials
CREATE TABLE Patient (
  patientId SERIAL PRIMARY KEY,
  login_id VARCHAR(15) UNIQUE,
  fname VARCHAR(30) NOT NULL,
  lname VARCHAR(30) NOT NULL,
  id_number VARCHAR(13) UNIQUE NOT NULL
    CHECK (id_number ~ '^[0-9]{13}$'),
  sex CHAR(1) NOT NULL
    CHECK (sex IN ('M', 'F', 'O', 'U')),
  date_of_birth DATE,
  address TEXT,
  phone VARCHAR(15),
  email VARCHAR(100),
  blood_type VARCHAR(3),
  password VARCHAR(255) NOT NULL,
  account_created_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Responsible party with proper relationship to patient
CREATE TABLE ResponsibleParty (
  responsible_id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  title VARCHAR(10),
  fname VARCHAR(30) NOT NULL,
  lname VARCHAR(30) NOT NULL,
  relationship VARCHAR(30),
  cellno VARCHAR(15) NOT NULL,
  address TEXT,
  post_code VARCHAR(10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Doctor table with professional details and employee ID
CREATE TABLE Doctor (
  doctor_id SERIAL PRIMARY KEY,
  employee_id VARCHAR(15) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  specialty VARCHAR(50),
  license_number VARCHAR(20) UNIQUE NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(100) UNIQUE NOT NULL,
  account_created_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Pharmacist table with employee ID
CREATE TABLE Pharmacist (
  pharmacist_id SERIAL PRIMARY KEY,
  employee_id VARCHAR(15) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  license_number VARCHAR(20) UNIQUE NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(100) UNIQUE NOT NULL,
  account_created_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE medication (
    medication_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    ingredients TEXT,
    in_stock INTEGER NOT NULL DEFAULT 0
);

-- Appointment table with proper time handling
CREATE TABLE Appointment (
  appointment_id SERIAL PRIMARY KEY,
  appointment_type VARCHAR(30) NOT NULL,
  doctor_id INT NOT NULL REFERENCES Doctor(doctor_id) ON DELETE RESTRICT,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) NOT NULL
    DEFAULT 'Scheduled'
    CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'No-show')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_appointment_time CHECK (end_time > start_time)
);

-- Create index for appointment queries
CREATE INDEX idx_appointment_doctor ON Appointment(doctor_id, start_time);
CREATE INDEX idx_appointment_patient ON Appointment(patient_id, start_time);

-- Patient treatment with detailed information
CREATE TABLE PatientTreatment (
  treat_id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  doctor_id INT REFERENCES Doctor(doctor_id) ON DELETE SET NULL,
  treatment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  treat_description TEXT NOT NULL,
  diagnosis VARCHAR(100),
  follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Patient medical records
CREATE TABLE PatientRecord (
  record_id SERIAL PRIMARY KEY,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  treat_id INT REFERENCES PatientTreatment(treat_id) ON DELETE SET NULL,
  record_type VARCHAR(20) NOT NULL
    CHECK (record_type IN ('Examination', 'Lab Result', 'Imaging', 'Note', 'Procedure')),
  description VARCHAR(100) NOT NULL,
  details TEXT,
  date_of_event TIMESTAMPTZ NOT NULL,
  recorded_by INT REFERENCES Doctor(doctor_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Patient allergies with severity tracking
CREATE TABLE PatientAllergy (
  allergy_id SERIAL PRIMARY KEY,
  allergy VARCHAR(50) NOT NULL,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  severity VARCHAR(10)
    CHECK (severity IN ('Mild', 'Moderate', 'Severe', 'Unknown')),
  reaction VARCHAR(100),
  first_identified DATE,
  last_occurrence DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_allergy_per_patient UNIQUE (allergy, patient_id)
);

-- Prescription management
CREATE TABLE Prescription (
  prescription_id SERIAL PRIMARY KEY,
  pres_code VARCHAR(10) UNIQUE NOT NULL,
  patient_id INT NOT NULL REFERENCES Patient(patientId) ON DELETE CASCADE,
  doctor_id INT REFERENCES Doctor(doctor_id) ON DELETE SET NULL,
  pharmacist_id INT REFERENCES Pharmacist(pharmacist_id) ON DELETE SET NULL,
  medication VARCHAR(100) NOT NULL,
  dosage VARCHAR(50) NOT NULL,
  instructions TEXT,
  date_prescribed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_filled TIMESTAMPTZ,
  refills_remaining INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL
    DEFAULT 'Pending'
    CHECK (status IN ('Pending', 'Filled', 'Cancelled', 'Expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit trail for critical changes
CREATE TABLE AuditLog (
  audit_id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id INT NOT NULL,
  action VARCHAR(10) NOT NULL
    CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_values JSONB,
  new_values JSONB,
  changed_by INT REFERENCES Admin(admin_id) ON DELETE SET NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create triggers for automatic ID generation
CREATE OR REPLACE FUNCTION set_patient_login_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.login_id = generate_login_id(NEW.id_number, COALESCE(NEW.account_created_date, CURRENT_DATE), 'P');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER patient_before_insert
BEFORE INSERT ON Patient
FOR EACH ROW
EXECUTE FUNCTION set_patient_login_id();

-- Function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at fields
CREATE TRIGGER update_patient_modtime
BEFORE UPDATE ON Patient
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create authentication functions
CREATE OR REPLACE FUNCTION authenticate_patient(login_id VARCHAR, pwd VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  hashed_pwd VARCHAR;
BEGIN
  SELECT password INTO hashed_pwd 
  FROM Patient 
  WHERE login_id = $1;
  
  RETURN hashed_pwd IS NOT NULL AND hashed_pwd = crypt(pwd, hashed_pwd);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION authenticate_doctor(employee_id VARCHAR, pwd VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  hashed_pwd VARCHAR;
BEGIN
  SELECT password INTO hashed_pwd 
  FROM Doctor 
  WHERE employee_id = $1;
  
  RETURN hashed_pwd IS NOT NULL AND hashed_pwd = crypt(pwd, hashed_pwd);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION authenticate_pharmacist(employee_id VARCHAR, pwd VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  hashed_pwd VARCHAR;
BEGIN
  SELECT password INTO hashed_pwd 
  FROM Pharmacist 
  WHERE employee_id = $1;
  
  RETURN hashed_pwd IS NOT NULL AND hashed_pwd = crypt(pwd, hashed_pwd);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE issue_medication(
    p_medication_id INTEGER,
    p_prescription_id INTEGER,
    p_quantity_dispensed INTEGER,
    p_pharmacist_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if medication exists and has enough stock
    IF (SELECT in_stock FROM medication WHERE medication_id = p_medication_id) < p_quantity_dispensed THEN
        RAISE EXCEPTION 'Not enough stock for medication ID %', p_medication_id;
    END IF;

    -- Update medication stock
    UPDATE medication
    SET in_stock = in_stock - p_quantity_dispensed
    WHERE medication_id = p_medication_id;

    -- Update prescription: decrement refill count and assign pharmacist
    UPDATE prescription
    SET refills_remaining = GREATEST(refills_remaining - 1, 0),
        pharmacist_id = p_pharmacist_id
    WHERE prescription_id = p_prescription_id;
END;
$$;
