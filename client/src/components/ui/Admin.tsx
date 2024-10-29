import React, { useState, useEffect } from 'react';
import { getAllVolunteers, updateVolunteerStatus } from '../../services/apis';
import DonorDashboard from './DonorDashboard';
import { createPost, getAllPosts, deletePost } from '../../services/apis';

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

interface Post {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('volunteers');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 10;
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    image: '',
    tags: ''
  });

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'volunteers') {
      fetchVolunteers();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        ...newPost,
        tags: newPost.tags.split(',').map(tag => tag.trim())
      });
      setNewPost({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        image: '',
        tags: ''
      });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllVolunteers();
      
      if (!response.data) throw new Error('No data received from API');
      
      const sortedVolunteers = response.data.data.sort((a: Volunteer, b: Volunteer) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setVolunteers(sortedVolunteers);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (volunteerId: string, newStatus: 'Pending' | 'Checked') => {
    try {
      await updateVolunteerStatus(volunteerId, newStatus);
      setVolunteers(volunteers.map(volunteer => 
        volunteer._id === volunteerId 
          ? { ...volunteer, status: newStatus }
          : volunteer
      ));
    } catch (error) {
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
    } catch {
      return 'Invalid Date';
    }
  };

  const TabButton = ({ tab, current, label }: { tab: string, current: string, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-medium rounded-t-lg ${
        tab === current
          ? 'bg-white text-blue-600 border-t border-x border-gray-200'
          : 'bg-gray-100 text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  const renderPostsTab = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Education, Health, Community"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Post
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg p-4">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
              <p className="mt-2 text-sm text-gray-700">{post.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="mt-4 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Management Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <TabButton tab="volunteers" current={activeTab} label="Volunteers" />
          <TabButton tab="donors" current={activeTab} label="Donors" />
          <TabButton tab="posts" current={activeTab} label="Posts" />
        </div>

        {/* Search and Refresh section only for Volunteers */}
        {activeTab === 'volunteers' && (
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
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'posts' && renderPostsTab()}
      {activeTab === 'donors' && <DonorDashboard />}
      {activeTab === 'volunteers' && (
        loading ? (
          <div className="text-center text-gray-600">Loading volunteers...</div>
        ) : error ? (
          <div className="text-center text-red-600 mb-4">Error: {error}</div>
        ) : volunteers.length === 0 ? (
          <div className="text-center text-gray-600">No volunteers found</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Volunteer table content remains the same */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Money Donated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVolunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.currentAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.aadharNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(volunteer.dateOfBirth)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.qualification}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.chosenActivity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={volunteer.status}
                        onChange={(e) => handleStatusChange(volunteer._id,e.target.value as 'Pending' | 'Checked')}
                        className="block w-32 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Checked">Checked</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{volunteer.moneyDonated}</td>
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
        )
      )}
    </div>
  );
};

export default Admin;