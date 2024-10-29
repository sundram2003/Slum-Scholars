import React from "react";
import { useNavigate } from "react-router-dom";

type PostProps = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  fullContent: string; 
};

const PostCard: React.FC<PostProps> = ({ id, title, date, description, image, tags, fullContent }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posts/${id}`, { state: { id, title, date, description, image, tags, fullContent } });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={image} alt={`${title} cover`} className="w-full h-48 object-cover" />
      
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="block text-sm text-gray-500 mb-1">{date}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-700 text-sm mt-2">{description}</p>
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
