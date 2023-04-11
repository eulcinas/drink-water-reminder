import React from "react";

function ReminderTable({ reminders, onReminderToggle }) {
  const handleReminderToggle = (id) => {
    onReminderToggle(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount to Drink</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {reminders.map((reminder) => (
          <tr key={reminder.id}>
            <td>{reminder.id}</td>
            <td>Drink {reminder.amount} ml of water</td>
            <td>
              <label className="reminder">
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => handleReminderToggle(reminder.id)}
                />
                <span className="checkmark"></span>
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReminderTable;
