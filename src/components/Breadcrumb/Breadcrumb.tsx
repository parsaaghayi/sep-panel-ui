import React, { ReactElement } from "react";
import "./style.css";

type BreadcrumbPropsType = {
  titles: (string | ReactElement)[];
  className?: string;
};

const Breadcrumb: React.FC<BreadcrumbPropsType> = ({ titles, className }) => {
  return (
    <div className={`breadcrumb-container ${className ? className : ""}`}>
      {titles.map((breadcrumbItem, index) => (
        <div className="breadcrumb-item" key={index}>
          {breadcrumbItem}
          {index + 1 !== titles.length && (
            <span className="breadcrumb-slash">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
