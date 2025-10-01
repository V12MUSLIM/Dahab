"use client";
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import React from 'react';

import { Button } from '@/components/ui/button';
import GallerySection from "./GallerySection";
export const experiencesData = [
  {
    id: 1,  
    title: "Scuba Diving Adventure",
    description:
        "Explore the vibrant underwater world of Dahab with our guided scuba diving tours. Suitable for all skill levels, from beginners to advanced divers.",
    imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/d8/3f/1c/blue-hole.jpg?w=1400&h=-1&s=1",
    href: "/experiences/scuba-diving-adventure",
    IdPage: "scuba-diving-adventure",
    subtitle: "Dive into the Blue",
    badge: "Popular",
    rating: "4.9",
    location: "Dahab Coast",
    price: "$120",
    features: [ 
        "Guided dives with certified instructors",
        "All equipment provided",
        "Explore coral reefs and marine life",
        "Suitable for all skill levels",
        "Small group sizes for personalized experience",
    ],
  }];

export default function ExperiencesDetail() {
  const { IdPage } = useParams();
  const experience = experiencesData.find(exp => exp.IdPage === IdPage);

  if (!experience) {
    return <div>Experience not found</div>;
  }

  return (
    <div>
      <h1>{experience.title}</h1>
      <img src={experience.imageUrl} alt={experience.title} />
      <p>{experience.description}</p>
      <Link to={experience.href}>
        <Button>Book Now</Button>
      </Link>
    </div>
  );
}
