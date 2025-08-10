"use client"
import { SignInForm, SignUpForm } from "../Components/Forms";
import { useState } from "react";

// Form Logic
export default function Form() {
   const  [formSwitch, setFormSwitch] = useState(false)

  const handleSwitch = () => {
    setFormSwitch((prev) => !prev)
  }
  return (
   <div>
      {formSwitch ? 
        (<SignInForm onSwitch={handleSwitch}/>) : 
       (<SignUpForm onSwitch={handleSwitch}/>)}  

   </div>
  );
}
