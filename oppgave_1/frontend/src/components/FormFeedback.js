import React from "react";

const FormFeedback = ({ success, formError }) => (
  <>
    {formError && (
      <p className="font-semibold text-red-500" data-testid="form_error">
        Fyll ut alle felter med *
      </p>
    )}
    {success && (
      <p className="font-semibold text-emerald-500" data-testid="form_success">
        Skjema sendt
      </p>
    )}
  </>
);

export default FormFeedback;
