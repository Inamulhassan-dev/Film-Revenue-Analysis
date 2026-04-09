import React from "react";

function Home() {
  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      color: "white"
    }}>
      
      <h1>🎬 Film Revenue Analysis Dashboard</h1>

      <p style={{
        maxWidth: "700px",
        margin: "20px auto",
        opacity: "0.8",
        lineHeight: "1.6"
      }}>
        This project uses Machine Learning to predict movie revenue based on
        historical data such as budget, popularity, runtime, and ratings.
        It helps make smarter, data-driven decisions in the film industry.
      </p>

      {/* FEATURES */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "40px"
      }}>

        <div style={card}>
          <h3>📊 Data Analysis</h3>
          <p>Explore trends and patterns in movie data.</p>
        </div>

        <div style={card}>
          <h3>🤖 ML Prediction</h3>
          <p>Predict revenue using trained ML models.</p>
        </div>

        <div style={card}>
          <h3>📈 Dashboard</h3>
          <p>Visualize insights through interactive charts.</p>
        </div>

      </div>

      {/* CTA */}
      <div style={{ marginTop: "50px" }}>
        <h2>🚀 Start Exploring</h2>
        <p>Go to the Predictor page to test movie revenue prediction.</p>
      </div>

    </div>
  );
}

const card = {
  background: "rgba(255,255,255,0.08)",
  padding: "20px",
  borderRadius: "15px",
  width: "250px",
  backdropFilter: "blur(10px)"
};

export default Home;