import React from "react";

const CoursesFilter = ({ value, handleFilter, categories }) => (
  <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
    <span className="sr-only mb-1 block">Velg kategori:</span>
    <select
      id="filter"
      name="filter"
      data-testid="filter"
      value={value}
      onChange={handleFilter}
      className="min-w-[200px] rounded bg-slate-200"
    >
      <option value="">Alle</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </label>
);

export default CoursesFilter;
