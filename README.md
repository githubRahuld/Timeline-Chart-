Timeline Chart Application
This application visualizes schedules and timelines in an interactive, customizable chart using React and the react-calendar-timeline library. It is designed for efficient time management and scheduling, providing features like zooming, filtering, and responsive design.

🚀 Features
Interactive Timeline: Displays layered and grouped schedules in an easy-to-navigate format.
Custom Time Range: View data for specific periods like a month, two weeks, one week, or a single day.
Dynamic Colors: Assigns unique colors for better user distinction.
Smooth Scrolling: Includes smooth horizontal scrolling for seamless navigation.
User-friendly Design: Clear and concise data presentation with a focus on usability.
🛠️ Tech Stack
Frontend: React
Timeline Visualization: react-calendar-timeline
Date Manipulation: Moment.js
Styling: CSS
📦 Installation
Clone the repository:
bash
Copy code
git clone <repository-url>
Navigate to the project directory:
bash
Copy code
cd timeline-chart
Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm start
🖼️ Usage
Open your browser and navigate to http://localhost:3000.
Use the buttons to switch between time ranges: Month, 2 Weeks, 1 Week, or 1 Day.
Scroll horizontally to explore the timeline.
Hover over items to view additional details.
📝 Configuration
Data Source:
Update the data and users props in the TimelineChart component to integrate your desired data format.

Default Time Range:
Modify the visibleTimeStart and visibleTimeEnd states in the TimelineChart component for different default views.

Custom Styling:
Update the itemProps and Timeline CSS styles to adjust colors, fonts, and overall design.
