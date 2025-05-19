import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, PlusSquare, FileText, Loader2, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAppointments, Appointment, getPatientRecords, Prescription, getPrescriptions, PatientRecord } from "@/api/patientApi";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useRole } from "@/contexts/RoleContext";

export function PatientDashboard() {
  const user = useUser();
  const {role, setRole} = useRole()
  const patientName = `${user.name} ${user.surname}`; 
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [prescriptionsData, setPrescriptionsData] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState({
    appointments: true,
    records: true,
    prescriptions: true
  });
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, appointments: true }));
        const appointmentsData = await getAppointments();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        if(error.response?.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in again",
            variant: "destructive",
          });
          localStorage.clear();
          setRole(undefined)
        }
        toast({
          title: "Error",
          description: "Failed to load your appointments",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, appointments: false }));
      }

      try {
        setLoading(prev => ({ ...prev, records: true }));
        const recordsData = await getPatientRecords("patient");
        setRecords(recordsData);
      } catch (error) {
        console.error("Failed to fetch your records:", error);
        toast({
          title: "Error",
          description: "Failed to load your records",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, records: false }));
      }

      try {
        setLoading(prev => ({ ...prev, prescriptions: true }));
        const prescriptionsData = await getPrescriptions();
        const transformedData = prescriptionsData.map((item) => ({
          id: item.id,
          medication: item.medication,
          dosage: item.dosage,
          doctor: item.doctor || "Unknown",
          pharmacist: item.pharmacist || "Unknown",
          prescription_date: item.prescription_date || "N/A",
          status: item.status || "Unknown",
          instruction: item.instruction || "N/A",
          date_filled: item.date_filled || "N/A",
          refills_remaining: item.refills_remaining || 0,
          date_prescribed: item.date_prescribed || "N/A",
          code: item.code || "N/A",
          patient: item.patient || "Unknown",
        }));
        setPrescriptionsData(transformedData);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
        toast({
          title: "Error",
          description: "Failed to load prescriptions",
          variant: "destructive",
        });
      } finally {
        setLoading(prev => ({ ...prev, prescriptions: false }));
      }
    };

    fetchData();
  }, [toast]);

  // Generate appointment data for the chart
  const appointmentChartData = useMemo(() => {
    if (loading.appointments) return [];
    
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(format(date, 'MMM'));
    }

    const monthCounts: Record<string, { month: string; appointments: number }> = {};
    months.forEach(month => {
      monthCounts[month] = { month, appointments: 0 };
    });

    appointments
      .filter(app => app.status === 'Completed')
      .forEach(app => {
        const month = format(new Date(app.start_time), 'MMM');
        if (monthCounts[month]) {
          monthCounts[month].appointments++;
        }
      });

    return months.map(month => monthCounts[month]);
  }, [appointments, loading.appointments]);

  // Format appointments for display
  const formatAppointmentsForDisplay = () => {
    return appointments
      .filter(app => app.status === 'Scheduled')
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
      .map((appointment) => {
        const date = new Date(appointment.start_time);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === date.toDateString();
        
        return {
          id: appointment.appointment_id,
          doctorName: appointment.doctor_name,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: date.toLocaleDateString([], { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          dateObj: date,
          type: appointment.type,
          status: appointment.status,
          isToday,
          isTomorrow,
          relativeDate: isToday 
            ? 'Today' 
            : isTomorrow 
              ? 'Tomorrow' 
              : format(date, 'MMM d, yyyy')
        };
      });
  };

  const upcomingAppointments = formatAppointmentsForDisplay();
  const isLoading = loading.appointments || loading.records || loading.prescriptions;

  const openRecordDetails = (record: PatientRecord) => {
    setSelectedRecord(record);
  };

  const closeRecordDetails = () => {
    setSelectedRecord(null);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-80 rounded-lg" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Medical Record Details</h2>
              <button 
                onClick={closeRecordDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-500">Record Type</h3>
                  <p>{selectedRecord.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Date</h3>
                  <p>{selectedRecord.date}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Doctor</h3>
                  <p>{selectedRecord.doctor}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-500">Description</h3>
                  <p>{selectedRecord.description || "No description provided"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Details</h3>
                  <p>{selectedRecord.details || "No additional details"}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-500 mb-2">Treatment Information</h3>
              {selectedRecord.treatment[0].length > 0 ? (
                <div className="space-y-4">
                  {selectedRecord.treatment[0].map((treatment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Diagnosis</h4>
                          <p>{treatment.diagnosis || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Treatment Date</h4>
                          <p>{treatment.date || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Description</h4>
                          <p>{treatment.description || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Follow-up Date</h4>
                          <p>{treatment.follow_up_date || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No treatment information available</p>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={closeRecordDetails}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {patientName}</h1>
            <p className="text-muted-foreground">Here's a summary of your health information</p>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/patient/appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Link>
            </Button>
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-lg mb-2">Health Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Checkup</p>
              <p className="font-medium">
                {records.length > 0 
                  ? new Date(records[0].date).toLocaleDateString() 
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Meds</p>
              <p className="font-medium">
                {prescriptionsData.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Next Appointment</p>
              <p className="font-medium">
                {upcomingAppointments.length > 0
                  ? `${upcomingAppointments[0].relativeDate} at ${upcomingAppointments[0].time}`
                  : 'None scheduled'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recent Records</p>
              <p className="font-medium">
                {records.length > 0 
                  ? records.length + ' in last year' 
                  : 'No records'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading.appointments ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {upcomingAppointments.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {upcomingAppointments.length > 0 ? (
                      <>
                        Next: <span className="font-medium">{upcomingAppointments[0].relativeDate}</span> at{' '}
                        <span className="font-medium">{upcomingAppointments[0].time}</span>
                      </>
                    ) : (
                      "No upcoming appointments"
                    )}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Medications
              </CardTitle>
              <PlusSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading.prescriptions ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{prescriptionsData.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {prescriptionsData.length > 0 
                      ? prescriptionsData.some(p => p.refills_remaining > 0) 
                        ? "Some medications have refills remaining"
                        : "No refills remaining"
                      : "No active medications"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medical Records
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading.records ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{records.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {records.length === 1 ? "1 record" : `${records.length} records`}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Appointment Trends Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>
                  Your completed appointments over the last 6 months
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/patient/appointments">View All</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loading.appointments ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : appointmentChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={appointmentChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ccc' }}
                  />
                  <YAxis 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ccc' }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    name="Appointments"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <Calendar className="h-8 w-8 text-gray-400" />
                <p className="text-gray-500">No appointment data available</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/patient/appointments">Schedule Appointment</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/patient/appointments">
                    <PlusSquare className="mr-2 h-4 w-4" />
                    Schedule New
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading.appointments ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 rounded-md border p-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="group relative rounded-lg border p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 min-w-[80px]">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                            {appointment.isToday ? 'TODAY' : appointment.isTomorrow ? 'TOMORROW' : format(appointment.dateObj, 'EEE').toUpperCase()}
                          </span>
                          <span className="text-2xl font-bold">
                            {format(appointment.dateObj, 'd')}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(appointment.dateObj, 'MMM')}
                          </span>
                        </div>
                        
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{appointment.doctorName}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              appointment.status === 'Scheduled' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1.5 h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <span>{appointment.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              asChild
                            >
                              <Link to={`/appointments/${appointment.id}`}>
                                Details
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <Calendar className="h-12 w-12 text-gray-400" />
                  <div className="text-center">
                    <h3 className="text-lg font-medium">No upcoming appointments</h3>
                    <p className="text-sm text-muted-foreground">
                      You don't have any scheduled appointments yet.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/patient/appointments">
                      Schedule Appointment
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.prescriptions ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-md border p-3">
                      <Skeleton className="h-4 w-[150px] mb-2" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  ))}
                </div>
              ) : prescriptionsData.length > 0 ? (
                <div className="space-y-4">
                  {prescriptionsData.map((medication) => (
                    <div
                      key={medication.id}
                      className="rounded-md border p-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{medication.code}</p>
                          <p className="text-sm font-medium">{medication.dosage}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {medication.medication}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Refill by: {medication.date_filled}
                          </span>
                          <span className={`px-2 py-1 rounded-full ${
                            medication.refills_remaining > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {medication.refills_remaining} refills
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4">No current medications</p>
              )}
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link to="/patient/prescriptions">View All Medications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Medical Records */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            {loading.records ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border p-3">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <Skeleton className="h-8 w-[60px]" />
                  </div>
                ))}
              </div>
            ) : records.length > 0 ? (
              <div className="space-y-4">
                {records.slice(0, 3).map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{record.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.date} • {record.doctor}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openRecordDetails(record)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4">No medical records found</p>
            )}
            <div className="flex justify-center mt-4">
              <Button variant="outline" asChild>
                <Link to="/patient/medical-records">View All Records</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}