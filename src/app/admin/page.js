// src/app/admin/page.js
"use client"


import { useState } from "react";

export default function AdminPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      question,
      options,
      correctAnswer: parseInt(correctAnswer),
    };

    const response = await fetch("/api/add-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Question added successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } else {
      alert("Error adding question.");
    }
  };

  return (
    <div>
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>

        <div>
          <label>Correct Answer (0-3):</label>
          <input
            type="number"
            min="0"
            max="3"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}
