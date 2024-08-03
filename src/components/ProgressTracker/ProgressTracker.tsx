import React from "react";
import "./style.css";

type ProgressTrackerPropsType = {
  direction: "ltr" | "rtl";
  stepTitles: string[];
  activeStep: number;
};

const ProgressTracker: React.FC<ProgressTrackerPropsType> = ({
  direction,
  stepTitles,
  activeStep = 1,
}) => {
  return (
    <div className="progressTracker-container">
      {stepTitles.map((stepTitle, index) => (
        <div
          className={`progressTracker-step ${activeStep === index ? "active" : ""}`}
          key={`${stepTitle}-${index}`}
          style={{ width: `${100 / stepTitles.length}%` }}
        >
          <span
            className="progressTracker-stepCircle"
            style={{
              backgroundColor: `${activeStep >= index ? "#0065FF" : "#A5ADBA"}`,
            }}
          ></span>
          {activeStep <= stepTitles.length - 1 ? (
            <span
              className="progressTracker-track"
              style={{
                left: `${activeStep === index && direction === "ltr" ? "0px" : activeStep !== index && direction === "ltr" ? "auto" : activeStep === index && direction === "rtl" ? "auto" : activeStep !== index && direction === "rtl" ? "0px" : "auto"}`,
                right: `${activeStep === index && direction === "rtl" ? "0px" : activeStep !== index && direction === "rtl" ? "auto" : activeStep === index && direction === "ltr" ? "auto" : activeStep !== index && direction === "ltr" ? "0px" : "auto"}`,
                backgroundColor: `${activeStep >= index ? "#0065FF" : ""}`,
                width: `${index === 0 && activeStep === index ? "0%" : index === 0 && activeStep !== index ? "50%" : activeStep === index ? "50%" : activeStep > index && index + 1 === stepTitles.length ? "50%" : "100%"}`,
              }}
            ></span>
          ) : (
            <></>
          )}

          <h2 className="progressTracker-stepTilte">{stepTitle}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
