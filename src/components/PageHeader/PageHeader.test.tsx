import React from "react";
import { render } from "@testing-library/react";
import PageHeader from "./PageHeader";
import Button from "../Button";

describe("PageHeader", () => {
  test("render the PageHeader component", () => {
    render(
      <PageHeader
        breadcrumbTitles={[
          "avali",
          "dovomi",
          <a href="http:///google.com">akhari</a>,
          "chaharomi",
          <a href="#">panjomiam link gozashtam eshq koni</a>,
          "shishomi",
          "haftomi",
        ]}
        title="عنوان صفحه"
        buttons={[
          <Button colorType="primary" label={"عنوان دکمه اول"} />,
          <Button label={"عنوان دکمه دوم"} />,
          <Button label="" hasMore={true} />,
        ]}
      >
        <p>filterha</p>
      </PageHeader>
    );
  });
});
