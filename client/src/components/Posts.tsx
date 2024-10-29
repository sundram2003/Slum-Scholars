import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import PostCard from "./PostCard";

const postsData = [
  {
    id: "1",
    title: "Summer Camp Fun",
    date: "2023-06-15",
    description: "A week filled with activities, learning, and fun for all ages.",
    image: "https://via.placeholder.com/300x180",
    tags: ["Camp", "Education"],
    fullContent: "Full content for Summer Camp Fun post..."
  },
  {
    id: "2",
    title: "Clean-up Drive",
    date: "2023-03-12",
    description: "Volunteers gathered to clean the neighborhood and promote eco-friendly practices.",
    image: "https://via.placeholder.com/300x180",
    tags: ["Community", "Environment"],
    fullContent: "Full content for Clean-up Drive post..."
  },
  {
    id: "3",
    title: "Health Awareness Workshop",
    date: "2023-08-20",
    description: "An informative session on health and wellness, with free check-ups for attendees.",
    image: "https://via.placeholder.com/300x180",
    tags: ["Health", "Wellness"],
    fullContent: "Home Page: A welcoming home page showcasing the vision and mission of Slum-Schloars efidsbvewuibfhvweibncewibvfw  eibvciw ebvoweabvc lorem dwhnfcowaenfon"
  }
];

const Posts: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-4xl font-semibold mb-6 text-center">Posts</h2>
      <div className="flex flex-wrap justify-center gap-6">
        { postsData.map((post) => (
          <PostCard key={post.id} {...post} />  
        ))}
      </div>
    </div>
  );
};

export default Posts;
