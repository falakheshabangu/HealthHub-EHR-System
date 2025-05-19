-- Set timezone to South Africa (UTC+2)
SET TIME ZONE 'Africa/Johannesburg';

-- Insert Admins
INSERT INTO Admin (username, password, fullname, email) VALUES
('admin1', crypt('Pass@123', gen_salt('bf')), 'John Mokoena', 'john.mokoena@gmail.com'),
('admin2', crypt('Pass@123', gen_salt('bf')), 'Naledi Khumalo', 'naledi.khumalo@yahoo.com'),
('admin3', crypt('Pass@123', gen_salt('bf')), 'Thabo Dlamini', 'thabo.dlamini@outlook.com'),
('admin4', crypt('Pass@123', gen_salt('bf')), 'Sibongile Ncube', 'sibongile.ncube@icloud.com'),
('admin5', crypt('Pass@123', gen_salt('bf')), 'Bongani Sithole', 'bongani.sithole@zoho.com');

-- Insert Patients
INSERT INTO Patient (fname, lname, id_number, sex, date_of_birth, address, phone, email, blood_type, password) VALUES
('Lebo', 'Nkosi', '9001015800081', 'F', '1990-01-01', '123 Main St, Johannesburg', '0823456789', 'lebo.nkosi@gmail.com', 'O+', crypt('Patient@123', gen_salt('bf'))),
('Sizwe', 'Mthethwa', '8503046300085', 'M', '1985-03-04', '45 Nelson Mandela Dr, Durban', '0834567890', 'sizwe.mthethwa@yahoo.com', 'A-', crypt('Patient@123', gen_salt('bf'))),
('Palesa', 'Khoza', '9207154200082', 'F', '1992-07-15', '67 Pretorius St, Pretoria', '0745678901', 'palesa.khoza@outlook.com', 'B+', crypt('Patient@123', gen_salt('bf'))),
('Mandla', 'Zulu', '8805097700087', 'M', '1988-05-09', '89 Victoria Rd, Cape Town', '0656789012', 'mandla.zulu@icloud.com', 'AB-', crypt('Patient@123', gen_salt('bf'))),
('Ayanda', 'Dube', '9508165800083', 'F', '1995-08-16', '101 Long St, Bloemfontein', '0767890123', 'ayanda.dube@zoho.com', 'O-', crypt('Patient@123', gen_salt('bf')));

-- Insert Responsible Parties
INSERT INTO ResponsibleParty (patient_id, title, fname, lname, relationship, cellno, address, post_code) VALUES
(1, 'Mr', 'David', 'Nkosi', 'Father', '0821111111', '123 Main St, Johannesburg', '2000'),
(2, 'Mrs', 'Nomsa', 'Mthethwa', 'Mother', '0832222222', '45 Nelson Mandela Dr, Durban', '4001'),
(3, 'Ms', 'Zanele', 'Khoza', 'Sister', '0743333333', '67 Pretorius St, Pretoria', '0001'),
(4, 'Dr', 'Bheki', 'Zulu', 'Uncle', '0654444444', '89 Victoria Rd, Cape Town', '8001'),
(5, 'Prof', 'Themba', 'Dube', 'Brother', '0765555555', '101 Long St, Bloemfontein', '9301');

-- Insert Doctors
INSERT INTO Doctor (employee_id, username, password, name, specialty, license_number, phone, email) VALUES
('DOC12345', 'drnkosi', crypt('Doctor@123', gen_salt('bf')), 'Dr. Sipho Nkosi', 'Cardiology', 'SA12345', '0811112222', 'sipho.nkosi@gmail.com'),
('DOC67890', 'drmthethwa', crypt('Doctor@123', gen_salt('bf')), 'Dr. Lindiwe Mthethwa', 'Dermatology', 'SA67890', '0822223333', 'lindiwe.mthethwa@yahoo.com'),
('DOC11223', 'drkhoza', crypt('Doctor@123', gen_salt('bf')), 'Dr. Vusi Khoza', 'Neurology', 'SA11223', '0833334444', 'vusi.khoza@outlook.com'),
('DOC44556', 'drzulu', crypt('Doctor@123', gen_salt('bf')), 'Dr. Andile Zulu', 'Pediatrics', 'SA44556', '0844445555', 'andile.zulu@icloud.com'),
('DOC77889', 'drdube', crypt('Doctor@123', gen_salt('bf')), 'Dr. Thuli Dube', 'Orthopedics', 'SA77889', '0855556666', 'thuli.dube@zoho.com');

