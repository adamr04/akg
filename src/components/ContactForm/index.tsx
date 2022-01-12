import React, { useState } from "react";

const endpoints = {
  contact: "/.netlify/functions/addGoogleSheet",
}
const axios = require("axios")

export const ContactForm = () => {

  const [state, setState] = useState<Array>([
    { name: "", email: "", tel: "", },
  ]);

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    const statesToUpdate = {}
    statesToUpdate[name] = value
    setState(statesToUpdate)
  }

  const handleSubmit = e => {
    let { name, email, message } = state
    let data = { name, email, message }
    axios.post(endpoints.contact, JSON.stringify(data)).then(response => {
      if (response.status !== 200) {
        this.handleError()
      } else {
        this.handleSuccess()
      }
    })
    e.preventDefault()
  }

  const handleSuccess = () => {
    setState({
      name: "",
      email: "",
      tel: "",
      loading: false,
      error: false,
    })
  }

  const handleError = msg => {
    setState({
      loading: false,
      error: true,
      msg,
    })
  }

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          id="name"
          label="Name"
          value={state.name}
          onChange={handleChange}
          name="name"
          type="text"
        />
        <input
          id="email"
          label="Email"
          value={state.email}
          onChange={handleChange}
          name="email"
          type="email"
        />

        <input
          id="tel"
          label="Telefon"
          value={state.tel}
          onChange={handleChange}
          name="tel"
          type="tel"
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
