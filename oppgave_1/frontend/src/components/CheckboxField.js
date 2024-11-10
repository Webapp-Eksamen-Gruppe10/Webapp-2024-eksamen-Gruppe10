import React from "react";

const CheckboxField = ({ label, name, checked, onChange, dataTestId }) => (
  <label className="flex items-center gap-2" htmlFor={name}>
    <input
      className="rounded"
      data-testid={dataTestId}
      type="checkbox"
      name={name}
      id={name}
      onChange={onChange}
      checked={checked}
    />
    <span className="font-semibold">{label}</span>
  </label>
);

export default CheckboxField;