-- Insert Pharmacists
INSERT INTO Pharmacist (employee_id, username, password, name, license_number, phone, email) VALUES
('PH12345', 'phnkosi', crypt('Pharma@123', gen_salt('bf')), 'Thando Nkosi', 'PH12345', '0611112222', 'thando.nkosi@gmail.com'),
('PH67890', 'phmthethwa', crypt('Pharma@123', gen_salt('bf')), 'Buhle Mthethwa', 'PH67890', '0622223333', 'buhle.mthethwa@yahoo.com'),
('PH11223', 'phkhoza', crypt('Pharma@123', gen_salt('bf')), 'Lerato Khoza', 'PH11223', '0633334444', 'lerato.khoza@outlook.com'),
('PH44556', 'phzulu', crypt('Pharma@123', gen_salt('bf')), 'Sibusiso Zulu', 'PH44556', '0644445555', 'sibusiso.zulu@icloud.com'),
('PH77889', 'phdube', crypt('Pharma@123', gen_salt('bf')), 'Nomvelo Dube', 'PH77889', '0655556666', 'nomvelo.dube@zoho.com');

-- Insert Appointments
INSERT INTO Appointment (appointment_type, doctor_id, patient_id, start_time, end_time, status) VALUES
('General Checkup', 1, 1, '2025-04-01 09:00:00+02', '2025-04-01 09:30:00+02', 'Scheduled'),
('Dermatology Consult', 2, 2, '2025-04-02 10:00:00+02', '2025-04-02 10:45:00+02', 'Scheduled'),
('Neurology Exam', 3, 3, '2025-04-03 11:00:00+02', '2025-04-03 11:30:00+02', 'Scheduled'),
('Pediatric Checkup', 4, 4, '2025-04-04 12:00:00+02', '2025-04-04 12:30:00+02', 'Scheduled'),
('Orthopedic Consult', 5, 5, '2025-04-05 14:00:00+02', '2025-04-05 14:45:00+02', 'Scheduled');


-- Insert Admins
INSERT INTO Admin (username, password, fullname, email, last_login, created_at, is_active) VALUES
('admin_jay', crypt('SecurePass1!', gen_salt('bf')), 'Jay Nhlapho', 'jay.nhlapho@gmail.com', '2025-03-25 10:00:00+02', '2024-12-01 12:00:00+02', TRUE),
('admin_mpho', crypt('SecurePass2!', gen_salt('bf')), 'Mpho Nkosi', 'mpho.nkosi@yahoo.com', '2024-06-10 09:30:00+02', '2023-11-15 08:45:00+02', TRUE),
('admin_sam', crypt('SecurePass3!', gen_salt('bf')), 'Samuel van der Merwe', 'sam.vdm@outlook.com', '2025-02-05 14:10:00+02', '2024-09-20 17:30:00+02', TRUE),
('admin_zanele', crypt('SecurePass4!', gen_salt('bf')), 'Zanele Mthembu', 'zanele.mthembu@gmail.com', '2023-12-15 16:50:00+02', '2023-06-01 11:20:00+02', TRUE),
('admin_thabo', crypt('SecurePass5!', gen_salt('bf')), 'Thabo Dlamini', 'thabo.dlamini@hotmail.com', '2024-08-30 13:20:00+02', '2024-04-12 10:10:00+02', TRUE);

