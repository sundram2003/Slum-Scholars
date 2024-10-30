import React from "react";
import { useNavigate } from "react-router-dom";

type PostProps = {
  _id: string;  // MongoDB uses `_id` instead of `id`
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
};

const PostCard: React.FC<PostProps> = ({ _id, title, date, description, image, tags }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posts/${_id}`, { state: { _id, title, date, description, image, tags } });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={image} alt={`${title} cover`} className="w-full h-48 object-cover" />
      
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="block text-sm text-gray-500 mb-1">{new Date(date).toLocaleDateString()}</span>
          <h3 className="text-lg font-semibold truncate">{title}</h3> {/* Added truncate class */}
          <p className="text-gray-700 text-sm mt-2 line-clamp-3">{description}</p> {/* Added line-clamp class */}
        </div>
        
        <div>
          <div className="text-green-600 text-xs mt-3 space-x-2">
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <button 
            className="mt-4 w-full bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors" 
            onClick={handleReadMore}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
