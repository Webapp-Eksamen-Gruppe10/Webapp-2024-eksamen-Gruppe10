import { CommentToDb } from "@/features/comments/lib/schema";
import useCommentsForm from "../hooks/useCommentsForm";

type CommentFormProps = {
  onSubmit: (comment: CommentToDb) => void;
  lessonId: string;
  lessonSlug: { slug: string };
};

export default function CommentForm(props: Readonly<CommentFormProps>) {
  const { onSubmit, lessonSlug } = props;

  const {
    handleSubmit,
    getFieldInputProps,
    getFieldAreaProps,
    isFieldInvalid,
    success,
  } = useCommentsForm({
    initialFields: { createdBy: "", comment: "" },
    onSubmit: (data) =>
      onSubmit({
        createdBy: { name: data.createdBy },
        comment: data.comment,
        lesson: lessonSlug,
      }),
    validate: {
      createdBy: (_, value) => value.length > 1,
      comment: (_, value) => value.length > 1,
    },
  });

  return (
    <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
      <label className="mb-4 flex flex-col" htmlFor="name">
        <span className="mb-1 text-sm font-semibold">Navn*</span>
        <input
          data-testid="form_name"
          type="text"
          name="name"
          id="name"
          className="w-full rounded bg-slate-100"
          required
          placeholder="Legg til navn"
          {...getFieldInputProps("createdBy")}
        />
      </label>
      <label className="mb-4 flex flex-col" htmlFor="comment">
        <span className="mb-1 text-sm font-semibold">Legg til kommentar*</span>
        <textarea
          data-testid="form_textarea"
          name="comment"
          // id="name" er den gamle
          id="comment"
          className="w-full rounded bg-slate-100"
          required
          placeholder="Legg til kommentar"
          {...getFieldAreaProps("comment")}
          cols={30}
        />
      </label>
      <button
        className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
        data-testid="form_submit"
        type="submit"
      >
        Legg til kommentar
      </button>
      {isFieldInvalid("createdBy") || isFieldInvalid("comment") ? (
        <p className="font-semibold text-red-500" data-testid="form_error">
          Fyll ut alle felter med *
        </p>
      ) : null}
      {success ? (
        <p
          className="font-semibold text-emerald-500"
          data-testid="form_success"
        >
          Skjema sendt
        </p>
      ) : null}
    </form>
  );
}
