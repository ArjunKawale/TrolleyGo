import './App.css';
import React, { useState } from "react";
import {Header} from "./Components/Header";
import {Sidebar} from "./Components/Sidebar";
import { ImageBar } from './Components/ImageBar';
import { ProductCards } from './Components/ProductCards';


function App() {
 const [value,setvalue]=useState(false);
 const updateValue=(newValue)=>{
  setvalue(newValue);
 }
  return (
   <>
   <Header  updateValue={updateValue}/>
   <Sidebar value={value} onClose={() => setvalue(false)}/>
   <ImageBar/>
   <ProductCards/>
   </>
  );
}

export default App;
