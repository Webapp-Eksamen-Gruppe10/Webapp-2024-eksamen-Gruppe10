import React from "react";
//import Layout from "../components/Layout"; // Adjust path if needed
import SignUp from "../components/SignUp";  // Adjust path if needed
import { useRouter } from "next/router";
export default function Home() {
  return (
      <main className="h-full">
        {/* SignUp component will be displayed as the main content */}
        <SignUp />
      </main>
  );
}
