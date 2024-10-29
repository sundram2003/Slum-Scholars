import React, { useState, useEffect } from 'react';
import { getAllPayments } from '../../services/apis';

interface Donor {
  _id?: string;
  name: string;
  email: string;
  contactNo: string;
  amount: number;
  message: string;
  createdAt: string;
}

const DonorDashboard: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    fetchDonors();
  }, [currentPage]);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllPayments();
      if (!response.data) {
        throw new Error('No data received from API');
      }
      const sortedDonors = response.data.sort((a: Donor, b: Donor) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTotalPages(Math.ceil(sortedDonors.length / pageSize));
      setDonors(
        sortedDonors.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      );
    } catch (error) {
      console.error('Error fetching donors:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter(donor =>
    donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search donors..."
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchDonors}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Refresh Data
          </button>
        </div>

        {loading && <div className="text-center text-gray-600">Loading donors...</div>}
        {error && <div className="text-center text-red-600 mb-4">Error: {error}</div>}

        {!loading && !error && filteredDonors.length === 0 && (
          <div className="text-center text-gray-600">No donors found</div>
        )}

        {!loading && !error && filteredDonors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.map((donor, index) => (
                  <tr key={donor._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.contactNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{donor.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(donor.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
