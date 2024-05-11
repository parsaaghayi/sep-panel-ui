import React from "react";
import "./style.css";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type zeroToHundred = IntRange<0, 101>;

type ProgressbarPropsType = {
  filled: zeroToHundred;
};

const Progressbar: React.FC<ProgressbarPropsType> = ({ filled }) => {
  return (
    <div className="progressbar-container">
      <span
        className="porgressbar-track"
        style={{
          width: `${filled}%`,
          backgroundColor: `${filled >= 100 ? "#36B37E" : "#42526E"}`,
        }}
      ></span>
    </div>
  );
};

export default Progressbar;
