import React, { useState } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const TimelineChart = ({ data, users }) => {
  // Create a mapping for user IDs to names for easier reference
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user.name;
  });

  // Function to assign a unique color to each user
  const getColor = (userId) => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F5A623",
      "#D81159",
      "#5C2A9D",
    ];
    return colors[userId % colors.length];
  };

  // Prepare groups (layers) for the timeline
  const groups = data.layers.map((layer) => ({
    id: layer.number,
    title: `Layer ${layer.number}`,
  }));

  // Add a group for the Final Schedule
  groups.push({ id: "final", title: "Final Schedule" });

  // Prepare items for the timeline
  const items = [];

  // Loop through layers
  data.layers.forEach((layer) => {
    layer.layers.forEach((schedule, index) => {
      items.push({
        id: `layer-${layer.number}-${index}`,
        group: layer.number,
        title: userMap[schedule.userId] || "Unknown User",
        start_time: new Date(schedule.startDate),
        end_time: new Date(schedule.endDate),
        itemProps: { style: { backgroundColor: getColor(schedule.userId) } },
      });
    });
  });

  // Loop through final schedule
  data.finalSchedule.forEach((schedule, index) => {
    items.push({
      id: `final-${index}`,
      group: "final",
      title: userMap[schedule.userId] || "Unknown User",
      start_time: new Date(schedule.startDate),
      end_time: new Date(schedule.endDate),
      itemProps: { style: { backgroundColor: getColor(schedule.userId) } },
    });
  });

  // Default time range for the timeline
  const [visibleTimeStart, setVisibleTimeStart] = useState(
    moment("2022-10-01").valueOf()
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    moment("2022-10-31").valueOf()
  );

  // Handle time range changes based on the user's selection
  const handleTimeRangeChange = (range) => {
    const now = moment("2022-10-01");
    let newStart;
    let newEnd;

    switch (range) {
      case "month":
        newStart = now.startOf("month").valueOf();
        newEnd = now.endOf("month").valueOf();
        break;
      case "2weeks":
        newStart = now.valueOf();
        newEnd = now.add(2, "weeks").valueOf();
        break;
      case "1week":
        newStart = now.valueOf();
        newEnd = now.add(1, "week").valueOf();
        break;
      case "1day":
        newStart = now.valueOf();
        newEnd = now.add(1, "day").valueOf();
        break;
      default:
        return;
    }

    setVisibleTimeStart(newStart);
    setVisibleTimeEnd(newEnd);
  };

  return (
    <div
      style={{
        margin: "20px",
        scrollBehavior: "smooth",
      }}
    >
      {/* Buttons to change time range */}
      <div
        style={{
          marginBottom: "10px",
          textAlign: "start",
          marginRight: "10px",
        }}
      >
        <button onClick={() => handleTimeRangeChange("month")}>Month</button>
        <button onClick={() => handleTimeRangeChange("2weeks")}>2 Weeks</button>
        <button onClick={() => handleTimeRangeChange("1week")}>1 Week</button>
        <button onClick={() => handleTimeRangeChange("1day")}>1 Day</button>
      </div>

      {/* Timeline component */}
      <div
        style={{
          height: "600px",
          width: "1100px",
          overflowX: "scroll",
          overflowY: "hidden",
          color: "orange",
        }}
      >
        <Timeline
          groups={groups}
          items={items}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          canMove={false}
          canResize={true}
          stackItems // Stack items to avoid overlapping
          lineHeight={60}
          itemHeightRatio={0.85}
          onTimeChange={(
            newVisibleTimeStart,
            newVisibleTimeEnd,
            updateScrollCanvas
          ) => {
            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
            updateScrollCanvas(newVisibleTimeStart, newVisibleTimeEnd);
          }}
        />
      </div>
    </div>
  );
};

export default TimelineChart;