-- Insert Patients
INSERT INTO Patient (fname, lname, id_number, sex, date_of_birth, address, phone, email, blood_type, password, account_created_date, created_at) VALUES
('Lerato', 'Mokoena', '9305020412083', 'F', '1993-05-02', '123 Vilakazi St, Soweto, Johannesburg', '0723456789', 'lerato.mokoena@gmail.com', 'O+', crypt('Patient123!', gen_salt('bf')), '2025-01-12', '2025-01-12 08:30:00+02'),
('Sipho', 'Ngcobo', '8907115214089', 'M', '1989-07-11', '45 Florida Rd, Durban', '0789876543', 'sipho.ngcobo@yahoo.com', 'A-', crypt('Patient123!', gen_salt('bf')), '2024-08-20', '2024-08-20 09:10:00+02'),
('Fatima', 'Khan', '9709230123087', 'F', '1997-09-23', '19 Highveld Rd, Centurion', '0764321987', 'fatima.khan@outlook.com', 'B+', crypt('Patient123!', gen_salt('bf')), '2023-05-06', '2023-05-06 14:45:00+02'),
('Mandla', 'Zulu', '8803155034081', 'M', '1988-03-15', '67 Nelson Mandela Dr, Cape Town', '0825556789', 'mandla.zulu@gmail.com', 'AB-', crypt('Patient123!', gen_salt('bf')), '2024-12-25', '2024-12-25 17:00:00+02'),
('Nomsa', 'Dube', '9208124091086', 'F', '1992-08-12', '22 Oak Ave, Pretoria', '0838765432', 'nomsa.dube@hotmail.com', 'O-', crypt('Patient123!', gen_salt('bf')), '2023-10-10', '2023-10-10 10:30:00+02');

-- Insert Doctors
INSERT INTO Doctor (employee_id, username, password, name, specialty, license_number, phone, email, account_created_date, created_at, is_active) VALUES
('DOC001', 'doc_sibongile', crypt('DoctorPass1!', gen_salt('bf')), 'Dr. Sibongile Ndlovu', 'Cardiologist', 'MP123456', '0712345678', 'sibongile.ndlovu@netcare.co.za', '2025-02-15', '2025-02-15 10:15:00+02', TRUE),
('DOC002', 'doc_jacob', crypt('DoctorPass2!', gen_salt('bf')), 'Dr. Jacob Pretorius', 'Neurologist', 'MP234567', '0798765432', 'jacob.pretorius@lifehealthcare.co.za', '2024-06-08', '2024-06-08 15:45:00+02', TRUE),
('DOC003', 'doc_faith', crypt('DoctorPass3!', gen_salt('bf')), 'Dr. Faith Mokoena', 'Dermatologist', 'MP345678', '0812349987', 'faith.mokoena@mediclinic.co.za', '2023-09-27', '2023-09-27 11:20:00+02', TRUE),
('DOC004', 'doc_thomas', crypt('DoctorPass4!', gen_salt('bf')), 'Dr. Thomas Naidoo', 'Orthopedic Surgeon', 'MP456789', '0729991234', 'thomas.naidoo@netcare.co.za', '2024-12-18', '2024-12-18 13:30:00+02', TRUE),
('DOC005', 'doc_lungile', crypt('DoctorPass5!', gen_salt('bf')), 'Dr. Lungile Dlamini', 'Oncologist', 'MP567890', '0731234567', 'lungile.dlamini@lifehealthcare.co.za', '2023-07-14', '2023-07-14 09:50:00+02', TRUE);

-- Insert Pharmacists
INSERT INTO Pharmacist (employee_id, username, password, name, license_number, phone, email, account_created_date, created_at, is_active) VALUES
('PHAR001', 'phar_nomvula', crypt('PharmPass1!', gen_salt('bf')), 'Nomvula Khumalo', 'P123456', '0745567890', 'nomvula.khumalo@clicks.co.za', '2025-03-10', '2025-03-10 11:40:00+02', TRUE),
('PHAR002', 'phar_linda', crypt('PharmPass2!', gen_salt('bf')), 'Linda Smith', 'P234567', '0789087654', 'linda.smith@dischem.co.za', '2024-11-25', '2024-11-25 14:20:00+02', TRUE),
('PHAR003', 'phar_vusi', crypt('PharmPass3!', gen_salt('bf')), 'Vusi Mthethwa', 'P345678', '0726785432', 'vusi.mthethwa@clicks.co.za', '2023-05-30', '2023-05-30 16:10:00+02', TRUE),
('PHAR004', 'phar_karabo', crypt('PharmPass4!', gen_salt('bf')), 'Karabo Molefe', 'P456789', '0795671234', 'karabo.molefe@dischem.co.za', '2024-09-12', '2024-09-12 09:35:00+02', TRUE),
('PHAR005', 'phar_yusuf', crypt('PharmPass5!', gen_salt('bf')), 'Yusuf Patel', 'P567890', '0718907654', 'yusuf.patel@clicks.co.za', '2023-12-03', '2023-12-03 12:25:00+02', TRUE);

