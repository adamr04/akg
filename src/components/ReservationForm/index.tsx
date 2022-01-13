import React, { Component, useState } from "react";
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
    name: "Telefon",
    type: "tel",
    element: "input",
  },
  {
    initial: "",
    name: "bot-field",
    type: "hidden",
    element: "input",
    className: "hidden",
  },
];

export const ReservationForm = () => {
  const [guestList, setGuestList] = useState([
    { guestName: "", student: false, table: false },
  ]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...guestList];
    list[index][name] = value;
    setGuestList(list);
  };
  const handleCheckboxChange = (e, index) => {
    const { name } = e.target;
    const list = [...guestList];
    list[index][name] = !list[index][name];
    setGuestList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...guestList];
    list.splice(index, 1);
    setGuestList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setGuestList([
      ...guestList,
      { guestName: "", student: false, table: false },
    ]);
  };

  const renderSelectedGuests = () => {
    let str = "";

    guestList.forEach((guest) => {
      const studentStr = guest.student ? "(Schüler) " : "";
      const tableStr = guest.table ? "+ Tischplatz" : "";
      str = `${str}${guest.guestName} ${studentStr}${tableStr}\n`;
    });

    return str;
    console.log(str);
  };

  const { formState, fieldsState, submitForm, updateField } =
    useFormSubmission(formConfig);
  if (formState === "SUCCESS") {
    return (
      <div className="feedback">
        <h2>Danke für Ihre Bestellung!</h2>
        <p>Wir werden uns in Kürze mit Ihnen in Verbindung setzen.</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="form">
        {guestList.map((x, i) => {
          return (
            <React.Fragment key={i}>
              <section className="item">
                <label>
                  <span>Karte für</span>
                  <input
                    name="guestName"
                    placeholder="Vorname Nachname"
                    value={x.guestName}
                    type="text"
                    required
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </label>
                {guestList.length !== 1 && (
                  <button
                    className="removeItem"
                    onClick={() => handleRemoveClick(i)}
                  >
                    <span className="sr-only">Person entfernen</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <label className="--inline">
                    <input
                      type="checkbox"
                      name="student"
                      checked={x.student}
                      onChange={(e) => handleCheckboxChange(e, i)}
                      className="border-skin-base-muted border-2 focus:border-skin-primary"
                    />
                    <span>Schüler*in</span>
                  </label>
                  <label className="--inline">
                    <input
                      type="checkbox"
                      name="table"
                      checked={x.table}
                      onChange={(e) => handleCheckboxChange(e, i)}
                      className="border-skin-base-muted border-2 focus:border-skin-primary"
                    />
                    <span>Tisch Sitzplatz</span>
                  </label>
                </div>
              </section>
              {guestList.length - 1 === i && (
                <button
                  key={`add-${i}`}
                  type="button"
                  className="addItem"
                  onClick={handleAddClick}
                >
                  <PlusIcon className="h-6 w-6 -mt-1 mr-3" aria-hidden="true" />
                  <span>Person hinzufügen</span>
                </button>
              )}
            </React.Fragment>
          );
        })}
        <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="guests">
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="guests" />
          <textarea name="Guestlist" required value={renderSelectedGuests()}></textarea>
          <button type="submit">Send</button>
        </form>
        <form
          name="Reservierungen"
          onSubmit={submitForm}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <section className="item">
            <h2>Ihre Kontaktdaten</h2>
            {formConfig.map(
              ({ name, label, placeholder, element, type, className }) => {
                return (
                  <label key={name}>
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
              }
            )}
            <label className="">
              <span>Zusammefassung Ihrer Bestellung:</span>
              <textarea
                name="guests"
                readOnly
                onChange={handleInputChange}
                value={renderSelectedGuests()}
                className=""
              />
            </label>
          </section>
          <input
            type="hidden"
            name="form-name"
            value="Reservierungen"
            className="hidden"
          />
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
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <span>({guestList.length}) Karten bestellen</span>
            )}
          </button>
          {formState === "SUBMITTING" && (
            <div className="feedback">
              <p>Bestellung in Arbeit...</p>
            </div>
          )}
          {formState === "ERROR" && (
            <div className="feedback --error">
              <p>Bitte füllen Sie das Formular vollständig aus.</p>
            </div>
          )}
          <p>
            <strong>Bitte beachten Sie: Eine Bestellung ist verbindlich</strong>
            , d.h. Sie erklären sich bereit, im Falle einer Zuteilung von
            Tickets, diese verbindlich abzunehmen. Sie können jedoch Ihre
            Buchung vor Zuteilung von Tickets jederzeit ohne Kosten stornieren
            lassen. Schicken Sie uns dazu bitte ein E-Mail oder kontaktieren Sie
            uns telefonisch.
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};
