import * as React from "react"
import { useFormSubmission } from "@/utils/fns"
import { FormField } from "@/definitions"

import "./Form.styles.css";

const formConfig: FormField[] = [
  { initial: "", label: "Ihr Name", name: "Name", type: "text", element: "input" },
  { initial: "", label: "Ihre Email Adresse", name: "Email", type: "email", element: "input" },
  { initial: "", label: "Nachricht", name: "Message", type: "text", element: "textarea" },
  // { initial: '', name: 'File', type: 'file', element: 'input' },
  {
    initial: "",
    name: "bot-field",
    type: "hidden",
    element: "input",
    className: "hidden"
  }
]

export const ReservationForm = () => {
  const { formState, fieldsState, submitForm, updateField } = useFormSubmission(
    formConfig
  )
  if (formState === "SUCCESS") {
    return <div>Danke! Wir werden uns in Kürze bei Ihnen melden.</div>
  }
  return (
    <form
      className="form"
      name="reservation"
      onSubmit={submitForm}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      {formConfig.map(({ name, label, element, type, className }) => {
        return (
          <label>
          <span>{label}</span>
            {
            React.createElement(element, {
              key: name,
              type,
              name,
              label: name,
              value: fieldsState[name],
              onChange: updateField,
              placeholder: name,
              className
            })
            }
          </label>
        )}
      )}
      <input type="hidden" name="form-name" value="reservation" />
      <button type="submit">Jetzt bestellen</button>
      {formState === "ERROR" && <div className="feedback"><p>Bitte füllen Sie das Formular vollständig aus.</p></div>}
      <p><strong>Bitte beachten Sie: Eine Bestellung ist verbindlich</strong>, d.h. Sie erklären sich bereit, im Falle einer Zuteilung von Tickets, diese verbindlich abzunehmen. Sie können jedoch Ihre Buchung vor Zuteilung von Tickets jederzeit ohne Kosten stornieren lassen. Schicken Sie uns dazu bitte ein E-Mail oder kontaktieren Sie uns telefonisch.</p>
      {formState === "SUBMITTING" && <div>Sending...</div>}
    </form>
  )
}
