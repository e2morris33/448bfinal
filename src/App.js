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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trivia, setTrivia] = useState("");
  const [loading, setLoading] = useState(false);

  // Add this near your other state declarations
  const [hasScrolledToAbout, setHasScrolledToAbout] = useState(false);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = aboutSectionRef.current;
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      const sectionHeight = aboutSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress (0 to 1)
      const progress = Math.max(
        0,
        Math.min(
          1,
          1 - (rect.top - viewportHeight * 0.25) / (sectionHeight * 0.5)
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const facts = [
    "The Kansas City Chiefs were founded in 1960 as the Dallas Texans.",
    "The Chiefs won their first Super Bowl in 1970, led by coach Hank Stram.",
    "Arrowhead Stadium, the Chiefs' home, is one of the loudest stadiums in the NFL.",
    "Patrick Mahomes became the youngest quarterback to win Super Bowl MVP in 2020.",
    "The Chiefs have one of the longest streaks of sell-out games in NFL history.",
  ];

  const fetchTrivia = () => {
    setLoading(true);
    setTrivia("");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setTrivia(facts[randomIndex]);
      setLoading(false);
    }, 1000);
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
        ref={aboutSectionRef}
        className="relative h-screen flex items-center justify-center min-h-screen"
      >
        {/* Animated left panel */}
        <div
          className="sticky left-0 top-0 h-screen bg-red-600 transition-all duration-1000 ease-in-out"
          style={{
            width: "50%",
            transform: `translateX(${-100 * (1 - scrollProgress)}%)`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-1000"
            style={{ opacity: scrollProgress }}
          >
            <h2 className="text-white text-8xl font-bold whitespace-nowrap mb-4">
              ABOUT
            </h2>
            <h2 className="text-white text-8xl font-bold whitespace-nowrap mb-4">
              THE
            </h2>
            <h2 className="text-white text-8xl font-bold whitespace-nowrap">
              CHIEFS
            </h2>
          </div>
        </div>

        {/* Right content */}
        <div className="w-1/2 ml-auto p-12">
          <div
            className="space-y-8 transition-all duration-1000 delay-500"
            style={{
              opacity: scrollProgress,
              transform: `translateX(${50 * (1 - scrollProgress)}px)`,
            }}
          >
            <div className="prose prose-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                The Kansas City Chiefs are a professional football team with a
                rich history and a strong tradition of excellence. Established
                in 1960, the Chiefs are a cornerstone of the NFL, known for
                their passionate fan base, electrifying gameplay, and commitment
                to community. The team boasts a legacy of championship success,
                including multiple Super Bowl victories, and features some of
                the league's most iconic players and coaches. Based in Kansas
                City, Missouri, the Chiefs bring energy and pride to the field
                every game day, uniting fans across the nation in their pursuit
                of greatness. Whether on the field or off, the Chiefs exemplify
                teamwork, resilience, and a dedication to the sport they love.
                {/* rest of your paragraph text */}
              </p>
            </div>

            {/* Trivia Section */}
            <div className="w-full flex flex-col items-start">
              <button
                onClick={fetchTrivia}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200"
                disabled={loading}
              >
                Show Chiefs Trivia
              </button>

              {loading && (
                <div className="w-8 h-8 mt-4 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              )}

              {!loading && trivia && (
                <div className="w-full mt-4 p-6 bg-white rounded-lg shadow-md transition-all duration-300">
                  <p className="text-lg text-gray-700">{trivia}</p>
                </div>
              )}
            </div>
          </div>
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
