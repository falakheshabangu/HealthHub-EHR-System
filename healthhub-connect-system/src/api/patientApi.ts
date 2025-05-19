
import axios from 'axios';

// Configure axios with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'admin' | 'patient' | 'doctor' | 'pharmacist';
}

export interface LoginResponse {
  access_token: string;
  role: 'admin' | 'patient' | 'doctor' | 'pharmacist';
}

export interface Appointment {
  type: string;
  start_time: string; // ISO8601 timestamp
  end_time: string; // ISO8601 timestamp
  status: string;
  doctor_name: string;
}

export interface AppointmentRequest {
  type: string;
  start_time: string; // ISO8601 timestamp
  end_time: string; // ISO8601 timestamp
  doctor_name: string;
}

export interface AppointmentResponse {
  status: string;
}

export interface Prescription {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  refillDate: string;
}

export interface PatientRecord {
  id: number;
  type: string;
  date: string;
  doctor: string;
  details: string;
}

// Login API endpoint
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', credentials);
    
    // Store the token in localStorage
    localStorage.setItem('access_token', response.data.access_token);
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid credentials');
    }
    throw new Error('Login failed');
  }
};

// Get appointments API endpoint
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get<Appointment[]>('/get_appointments');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    throw new Error('Failed to fetch appointments');
  }
};

// Create appointment API endpoint
export const createAppointment = async (appointmentData: AppointmentRequest): Promise<AppointmentResponse> => {
  try {
    const response = await api.post<AppointmentResponse>('/create_appointment', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Failed to create appointment:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data.error || 'Invalid appointment data.');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    throw new Error('Failed to create appointment');
  }
};

// Get prescriptions API endpoint
export const getPrescriptions = async (): Promise<Prescription[]> => {
  try {
    const response = await api.get<Prescription[]>('/get_prescription');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    throw new Error('Failed to fetch prescriptions');
  }
};

// Get patient record API endpoint
export const getPatientRecord = async (): Promise<PatientRecord[]> => {
  try {
    const response = await api.get<PatientRecord[]>('/get_patient_record');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch patient record:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    throw new Error('Failed to fetch patient record');
  }
};
