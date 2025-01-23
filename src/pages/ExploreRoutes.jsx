import React from "react";
import SharedMapContent from "../Components/SharedMapContent";

export default function Home() {
  return (
    <div style={{ textAlign: "center", color: "#ffc700", marginTop: "10px" }}>
      <h1>Explore Routes!</h1>
      <SharedMapContent />
    </div>
  );
}
