import { Introduction } from "./components/introduction";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Dashboard } from "./components/dashboard";
import { Computer } from "./components/computer";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/computer" element={<Computer />} />
      </Routes>
    </BrowserRouter>
  )
}
