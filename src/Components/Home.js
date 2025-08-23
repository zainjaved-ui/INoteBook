import React, { useContext, useState } from "react";
import Notes from "./Notes";
export default function Home({showAlert}) {
  return (
    <div className="container mt-5">
     {/* ✅ Pass showAlert to Notes */}
      <Notes showAlert={showAlert} />    </div>
  );
}
