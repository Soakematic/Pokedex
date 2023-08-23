import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* Style */
import './style/Style.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Get from "./pages/GetPoke";
import Profile from "./pages/Profile";
import Pokedex from "./pages/Pokedex";
import Testing from "./pages/Testing";
import NoPage from "./pages/NoPage";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="get" element={<Get />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="pokedex" element={<Pokedex />} />
                    <Route path="testing" element={<Testing />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
