import React, { Component, useState } from "react";
import { Link } from "gatsby";
import { XIcon, PlusIcon } from "@heroicons/react/outline";
import "./Form.styles.css";

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
      const studentStr = guest.student ? ", Schüler" : "";
      const tableStr = guest.table ? " + Tischplatz" : "";
      str = `${str}[${guest.guestName}${studentStr}${tableStr}] `;
    });

    return str;
    console.log(str);
  };

  const handleScroll = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <React.Fragment>
      <div className="form" id="top">
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
      </div>
      <form
        method="post"
        action="/success"
        netlify-honeypot="bot-field"
        data-netlify="true"
        name="Bestellungen"
        className="form"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="Bestellungen" />
        <section className="item">
          <h2>Ihre Kontaktdaten</h2>
          <label>
            <span>Ihr Name</span>
            <input
              type="text"
              name="Kontaktperson"
              placeholder="Vorname Nachname"
              required
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="Email"
              placeholder="james@bond.com"
              required
            />
          </label>
          <label>
            <span>Telefon</span>
            <input type="tel" name="Telefon" placeholder="+43 (0) 007" />
          </label>
          <textarea
            name="Guestlist"
            readOnly
            value={renderSelectedGuests()}
            className="hidden"
          />
        </section>
        {guestList[0].guestName && (
          <section className="item --muted">
            <h3>Zusammenfassung Ihrer Bestellung</h3>
            <ol className="list-decimal text-xl font-medium ml-4">
              {guestList.map((guest, index) => (
                <li key={index}>
                  {guest.guestName}
                  {guest.student ? " (Schüler) " : ""}
                  {guest.table ? " + Tischplatz" : ""}
                </li>
              ))}
            </ol>
            <a
              onClick={handleScroll}
              className="font-semibold inline-flex m-auto"
            >
              Ändern
            </a>
          </section>
        )}
        <button type="submit">
          <span>({guestList.length}) Karten bestellen</span>
        </button>
        <p>
          <strong>Bitte beachten Sie: Eine Bestellung ist verbindlich</strong>,
          d.h. Sie erklären sich bereit, im Falle einer Zuteilung von Tickets,
          diese verbindlich abzunehmen. Sie können jedoch Ihre Buchung vor
          Zuteilung von Tickets jederzeit ohne Kosten stornieren lassen.
          Schicken Sie uns dazu bitte ein E-Mail oder kontaktieren Sie uns
          telefonisch.
        </p>
      </form>
    </React.Fragment>
  );
};
