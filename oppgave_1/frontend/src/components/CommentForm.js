import React from "react";

const CommentForm = ({
  name,
  comment,
  handleNameChange,
  handleCommentChange,
  handleSubmit,
  formError,
  success,
}) => (
  <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
    <label className="mb-4 flex flex-col" htmlFor="name">
      <span className="mb-1 text-sm font-semibold">Navn*</span>
      <input
        data-testid="form_name"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleNameChange}
        className="w-full rounded bg-slate-100"
      />
    </label>
    <label className="mb-4 flex flex-col" htmlFor="comment">
      <span className="mb-1 text-sm font-semibold">Legg til kommentar*</span>
      <textarea
        data-testid="form_textarea"
        name="comment"
        id="comment"
        value={comment}
        onChange={handleCommentChange}
        className="w-full rounded bg-slate-100"
        cols="30"
      />
    </label>
    <button
      className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
      data-testid="form_submit"
      type="submit"
    >
      Legg til kommentar
    </button>
    {formError && <p className="font-semibold text-red-500" data-testid="form_error">Fyll ut alle felter med *</p>}
    {success && <p className="font-semibold text-emerald-500" data-testid="form_success">Skjema sendt</p>}
  </form>
);

export default CommentForm;
