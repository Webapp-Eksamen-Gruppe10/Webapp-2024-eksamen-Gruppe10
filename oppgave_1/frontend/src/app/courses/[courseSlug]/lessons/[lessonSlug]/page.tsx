// app/courses/[slug]/lessons/[slug]/page.tsx

"use client";

import Lesson from "@/features/lesson/components/Lesson";
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
    // <>
    //   <Lesson />
    // </>
    <div>
      <h1>Kurs: {courseSlug}</h1>
      <h2>Leksjon: {lessonSlug}</h2>
      <p>
        Dette er siden for leksjonen "{lessonSlug}" i kurset "{courseSlug}".
      </p>
      {/* Her kan du legge til leksjonsinnhold */}
    </div>
  );
};

export default LessonPage;