-- Additional data (appointments, prescriptions, audit logs) should follow similar consistency.
INSERT INTO Prescription (pres_code, patient_id, doctor_id, pharmacist_id, medication, dosage, instructions, date_prescribed, date_filled, refills_remaining, status)
VALUES 
('RX1001', 1, 1, 1, 'Amoxicillin', '500mg, 3x/day', 'Take after meals.', '2025-04-01 10:00:00', '2025-04-02 09:00:00', 1, 'Filled'),
('RX1002', 2, 2, 2, 'Ibuprofen', '200mg, 2x/day', 'Take with water.', '2025-04-02 11:00:00', NULL, 2, 'Pending'),
('RX1003', 3, 3, 3, 'Paracetamol', '500mg, every 6h', 'Do not exceed 4g/day.', '2025-04-03 08:30:00', '2025-04-03 14:00:00', 0, 'Filled'),
('RX1004', 4, 4, 4, 'Metformin', '850mg, 2x/day', 'With food to avoid nausea.', '2025-04-04 09:00:00', NULL, 3, 'Pending'),
('RX1005', 5, 5, 5, 'Lisinopril', '10mg, daily', 'Take in the morning.', '2025-04-05 10:15:00', NULL, 1, 'Pending'),
('RX1006', 6, 6, 6, 'Atorvastatin', '20mg, daily', 'Best taken at night.', '2025-04-06 12:00:00', '2025-04-07 08:00:00', 2, 'Filled'),
('RX1007', 7, 7, 7, 'Omeprazole', '40mg, daily', 'Before breakfast.', '2025-04-07 07:30:00', NULL, 1, 'Pending'),
('RX1008', 8, 8, 8, 'Levothyroxine', '75mcg, daily', 'Empty stomach, 30 min before food.', '2025-04-08 09:00:00', '2025-04-09 09:15:00', 0, 'Filled'),
('RX1009', 9, 9, 9, 'Albuterol', '2 puffs, as needed', 'Shake well before use.', '2025-04-09 10:30:00', NULL, 3, 'Pending'),
('RX1010', 10, 10, 10, 'Prednisone', '10mg, daily', 'Taper dosage as per instructions.', '2025-04-10 11:00:00', NULL, 2, 'Cancelled'),

('RX1011', 1, 2, 3, 'Hydrochlorothiazide', '25mg, daily', 'Monitor blood pressure.', '2025-04-11 08:00:00', '2025-04-12 08:00:00', 1, 'Filled'),
('RX1012', 2, 3, 4, 'Simvastatin', '10mg, daily', 'Take in the evening.', '2025-04-12 09:00:00', NULL, 2, 'Pending'),
('RX1013', 3, 4, 5, 'Ciprofloxacin', '500mg, 2x/day', 'Avoid dairy 2 hours before or after.', '2025-04-13 10:30:00', '2025-04-14 08:45:00', 0, 'Filled'),
('RX1014', 4, 5, 6, 'Azithromycin', '500mg day 1, then 250mg', 'Take with food.', '2025-04-14 13:00:00', NULL, 0, 'Pending'),
('RX1015', 5, 6, 7, 'Amlodipine', '5mg, daily', 'With or without food.', '2025-04-15 07:45:00', NULL, 2, 'Pending'),
('RX1016', 6, 7, 8, 'Furosemide', '40mg, daily', 'In the morning to avoid night urination.', '2025-04-16 09:00:00', '2025-04-16 12:00:00', 1, 'Filled'),
('RX1017', 7, 8, 9, 'Sertraline', '50mg, daily', 'Take at the same time daily.', '2025-04-17 10:15:00', NULL, 0, 'Pending'),
('RX1018', 8, 9, 10, 'Clonazepam', '0.5mg, at night', 'Do not operate machinery.', '2025-04-18 11:30:00', NULL, 1, 'Pending'),
('RX1019', 9, 10, 1, 'Warfarin', '2mg, daily', 'Monitor INR regularly.', '2025-04-19 12:00:00', NULL, 0, 'Pending'),
('RX1020', 10, 1, 2, 'Insulin Glargine', '10 units, nightly', 'Inject subcutaneously.', '2025-04-20 08:00:00', '2025-04-20 18:00:00', 1, 'Filled'),

