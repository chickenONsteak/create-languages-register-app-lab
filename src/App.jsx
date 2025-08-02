// src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import Languages from "./components/Languages";
import Home from "./components/Home";
import Party from "./components/Party";
import { Route, Routes } from "react-router-dom";
import PartyUpdate from "./components/PartyUpdate";
import PartyMoveset from "./components/PartyMoveset";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="manage-party" element={<Party />} />
        <Route path="manage-party-movesets" element={<PartyMoveset />} />
        <Route path="manage-languages" element={<Languages />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
