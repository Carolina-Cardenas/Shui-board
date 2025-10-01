import React, { useState } from "react";

const EditMessage = ({ message, onSave, onCancel }) => {
  const [text, setText] = useState(message.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onSave(message.id, text);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ändra ditt meddelande..."
      />
      <button type="submit">Spara</button>
      <button type="button" onClick={onCancel}>
        Avbryt
      </button>
    </form>
  );
};

export default EditMessage;
