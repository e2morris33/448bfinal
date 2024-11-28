import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { gsap } from "gsap";
import "./App.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [showChart, setShowChart] = useState(false); // Toggle between screens
  const containerRef = useRef(null); // Ref for fade-out animation
  const contentRef = useRef(null); // Ref for fade-in animation of chart screen

  const handleBegin = () => {
    // GSAP fade-out animation
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShowChart(true); // Switch to the chart screen
      },
    });
  };

  useEffect(() => {
    // Trigger fade-in animation for the chart screen
    if (showChart) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
    }
  }, [showChart]);

  // Dynamic chart data
  const [selectedMetric, setSelectedMetric] = useState("yardage");
  const aggregatedData = [
    { team: "ARI", yardage: 38995, penalties: 106, twoPointConversions: 14 },
    { team: "ATL", yardage: 39473, penalties: 90, twoPointConversions: 5 },
    { team: "BAL", yardage: 39515, penalties: 96, twoPointConversions: 3 },
    { team: "BUF", yardage: 39379, penalties: 89, twoPointConversions: 4 },
    { team: "CAR", yardage: 41349, penalties: 108, twoPointConversions: 5 },
    { team: "KC", yardage: 38163, penalties: 96, twoPointConversions: 3 },
    { team: "CIN", yardage: 40251, penalties: 102, twoPointConversions: 6 },
    { team: "CLE", yardage: 39950, penalties: 110, twoPointConversions: 2 },
    { team: "DAL", yardage: 40600, penalties: 93, twoPointConversions: 4 },
    { team: "DEN", yardage: 38700, penalties: 94, twoPointConversions: 5 },
    { team: "DET", yardage: 40450, penalties: 91, twoPointConversions: 7 },
    { team: "GB", yardage: 39500, penalties: 90, twoPointConversions: 3 },
    { team: "HOU", yardage: 39700, penalties: 88, twoPointConversions: 3 },
    { team: "IND", yardage: 40000, penalties: 95, twoPointConversions: 4 },
    { team: "JAC", yardage: 39200, penalties: 89, twoPointConversions: 5 },
    { team: "LA", yardage: 38950, penalties: 104, twoPointConversions: 2 },
    { team: "LAC", yardage: 39850, penalties: 98, twoPointConversions: 3 },
    { team: "MIN", yardage: 40500, penalties: 107, twoPointConversions: 4 },
    { team: "NE", yardage: 39230, penalties: 103, twoPointConversions: 2 },
    { team: "NO", yardage: 40300, penalties: 100, twoPointConversions: 6 },
    { team: "NYG", yardage: 38500, penalties: 92, twoPointConversions: 3 },
    { team: "NYJ", yardage: 39000, penalties: 98, twoPointConversions: 4 },
    { team: "LV", yardage: 40050, penalties: 95, twoPointConversions: 5 },
    { team: "PHI", yardage: 42000, penalties: 105, twoPointConversions: 4 },
    { team: "PIT", yardage: 39210, penalties: 101, twoPointConversions: 3 },
    { team: "SEA", yardage: 40900, penalties: 90, twoPointConversions: 6 },
    { team: "SF", yardage: 41500, penalties: 94, twoPointConversions: 5 },
    { team: "TB", yardage: 38750, penalties: 100, twoPointConversions: 3 },
    { team: "TEN", yardage: 39300, penalties: 99, twoPointConversions: 4 },
    { team: "WAS", yardage: 39600, penalties: 102, twoPointConversions: 5 },
  ];

  const chartData = {
    labels: aggregatedData.map((row) => row.team),
    datasets: [
      {
        label: selectedMetric,
        data: aggregatedData.map((row) => row[selectedMetric]),
        backgroundColor: aggregatedData.map((row) =>
          row.team === "KC"
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(75, 192, 192, 0.2)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: { maxRotation: 0, minRotation: 0 },
      },
      y: {
        beginAtZero: true,
        grace: "5%",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chiefs Nation</h1>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-yellow-300">
              Home
            </a>
            <a
              href="https://www.chiefs.com/team/players-roster"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              Roster
            </a>
            <a href="#" className="hover:text-yellow-300">
              Schedule
            </a>
            <a href="#" className="hover:text-yellow-300">
              Stats
            </a>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center h-screen bg-gray-50"
      >
        <h1 className="text-5xl font-bold text-red-800 mb-8">
          Welcome to Chiefs Nation
        </h1>
        <p className="text-lg mb-6 text-center max-w-md">
          Patrick Mahomes is our MVP. Check out his highlights!
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/qb61-Ep405k?si=9rN7N4gdtyyI9E5h"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      {/* Chart Section */}
      <div ref={contentRef} className="min-h-screen bg-white">
        <main className="flex flex-col items-center justify-center py-8 px-4">
          <h2 className="text-3xl font-bold mb-4">Dynamic Comparison Chart</h2>
          <div className="flex flex-wrap lg:flex-nowrap items-start justify-center gap-8">
            {/* Chart Section */}
            <div
              className="flex-1 max-w-2xl lg:max-w-3xl"
              style={{ height: "500px", overflow: "auto" }}
            >
              <label htmlFor="metric" className="mb-4 block text-center">
                <span className="font-bold text-lg">Choose Metric:</span>
                <select
                  id="metric"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="ml-2 p-2 border rounded bg-gray-100 shadow focus:ring focus:ring-blue-300"
                >
                  <option value="yardage">Yardage</option>
                  <option value="penalties">Penalties</option>
                  <option value="twoPointConversions">
                    2-Point Conversions
                  </option>
                </select>
              </label>
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Paragraph Section */}
            <div className="flex-1 max-w-lg bg-gray-50 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">About the Chart</h3>
              <p className="mb-4">
                This interactive tool allows you to analyze the Kansas City
                Chiefs' performance across different metrics, such as yardage,
                penalties, and two-point conversions. The Chiefs are highlighted
                for easy comparison.
              </p>
              <p>
                Use the dropdown menu to switch between metrics and explore the
                data in detail.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
