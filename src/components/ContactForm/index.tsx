import React, { useState, createRef } from "react";

import "../ReservationForm/Form.styles.css";

export const ContactForm = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [postingError, setPostingError] = useState(false);
  const [postingSuccess, setPostingSuccess] = useState(false);
  const emailEl = createRef();
  const messageEl = createRef();
  const postMail = async () => {
    const email = emailEl.current.value;
    const message = messageEl.current.value;

    setIsPosting(true);

    try {
      const res = await fetch("../../functions/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      if (!res.ok) {
        setPostingError(true);
      } else {
        setPostingSuccess(true);
      }
    } catch (e) {
      setPostingError(true);
    } finally {
      setIsPosting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postMail();
  };

  return (
    <>
      {postingSuccess ? (
        <div>Message sent. Thank you!</div>
      ) : (
        <form className="form my-8" method="post" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Your email address*
            <input
              type="email"
              aria-label="Your email address"
              name="email"
              id="email"
              placeholder="Email address"
              ref={emailEl}
              disabled={isPosting ? "disabled" : undefined}
              required
            />
          </label>
          <label htmlFor="message">
            Your message*
            <textarea
              ref={messageEl}
              id="message"
              aria-label="Your message"
              placeholder="Message"
              disabled={isPosting ? "disabled" : undefined}
              rows="5"
              required
            />
          </label>
          <button disabled={isPosting ? "disabled" : undefined}>Send</button>
        </form>
      )}
      {postingError ? (
        <div>Something went wrong, please try again (later).</div>
      ) : null}
    </>
  );
};
