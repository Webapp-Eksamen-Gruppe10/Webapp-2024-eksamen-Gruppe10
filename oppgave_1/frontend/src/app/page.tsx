import React from "react";
//import Layout from "../components/Layout"; // Adjust path if needed
import SignUp from "../components/SignUp"; // Adjust path if needed
export default function Home() {
  return (
    <main className="h-full">
      {/* <p>Siden er tom</p> 
      Eksisterer ikke på wireframes men er i All.js. 
      */}

      {/* SignUp component will be displayed as the main content */}
      <SignUp />
    </main>
  );
}
