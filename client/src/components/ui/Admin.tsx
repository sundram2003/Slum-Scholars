import React, { useState, useEffect } from 'react';
import { getAllVolunteers, updateVolunteerStatus } from '../../services/apis';

interface Volunteer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  currentAddress: string;
  aadharNumber: string;
  dateOfBirth: string;
  qualification: string;
  chosenActivity: string;
  status: 'Pending' | 'Checked';
  moneyDonated: number;
  createdAt: string;
}

const Admin = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 10;

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching volunteers...');
      const response = await getAllVolunteers();
      console.log('API Response:', response);
      console.log('Data:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from API');
      }
      if(response.data.length === 0)  setVolunteers(response.data.data);
      else {
      const sortedVolunteers = response.data.data.sort((a: Volunteer, b: Volunteer) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      console.log('Processed volunteers:', sortedVolunteers);
      setVolunteers(sortedVolunteers);
    }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (volunteerId: string, newStatus: 'Pending' | 'Checked') => {
    try {
      console.log('Updating status for volunteer:', volunteerId, 'to', newStatus);
      await updateVolunteerStatus(volunteerId, newStatus);
      setVolunteers(volunteers.map(volunteer => 
        volunteer._id === volunteerId 
          ? { ...volunteer, status: newStatus }
          : volunteer
      ));
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      alert('Failed to update volunteer status');
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.phoneNumber.includes(searchTerm)
  );

  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = filteredVolunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Volunteer Management Dashboard</h1>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search volunteers..."
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={fetchVolunteers}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-600">Loading volunteers...</div>
      )}

      {error && (
        <div className="text-center text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {!loading && !error && volunteers.length === 0 && (
        <div className="text-center text-gray-600">
          No volunteers found
        </div>
      )}

      {!loading && !error && volunteers.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aadhar Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Money Donated
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVolunteers.map((volunteer) => (
                <tr key={volunteer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.currentAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.aadharNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(volunteer.dateOfBirth)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.qualification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.chosenActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={volunteer.status}
                      onChange={(e) => handleStatusChange(volunteer._id, e.target.value as 'Pending' | 'Checked')}
                      className="block w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Checked">Checked</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.moneyDonated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstVolunteer + 1} to {Math.min(indexOfLastVolunteer, filteredVolunteers.length)} of {filteredVolunteers.length} volunteers
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastVolunteer >= filteredVolunteers.length}
                className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;