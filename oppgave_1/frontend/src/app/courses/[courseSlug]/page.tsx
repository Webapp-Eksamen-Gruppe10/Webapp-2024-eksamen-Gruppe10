// app/courses/[slug]/page.tsx


//chatGPT dummy-side 
import React from 'react';

// Definerer types for `params`
type CoursePageProps = {
  params: {
    courseSlug: string;
  };
};

// Komponent for et spesifikt kurs
const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  const { courseSlug } = params;

  return (
    <div>
      <h1>Kurs: {courseSlug}</h1>
      <p>Dette er siden for kurset med slug "{courseSlug}".</p>
      {/* Her kan du legge til innhold relatert til det spesifikke kurset */}
    </div>
  );
};

export default CoursePage;
