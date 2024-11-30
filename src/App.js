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

  const [trivia, setTrivia] = useState("");
  const [loading, setLoading] = useState(false);

  const facts = [
    "The Kansas City Chiefs were founded in 1960 as the Dallas Texans.",
    "The Chiefs won their first Super Bowl in 1970, led by coach Hank Stram.",
    "Arrowhead Stadium, the Chiefs' home, is one of the loudest stadiums in the NFL.",
    "Patrick Mahomes became the youngest quarterback to win Super Bowl MVP in 2020.",
    "The Chiefs have one of the longest streaks of sell-out games in NFL history.",
    "Emma morris and Riely pittman are the coolest people ever",
  ];

  const fetchTrivia = () => {
    setLoading(true); // Start loading
    setTrivia(""); // Clear previous trivia
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setTrivia(facts[randomIndex]);
      setLoading(false); // Stop loading
    }, 2000); // Simulate a 2-second delay
  };

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
          <h1 className="text-2xl font-bold">Chiefs Nation </h1>
          <nav className="flex space-x-6">
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
        className="welcome-section flex flex-col items-center justify-center h-screen"
        style={{
          backgroundImage: `url(${require("./field.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255)", // Semi-transparent white
            padding: "2rem", // Add padding around the content
            borderRadius: "12px", // Rounded corners
            textAlign: "center",
            maxWidth: "80%", // Limit the box width
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          }}
        >
          <h1 className="text-5xl font-bold text-red-500 mb-4">
            Welcome to Chiefs Nation
          </h1>
          <p className="text-lg text-black mb-4">
            Patrick Mahomes is our MVP. Check out his highlights!
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qb61-Ep405k?si=9rN7N4gdtyyI9E5h"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Bouncing Scroll Arrow */}
        <div
          className="scroll-arrow"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img
            src={require("./arrow.png")}
            alt="Scroll Down"
            style={{
              width: "60px",
              height: "auto",
              animation: "bounce 2s infinite",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div
        className="about-chiefs-section flex items-center justify-center min-h-screen px-8"
        style={{
          backgroundColor: "#f5f5f5", // Light background for contrast
        }}
      >
        <div className="about-chiefs-section">
          {/* Left Panel */}
          <div className="left-panel" ref={containerRef}>
            <h2 className="about-header">About the Chiefs</h2>
            <p className="about-description"></p>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <p>
              The Kansas City Chiefs are a cornerstone of the NFL, blending a
              storied legacy with modern-day dominance. Since their founding in
              1960, the Chiefs have become a symbol of excellence, securing
              multiple Super Bowl championships and fostering a passionate fan
              base. Known for their high-powered offense, innovative strategies,
              and the unmatched atmosphere of Arrowhead Stadium, the Chiefs
              continue to inspire loyalty and pride in Kansas City and beyond.
              Whether on the field or in the community, the Chiefs embody
              teamwork, perseverance, and the relentless pursuit of greatness.
            </p>
          </div>
        </div>

        {/* Right Trivia Button and Spinner */}
        <div className="w-1/2 flex flex-col items-center">
          <button
            onClick={fetchTrivia}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-800 transition"
            disabled={loading} // Disable button while loading
          >
            Show Chiefs Trivia
          </button>
          {loading && (
            <div className="spinner mt-4"></div> // Spinner animation while loading
          )}
          {!loading && trivia && (
            <div className="trivia-card bg-white mt-4 p-4 rounded shadow-md">
              <p className="text-lg">{trivia}</p>
            </div>
          )}
        </div>
      </div>
      Chart Section
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
