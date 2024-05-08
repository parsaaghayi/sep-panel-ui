import React, { ReactElement, ReactNode } from "react";
import "./style.css";
import Breadcrumb from "../Breadcrumb";

type PageHeaderPropsType = {
  breadcrumbTitles: (string | ReactElement)[];
  title: string;
  buttons?: ReactElement[];
  children?: ReactNode;
};

const PageHeader: React.FC<PageHeaderPropsType> = ({
  breadcrumbTitles,
  title,
  buttons,
  children,
}) => {
  return (
    <div className="pageHeader-container">
      <Breadcrumb titles={breadcrumbTitles} />
      <div className="pageHeader-body">
        <h1 className="pageHeader-title">{title}</h1>
        <div className="pageHeader-buttons">
          {buttons?.map((button, index) => (
            <div key={`pageHeader-button-${index}`}>{button}</div>
          ))}
        </div>
      </div>
      <div className="pageHeader-filters">{children}</div>
    </div>
  );
};

export default PageHeader;
