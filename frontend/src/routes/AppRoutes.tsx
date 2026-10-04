import { Routes, Route, Navigate } from "react-router-dom";
import SoloArena from "@/pages/SoloArena/SoloArena"; // Menggunakan alias @/pages/...

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/play/solo" element={<SoloArena />} />
            <Route path="/" element={<Navigate to="/play/solo" replace />} />
            <Route path="*" element={<div className="p-8 text-white">404 - Halaman Tidak Ditemukan</div>} />
        </Routes>
    );
}