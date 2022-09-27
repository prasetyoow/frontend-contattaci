import React from "react";
import {Routes, Route} from 'react-router-dom';
import FormContactUs from "./pages/formContactUs";
import GetContactUs from "./pages/getContactUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormContactUs />} />
      <Route path="/getData" element={<GetContactUs />} />
    </Routes>
  )
}

export default App;
