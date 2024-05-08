import React, { ReactElement } from "react";
import "./style.css";

type BreadcrumbPropsType = {
  titles: (string | ReactElement)[];
};

const Breadcrumb: React.FC<BreadcrumbPropsType> = ({ titles }) => {
  return (
    <div className="breadcrumb-container">
      {titles.map((breadcrumbItem, index) => (
        <div className="breadcrumb-item" key={index}>
          {breadcrumbItem}{" "}
          {index + 1 !== titles.length ? (
            <span className="breadcrumb-slash">/</span>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
