import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, PlusCircle, Loader2, RefreshCwIcon, Search, Filter, Printer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getUserAccounts } from "@/api/patientApi";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  is_active?: boolean;
  phone?: string;
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserAccounts();
        setUsers(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = 
      roleFilter === "all" || 
      user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "active" && user.is_active) ||
      (statusFilter === "inactive" && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const handlePrint = () => {
    if (!tableRef.current) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    // Get the HTML of the table
    const tableHtml = tableRef.current.outerHTML;

    // Create a print-friendly HTML document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>User Accounts Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .status-active { background-color: #d4edda; color: #155724; }
            .status-inactive { background-color: #f8d7da; color: #721c24; }
            .print-header { margin-bottom: 20px; text-align: center; }
            .print-footer { margin-top: 20px; text-align: center; font-size: 0.8em; color: #666; }
            @media print {
              @page { size: landscape; margin: 10mm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>User Accounts Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Total Users: ${filteredUsers.length}</p>
          </div>
          ${tableHtml}
          <div class="print-footer">
            <p>HealthHub EHR System - Confidential</p>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  if (error) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <p className="text-red-500">Error: {error}</p><br/>
        </div>
        <Button variant="outline" onClick={()=> window.location.reload()} className="mt-4 flex-col items-center justify-center">
          <span>Refresh</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Account Management</h1>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print List
          </Button>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span>Filter Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full md:w-auto"
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>
                  Showing {filteredUsers.length} of {users.length} users
                </CardDescription>
              </div>
              {filteredUsers.length === 0 && !loading && (
                <Button variant="ghost" onClick={resetFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" ref={tableRef}>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <tbody>
                    <tr>
                      <td colSpan={5} className="py-8 text-center">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-8 w-8 animate-spin" />
                          <span className="ml-2">Loading user accounts...</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : filteredUsers.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No users found matching your filters
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phone || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}           
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>User Details</span>
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-sm">{selectedUser.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">ID</p>
                <p className="text-sm">{selectedUser.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-sm">{selectedUser.role}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm">{selectedUser.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-sm">{selectedUser.phone || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Account Created</p>
                <p className="text-sm">
                  {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedUser.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.is_active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}