import React from "react";

function About() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h1>ℹ️ About This Project</h1>

      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        The Film Revenue Analysis and Prediction System is a machine learning–
        based application designed to analyze historical movie data and predict
        box office revenue. The system uses data-driven techniques to help
        understand the factors that influence movie success.
      </p>

      {/* OBJECTIVE */}
      <h2 style={{ marginTop: "30px" }}>🎯 Objectives</h2>
      <ul>
        <li>Analyze historical movie datasets</li>
        <li>Identify key factors affecting revenue</li>
        <li>Build a machine learning prediction model</li>
        <li>Visualize insights using charts and dashboards</li>
      </ul>

      {/* TECH STACK */}
      <h2 style={{ marginTop: "30px" }}>⚙️ Technologies Used</h2>
      <ul>
        <li>Frontend: React.js</li>
        <li>Backend: Flask (Python)</li>
        <li>Machine Learning: Scikit-learn</li>
        <li>Data Processing: Pandas, NumPy</li>
        <li>Visualization: Chart.js</li>
      </ul>

      {/* WORKFLOW */}
      <h2 style={{ marginTop: "30px" }}>🔄 System Workflow</h2>
      <ol>
        <li>Collect movie dataset (Kaggle / TMDb)</li>
        <li>Clean and preprocess data</li>
        <li>Train machine learning model</li>
        <li>Predict revenue based on inputs</li>
        <li>Display results through dashboard</li>
      </ol>

      {/* ADVANTAGES */}
      <h2 style={{ marginTop: "30px" }}>✅ Advantages</h2>
      <ul>
        <li>Reduces risk in film investment</li>
        <li>Supports data-driven decision making</li>
        <li>Easy-to-use interactive dashboard</li>
        <li>Real-world application of machine learning</li>
      </ul>

      {/* FUTURE SCOPE */}
      <h2 style={{ marginTop: "30px" }}>🚀 Future Enhancements</h2>
      <ul>
        <li>Integration with live movie APIs</li>
        <li>Sentiment analysis of reviews</li>
        <li>Actor and director impact analysis</li>
        <li>Deployment on cloud platforms</li>
      </ul>

    </div>
  );
}

export default About;