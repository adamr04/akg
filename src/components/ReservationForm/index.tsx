import React, { Component, useState } from 'react'
import { NetlifyForm, Honeypot } from 'react-netlify-forms'
import { XIcon, PlusIcon } from "@heroicons/react/outline";
import "./Form.styles.css";

export const ReservationForm = () => {
  const [guestList, setGuestList] = useState<Array>([{ guestName: "", selectedType:"Schüler", table:"" }]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...guestList];
    list[index][name] = value;
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
    setGuestList([...guestList, { guestName: "", selectedType:"" }]);
  };

  const [selectedType, setSelectedType] = useState<String>();
  const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
  };

  console.log(guestList);

  return (
    <>
    <div className="form">
    {guestList.map(
      ( x, i ) => {
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
                    type="radio"
                    name="selectedType"
                    value="Schüler"
                    onChange={(e) => handleInputChange(e, i)}
                    defaultChecked
                    className="border-skin-base-muted border-2 focus:border-skin-primary"
                  />
                  <span>Schüler*in</span>
                </label>
                <label className="--inline">
                  <input
                    type="radio"
                    name="selectedType"
                    value="Regulär"
                    onChange={(e) => handleInputChange(e, i)}
                    className="border-skin-base-muted border-2 focus:border-skin-primary"
                  />
                  <span>Regulärer Gast</span>
                </label>
                <label className="--inline">
                  <input
                    type="checkbox"
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
    <NetlifyForm name='Contact' action='/thanks' honeypotName='bot-field'>
      {({ handleChange, success, error }) => (
        <div className="form">
          <Honeypot />
          {success && (
            <div className="feedback">
              <p>Thanks for contacting us!</p>
            </div>
          )}
          {error && (
            <div className="feedback --error">
              <p>Sorry, we could not reach our servers. Please try again later.</p>
            </div>
          )}
          <section className="item">
            <h2>Ihre Kontaktdaten</h2>
            <label>
              <span>Name:</span>
              <input type='text' name='name' required onChange={handleChange} />
            </label>
            <label>
              <span>Email:</span>
              <input type='email' name='email' required onChange={handleChange} />
            </label>
            <label>
              <span>Telefon:</span>
              <input type='text' name='telefon' onChange={handleChange} />
            </label>
            <label>
              <span>Kartenbestellung für:</span>
              <textarea type='text' name='guest-0' readOnly value={guestList[0].guestName + guestList[0].selectedType + guestList[0].table } className="" />
            </label>
          </section>
          <button type='submit'>({guestList.length}) Karten reservieren</button>
        </div>
      )}
    </NetlifyForm>
    </>
  )
}
