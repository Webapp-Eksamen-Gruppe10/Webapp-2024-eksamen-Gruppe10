import React from "react";

const CourseForm = ({ courseFields, handleCourseFieldChange, categories }) => (
  <div data-testid="course_step" className="max-w-lg">
    <label className="mb-4 flex flex-col" htmlFor="title">
      <span className="mb-1 font-semibold">Tittel*</span>
      <input
        className="rounded"
        data-testid="form_title"
        type="text"
        name="title"
        id="title"
        value={courseFields.title}
        onChange={handleCourseFieldChange}
      />
    </label>
    <label className="mb-4 flex flex-col" htmlFor="slug">
      <span className="mb-1 font-semibold">Slug*</span>
      <input
        className="rounded"
        data-testid="form_slug"
        type="text"
        name="slug"
        id="slug"
        value={courseFields.slug}
        onChange={handleCourseFieldChange}
      />
    </label>
    <label className="mb-4 flex flex-col" htmlFor="description">
      <span className="mb-1 font-semibold">Beskrivelse*</span>
      <input
        className="rounded"
        data-testid="form_description"
        type="text"
        name="description"
        id="description"
        value={courseFields.description}
        onChange={handleCourseFieldChange}
      />
    </label>
    <label className="mb-4 flex flex-col" htmlFor="category">
      <span className="mb-1 font-semibold">Kategori*</span>
      <select
        className="rounded"
        data-testid="form_category"
        name="category"
        id="category"
        value={courseFields.category}
        onChange={handleCourseFieldChange}
      >
        <option disabled value="">
          Velg kategori
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default CourseForm;
