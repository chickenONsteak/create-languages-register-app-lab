import { useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

const Home = () => {
  return (
    <div className="container">
      <h1>Homepage</h1>
      <ol>
        <li>Go to Manage party to manage user information</li>
        <li>Go to Manage party movesets to manage languages that users know</li>
        <li>Go to Manage languages to manage all programming languages</li>
      </ol>
    </div>
  );
};

export default Home;
