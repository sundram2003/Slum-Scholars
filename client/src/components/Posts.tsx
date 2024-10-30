import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/posts/all");
        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center p-6 mt-2">
      <h2 className="  mb-6 text-center mt-12 text-3xl font-bold text-gray-900 sm:text-4xl">Posts</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {currentPosts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>

      <div className="mt-6 flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'} hover:bg-indigo-500`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;