('RX1021', 1, 3, 4, 'Doxycycline', '100mg, 2x/day', 'Avoid sunlight exposure.', '2025-04-21 09:30:00', NULL, 1, 'Pending'),
('RX1022', 2, 4, 5, 'Losartan', '50mg, daily', 'Can be taken with food.', '2025-04-22 10:00:00', NULL, 2, 'Pending'),
('RX1023', 3, 5, 6, 'Gabapentin', '300mg, 3x/day', 'Do not suddenly stop.', '2025-04-23 08:00:00', '2025-04-24 09:00:00', 0, 'Filled'),
('RX1024', 4, 6, 7, 'Cetirizine', '10mg, daily', 'Avoid driving until you know its effects.', '2025-04-24 12:00:00', NULL, 1, 'Pending'),
('RX1025', 5, 7, 8, 'Fluoxetine', '20mg, daily', 'May take 2–4 weeks for effect.', '2025-04-25 09:00:00', '2025-04-26 09:15:00', 0, 'Filled'),
('RX1026', 6, 8, 9, 'Zolpidem', '5mg, nightly', 'Use only when ready to sleep.', '2025-04-26 22:00:00', NULL, 1, 'Pending'),
('RX1027', 7, 9, 10, 'Morphine', '15mg, as needed', 'For severe pain only.', '2025-04-27 14:00:00', NULL, 0, 'Pending'),
('RX1028', 8, 10, 1, 'Ranitidine', '150mg, 2x/day', 'Take before meals.', '2025-04-28 07:00:00', NULL, 2, 'Expired'),
('RX1029', 9, 1, 2, 'Tamsulosin', '0.4mg, daily', 'Take 30 min after meal.', '2025-04-29 08:00:00', '2025-04-29 16:00:00', 1, 'Filled'),
('RX1030', 10, 2, 3, 'Naproxen', '250mg, 2x/day', 'Do not lie down for 30 mins after.', '2025-04-30 10:30:00', NULL, 0, 'Pending');

INSERT INTO medication (name, ingredients, in_stock) VALUES
('Amoxicillin', 'Amoxicillin trihydrate', 150),
('Ibuprofen', 'Ibuprofen', 120),
('Paracetamol', 'Acetaminophen', 180),
('Metformin', 'Metformin hydrochloride', 130),
('Lisinopril', 'Lisinopril dihydrate', 90),
('Atorvastatin', 'Atorvastatin calcium', 100),
('Omeprazole', 'Omeprazole magnesium', 170),
('Levothyroxine', 'Levothyroxine sodium', 200),
('Albuterol', 'Albuterol sulfate', 110),
('Prednisone', 'Prednisone', 95),
('Hydrochlorothiazide', 'Hydrochlorothiazide', 140),
('Simvastatin', 'Simvastatin', 150),
('Ciprofloxacin', 'Ciprofloxacin hydrochloride', 130),
('Azithromycin', 'Azithromycin dihydrate', 85),
('Amlodipine', 'Amlodipine besylate', 160),
('Furosemide', 'Furosemide', 100),
('Sertraline', 'Sertraline hydrochloride', 115),
('Clonazepam', 'Clonazepam', 70),
('Warfarin', 'Warfarin sodium', 95),
('Insulin Glargine', 'Insulin glargine recombinant', 105),
('Doxycycline', 'Doxycycline hyclate', 90),
('Losartan', 'Losartan potassium', 135),
('Gabapentin', 'Gabapentin', 155),
('Cetirizine', 'Cetirizine hydrochloride', 165),
('Fluoxetine', 'Fluoxetine hydrochloride', 125),
('Zolpidem', 'Zolpidem tartrate', 80),
('Morphine', 'Morphine sulfate', 60),
('Ranitidine', 'Ranitidine hydrochloride', 100),
('Tamsulosin', 'Tamsulosin hydrochloride', 145),
('Naproxen', 'Naproxen sodium', 170);
