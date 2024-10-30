import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'; 

const PostDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const post = location.state; 

  if (!post) return <p>No post data found.</p>; 

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mx-auto my-8 p-6 w-2/3 flex flex-col mt-20">
        <img src={post.image} alt={`${post.title} cover`} className="w-full h-64 object-cover rounded-lg" />
        
        <div className="mt-4 flex-grow">
          <span className="block text-sm text-gray-500 mb-1">{post.date}</span>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{post.description}</p>
          <div className="text-green-600 text-xs mt-3 space-x-2">
            {post.tags.map((tag: string) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-start w-2/3 mx-auto mb-4">
        <button 
          className="bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors flex items-center" 
          onClick={handleBack}
        >
          <FaArrowLeft className="mr-2" /> 
          Back to Posts
        </button>
      </div>
    </>
  );
};

export default PostDetail;
