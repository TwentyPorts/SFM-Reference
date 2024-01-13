import "./SubmitPage.scss";
import React, { useState } from "react";

const SubmitPage = () => {
  document.title = "Submit Images - SFM Reference";
  const [formData, setFormData] = useState({
    name: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="submit-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitPage;
