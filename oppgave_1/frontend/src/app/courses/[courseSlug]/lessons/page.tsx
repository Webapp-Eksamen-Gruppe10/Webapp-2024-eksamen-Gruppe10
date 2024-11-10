// app/courses/[slug]/lessons/page.tsx

//chatGPT dummy-side 
import React from 'react';

// Definerer types for `params`
type LessonsOverviewPageProps = {
  params: {
    courseSlug: string;
  };
};

// Dummy-data for leksjoner i kurset (kan erstattes med en faktisk datakilde)
const dummyLessons = [
  { id: 1, title: 'Introduksjon til JavaScript', slug: 'intro-to-js' },
  { id: 2, title: 'Variabler og datatyper', slug: 'variables-and-data-types' },
  { id: 3, title: 'Funksjoner og kontrollstrukturer', slug: 'functions-and-control-structures' },
];

// Komponent for å vise alle leksjoner i et kurs
const LessonsOverviewPage: React.FC<LessonsOverviewPageProps> = ({ params }) => {
  const { courseSlug } = params;

  return (
    <div>
      <h1>Leksjoner for kurset: {courseSlug}</h1>
      <ul>
        {dummyLessons.map((lesson) => (
          <li key={lesson.id}>
            <a href={`/courses/${courseSlug}/lessons/${lesson.slug}`}>{lesson.title}</a>
          </li>
        ))}
      </ul>
      <p>Dette er en oversikt over alle leksjonene i kurset "{courseSlug}".</p>
    </div>
  );
};

export default LessonsOverviewPage;
