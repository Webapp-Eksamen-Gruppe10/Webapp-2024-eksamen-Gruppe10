import { useState } from "react";
import { useRouter } from "next/router";

export const useSignUpForm = () => {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    admin: false,
  });
  const router = useRouter();

  const formIsValid = Object.values(fields).filter((val) => val?.length === 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (formIsValid.length === 0) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/kurs");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return {
    success,
    formError,
    fields,
    handleChange,
    handleSubmit,
  };
};
