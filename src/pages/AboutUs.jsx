// filepath: /Users/leluloft/Desktop/ALX/webstack-portfolio-project/along9ja/src/pages/Home.jsx
import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.location.href = "./html/about.html"; // Navigate to the external HTML page
  }, []);

  return null; // Render nothing as the component will navigate away
}
