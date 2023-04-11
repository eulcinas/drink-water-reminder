import React, { useState } from "react";
import "./App.css"; // import App CSS file
import ReminderTable from "./components/ReminderTable";

function App() {
  const [reminders, setReminders] = useState([]);

  const generateReminders = (fromTime, toTime, amountToDrink) => {
    const hoursDiff = (toTime - fromTime) / 1000 / 60 / 60;
    const amountPerHour = amountToDrink / hoursDiff;

    const reminders = [];
    let currentReminderTime = fromTime;
    while (currentReminderTime < toTime) {
      const reminder = {
        id: currentReminderTime,
        amount: amountPerHour,
        completed: false,
      };
      reminders.push(reminder);
      currentReminderTime += 60 * 60 * 1000; // increase by 1 hour
    }
    return reminders;
  };

  const handleReminderToggle = (id) => {
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === id) {
        return { ...reminder, completed: !reminder.completed };
      }
      return reminder;
    });
    setReminders(updatedReminders);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fromTime = new Date(formData.get("fromTime")).getTime();
    const toTime = new Date(formData.get("toTime")).getTime();
    const amountToDrink = Number(formData.get("amountToDrink"));
    const reminders = generateReminders(fromTime, toTime, amountToDrink);
    setReminders(reminders);
  };

  return (
    <div className="app">
      <h2>Drink Water Reminder</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <label>
          From:
          <input type="datetime-local" name="fromTime" required />
        </label>
        <label>
          To:
          <input type="datetime-local" name="toTime" required />
        </label>
        <label>
          Amount to Drink (ml):
          <input type="number" name="amountToDrink" required />
        </label>
        <button type="submit">Generate Reminders</button>
      </form>
      <ReminderTable reminders={reminders} onReminderToggle={handleReminderToggle} />
    </div>
  );
}

export default App;
