import { useState } from "react";
import { createComment, getComments } from "../lib/services/dataService";

export const useCommentForm = (lessonSlug, setComments) => {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const courseSlug = "javascript-101";
  const lessonSlug = "variabler";


  const handleCommentChange = (event) => setComment(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (!comment || !name) {
      setFormError(true);
    } else {
      await createComment({
        id: `${Math.floor(Math.random() * 1000 + 1)}`,
        createdBy: { id: Math.floor(Math.random() * 1000 + 1), name },
        comment,
        lesson: { slug: lessonSlug },
      });
      const updatedComments = await getComments(lessonSlug);
      setComments(updatedComments);
      setSuccess(true);
    }
  };

  return {
    success,
    formError,
    comment,
    name,
    handleCommentChange,
    handleNameChange,
    handleSubmit,
  };
};
