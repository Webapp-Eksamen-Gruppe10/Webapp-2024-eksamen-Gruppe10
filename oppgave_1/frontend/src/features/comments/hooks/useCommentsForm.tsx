import { useState, type FormEvent } from "react";

//Denne hook-en kan potensielt være globalt, da den kan også fungere på flere features. Dette skal vurderes
type FieldState = {
  value: string;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
};

type UseFormProps<T> = {
  initialFields: T;
  onSubmit: (data: T) => void;
  validate: {
    [K in keyof T]?: (field: K, value: string) => boolean;
  };
};

export function useCommentsForm<T extends Record<string, string>>({
  initialFields,
  onSubmit,
  validate,
}: UseFormProps<T>) {
  const [fields, setFields] = useState<Record<keyof T, FieldState>>(
    Object.fromEntries(
      Object.keys(initialFields)
        .map((key) => [
          key as keyof T,
          {
            value: initialFields[key as keyof T],
            isValid: false,
            isDirty: false,
            isTouched: false,
          } as FieldState,
        ])
    ) as Record<keyof T, FieldState>
  );

  const updateField = (field: keyof T, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        isDirty: true,
        isValid: validate[field] ? validate[field](field, value) : true, // validerer feltet
      },
    }));
  };

  const setFieldTouched = (field: keyof T) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], isTouched: true },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = Object.values(fields).every((field) => field.isValid);

    if (!isFormValid) return;

    const formData = Object.fromEntries(
      Object.keys(fields).map((key) => [key, fields[key as keyof T].value])
    ) as T;

    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFields(
      Object.fromEntries(
        Object.keys(initialFields).map((key) => [
          key,
          {
            value: "",
            isValid: false,
            isDirty: false,
            isTouched: false,
          },
        ])
      ) as Record<keyof T, FieldState>
    );
  };

  const getFieldProps = (field: keyof T) => ({
    value: fields[field].value,
    onChange: (event: FormEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      updateField(field, input.value);
    },
    onBlur: () => setFieldTouched(field),
  });

  const isFieldInvalid = (field: keyof T) =>
    !fields[field].isValid && fields[field].isDirty;

  return {
    fields,
    handleSubmit,
    getFieldProps,
    isFieldInvalid,
  };
}

export default useCommentsForm;