import React from "react";

const LessonText = ({ lesson }) => (
  <div>
    <h2 className="text-2xl font-bold" data-testid="lesson_title">
      {lesson?.title}
    </h2>
    <p data-testid="lesson_preAmble" className="mt-4 font-semibold leading-relaxed">
      {lesson?.preAmble}
    </p>
    {lesson?.text?.map((text) => (
      <p data-testid="lesson_text" className="mt-4 font-normal" key={text.id}>
        {text.text}
      </p>
    ))}
  </div>
);

export default LessonText;
