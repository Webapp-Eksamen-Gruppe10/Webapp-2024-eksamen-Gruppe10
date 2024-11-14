// app/courses/[slug]/lessons/[slug]/page.tsx

"use client";

//chatGPT dummy-side
import React from "react";

// Definerer types for `params`
type LessonPageProps = {
  params: {
    courseSlug: string;
    lessonSlug: string;
  };
};

// Komponent for en spesifikk leksjon i et kurs
const LessonPage: React.FC<LessonPageProps> = ({ params }) => {
  const { courseSlug, lessonSlug } = params;

  return (
    <>
      <h1>Kurs: {courseSlug}</h1>
      <h2>Leksjon: {lessonSlug}</h2>
      <p>
        Dette er siden for leksjonen "{lessonSlug}" i kurset "{courseSlug}".
      </p>
      {/* Her kan du legge til leksjonsinnhold */}
    </>
  );
};

export default LessonPage;
