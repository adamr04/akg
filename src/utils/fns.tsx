/* Form */
import { FormDataState, FormField, FormSubmitState } from "./types";
import { useState, ChangeEvent, SyntheticEvent } from "react";

const encode = (data: FormDataState) => {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
};

export const useFormSubmission = (fields: FormField[]) => {
  const [fieldsState, setFieldsState] = useState<FormDataState>(
    fields
      .map((s) => ({ [s.name]: s.initial }))
      .reduce((acc, item) => {
        return {
          ...acc,
          ...item,
        };
      }, {})
  );

  const [formState, setFormState] = useState<FormSubmitState>("INITIAL");

  const updateField = (
    e: SyntheticEvent<HTMLInputElement, ChangeEvent<HTMLInputElement>>
  ) => {
    const { target } = e.nativeEvent;

    if (!target) {
      return;
    }

    setFieldsState((s) => ({ ...s, [target.name]: target.value }));
  };

  const submitForm = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("SUBMITTING");

    const { name } = e.target;

    fetch("/", {
      method: "POST",
      body: encode({ "form-name": name, ...fieldsState }),
    })
      .then((resp) => {
        setFormState(resp.status === 200 ? "SUCCESS" : "ERROR");
      })
      .catch(() => {
        setFormState("ERROR");
      });
  };

  return {
    submitForm,
    updateField,
    formState,
    fieldsState,
  };
};

/* Theme */
export const themeStorageKey = "theme";

export const getTheme = (): string => {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem(themeStorageKey) || "dark";
};

export const setLightMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, "light");
    document.documentElement.classList.remove("dark");
  } catch (err) {
    console.error(err);
  }
};

export const setDarkMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, "dark");
    document.documentElement.classList.add("dark");
  } catch (err) {
    console.error(err);
  }
};
