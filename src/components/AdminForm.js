"use client"; // Makes this a client-side component

import { useState } from "react";

export default function AdminForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Handle changes for the options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent form from submitting normally

  const questionData = { question, options, correctAnswer };

  try {
    const response = await fetch("/api/add-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });

    const result = await response.json(); // Parsing JSON response

    if (!response.ok) {
      console.error("Failed to add question:", result.message || result);
      setMessage(result.message || "Error adding question. Please try again.");
      return;
    }

    setMessage("Question added successfully!");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  } catch (error) {
    console.error("Unexpected error:", error);
    setMessage("Unexpected error occurred. Please try again.");
  }
};



  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Option {index + 1}:</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block mb-2">Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Question
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
