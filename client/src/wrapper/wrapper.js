import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import  Trans from "../Transactions";
const Wrapper = () => {
  var data =[ { category: 'Food', date: '1st January 2023', amount: '10$'}, 
              { category: 'Clothing', date: '6th January 2023', amount: '20$'},
              { category: 'Electricity', date: '31st December 2022', amount: '8$'},
              { category: 'Petrol', date: '1st January 2022', amount: '13$'}
            ];
  return (
    <div>
      <Routes>
        <Route path="/Transactions" element={<Trans data = {data}/>} />
      </Routes>
    </div>
  );
};
export default Wrapper;
