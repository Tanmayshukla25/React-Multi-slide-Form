import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(null);
  const [formWidth, setFormWidth] = useState(0);
  const [inputDivWidth, setInputDivWidth] = useState(0);
  const [stepMargin, setStepMargin] = useState(0);

  const nextStep = (e) => {
    e.preventDefault();
    setDirection("next");
    setTimeout(() => {
      if (step < 3) setStep(step + 1);
      setDirection(null);
    }, 100);
  };

  const previousStep = (e) => {
    e.preventDefault();
    setDirection("previous");
  
    setTimeout(() => {
     
      if (step > 2) {
        setStep(step - 1);
      } else {
        setStep(1); 
      }
  
      setDirection(null);
    }, 500);
  };
  
  useEffect(() => {
    const firstStep = document.querySelector(".step1");
    if (firstStep) {
      const margin = parseFloat(window.getComputedStyle(firstStep).marginRight);
      setStepMargin(margin);
    }
  }, []);

  useEffect(() => {
    const formElement = document.querySelector("form");
    setFormWidth(formElement.clientWidth * 3 + stepMargin * 3);
    setInputDivWidth(formElement.clientWidth);
  }, [stepMargin]);


  let slideClass = "";
  if (direction === "next") {
    slideClass = "slide-in-right";
  } else if (direction === "previous") {
    slideClass = "slide-in-left";
  }

  return (
    <div className="w-full mx-2 sm:mx-auto sm:w-[40%] p-2 sm:p-8 rounded-2xl bg-sky-500 shadow-lg shadow-gray-300 mt-10 overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6 text-center">Multi-Step-Form</h1>
      <h2 className="font-bold mb-4">Step {step}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div
           className={`step-container w-full min-h-64 ${slideClass}`}
          style={{
            width: `${formWidth}px`,
            transform: `translateX(-${(step - 1) * (formWidth / 3)}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div
            className="step1 inline-block w-full align-top mr-5 bg-white p-5 rounded-2xl"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Enter Your Name"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="email"
              placeholder="Enter Your Email"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="Enter Your Father Name"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="Enter Your Mother Name"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
          </div>

          <div
            className="step2 inline-block w-full align-top bg-white p-5 mr-5 rounded-2xl"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Address"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="City"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="State"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="Country"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
          </div>

          <div
            className="step3 inline-block w-full align-top mr-5 bg-white p-5 rounded-2xl"
            style={{ width: `${inputDivWidth}px` }}
          >
            <input
              required
              type="text"
              placeholder="Phone Number"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="Date of Birth"
              className="border-3 border-black rounded w-full mb-2 px-4 py-2"
            />
          </div>
        </div>

        <div className="buttons">
          <button
            onClick={previousStep}
            className={` bg-gray-600 text-white text-lg px-[20px] py-[5px] rounded   my-3 disabled:opacity-70 ${
              step === 1 ? "" : "hover:bg-white hover:text-black"
            }`}
            disabled={step === 1}
          >
            
            Previous
          </button>

          {step !== 3 ? (
            <button
              onClick={nextStep}
              className="bg-fuchsia-700 text-amber-50 rounded-xl text-lg px-[20px] py-[5px] my-3"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert("Form submitted!")}
              className="bg-emerald-200 text-lg px-[20px] py-[5px] rounded-xl my-3"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
