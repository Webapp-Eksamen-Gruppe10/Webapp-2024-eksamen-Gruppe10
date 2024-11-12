"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//chatGPT for feilsøking av navigering
export function useSignUp() { // Named export
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  const formIsValid = Object.values(fields).filter((val) => val?.length === 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (formIsValid.length === 0) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/courses");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return { fields, success, formError, handleSubmit, handleChange };
}
