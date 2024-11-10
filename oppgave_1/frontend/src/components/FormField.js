import React from "react";

const FormField = ({ label, type, name, value, onChange, dataTestId }) => (
  <label className="mb-4 flex flex-col" htmlFor={name}>
    <span className="mb-1 font-semibold">{label}</span>
    <input
      className="rounded"
      data-testid={dataTestId}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default FormField;
