import React from "react";
import TimelineChart from "./components/TimelineChart.jsx";
import data from "./data/data.json";
import users from "./data/users.json";

function App() {
  return (
    <div>
      <h1
        style={{
          margin: "20px",
        }}
      >
        Timeline Chart
      </h1>
      <TimelineChart data={data} users={users.users} />
    </div>
  );
}

export default App;
