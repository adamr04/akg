import React, { useState } from "react";
import { useFormSubmission } from "@/utils/fns";
import { FormField } from "@/definitions";
import { XIcon, PlusIcon } from "@heroicons/react/outline";

import "./Form.styles.css";

const formConfig: FormField[] = [
  {
    initial: "",
    label: "Ihr Name",
    name: "Name",
    placeholder: "James Bond",
    type: "text",
    element: "input",
  },
  {
    initial: "",
    label: "Email Adresse",
    placeholder: "james@007.com",
    name: "Email",
    type: "email",
    element: "input",
  },
  {
    initial: "+43 ",
    label: "Telefon",
    placeholder: "+43 007",
    name: "+43 007",
    type: "tel",
    element: "input",
  },
  {
    initial: "",
    label: "Nachricht",
    placeholder: "Falls Sie Fragen haben...",
    name: "Message",
    type: "text",
    element: "textarea",
  },
  // { initial: '', name: 'File', type: 'file', element: 'input' },
  {
    initial: "",
    name: "bot-field",
    type: "hidden",
    element: "input",
    className: "hidden",
  },
];

export const ReservationForm = () => {
  const { formState, fieldsState, submitForm, updateField } =
    useFormSubmission(formConfig);

  const [checked, setChecked] = React.useState(true);
  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  console.log(fields)

  if (formState === "SUCCESS") {
    return (
      <div className="feedback">
        <p>Danke! Wir werden uns in Kürze bei Ihnen melden.</p>
      </div>
    );
  }
  return (
    <form
      className="form"
      name="reservation"
      onSubmit={submitForm}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <div><h2>Ihre Kontaktdaten</h2></div>
      <section className="item">
        {formConfig.map(({ name, label, placeholder, element, type, className }) => {
          return (
            <label>
              <span>{label}</span>
              {React.createElement(element, {
                key: name,
                type,
                name,
                label: name,
                value: fieldsState[name],
                onChange: updateField,
                placeholder: placeholder,
                className,
              })}
            </label>
          );
        })}
      </section>
      <div><h2>Personalisierte Karten</h2></div>
      {fields.map((field, idx) => {
        return (
          <section className="item" key={`${field}-${idx}`}>
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Vorname Nachname"
                onChange={e => handleChange(idx, e)}
              />
            </label>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <label className="--inline">
                <input defaultChecked={checked} type="radio" name={`type-${idx}`} className="border-skin-base-muted border-2 focus:border-skin-primary" />
                <span>Schüler*in</span>
              </label>
              <label className="--inline">
                <input type="radio" name={`type-${idx}`} className="border-skin-base-muted border-2 focus:border-skin-primary" />
                <span>Regulärer Gast</span>
              </label>
              <label className="--inline">
                <input type="checkbox" name={`table-${idx}`} className="border-skin-base-muted border-2 focus:border-skin-primary" />
                <span>Tisch Sitzplatz</span>
              </label>
            </div>
            <button type="button" className="removeItem" onClick={() => handleRemove(idx)}>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </section>
        );
      })}
      <button type="button" onClick={() => handleAdd()}>
        <PlusIcon className="h-6 w-6 -mt-1 mr-3" aria-hidden="true" />
        <span>Person</span>
      </button>
      <input type="hidden" name="form-name" value="reservation" />
      <button type="submit">
        {formState === "SUBMITTING" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <span>Karten ({fields.length}) bestellen</span>
        )}
      </button>
      {formState === "SUBMITTING" && (
        <div className="feedback">
          <p>Bestellung in Arbeit...</p>
        </div>
      )}
      {formState === "ERROR" && (
        <div className="feedback feedback--error">
          <p>Bitte füllen Sie das Formular vollständig aus.</p>
        </div>
      )}
      <p>
        <strong>Bitte beachten Sie: Eine Bestellung ist verbindlich</strong>,
        d.h. Sie erklären sich bereit, im Falle einer Zuteilung von Tickets,
        diese verbindlich abzunehmen. Sie können jedoch Ihre Buchung vor
        Zuteilung von Tickets jederzeit ohne Kosten stornieren lassen. Schicken
        Sie uns dazu bitte ein E-Mail oder kontaktieren Sie uns telefonisch.
      </p>
    </form>
  );
};
