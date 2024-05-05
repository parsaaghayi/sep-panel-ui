import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "test-library/Button",
  component: Button,
  //   parameters: {
  //     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  //     layout: 'centered',
  //   },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

function onClickFunction() {
  console.log("this is button onClick function");
}

export const base: Story = {
  args: {
    label: "base button",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
    disabled: false,
    onClick: onClickFunction,
    loading: false,
  },
};
export const primary: Story = {
  args: {
    label: "primary button",
    type: "primary",
    loading: false,
    lastIconSrc:
      "https://www.safirstores.com/assets/images/footer/product-authenticity.svg",
  },
};
export const warning: Story = {
  args: {
    label: "warning button",
    loading: false,
    type: "warning",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const danger: Story = {
  args: {
    label: "danger button",
    loading: false,
    type: "danger",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const link: Story = {
  args: {
    label: "link button",
    loading: false,
    type: "link",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const subtle: Story = {
  args: {
    label: "subtle button",
    loading: false,
    type: "subtle",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const subtelLink: Story = {
  args: {
    label: "subtelLink button",
    loading: false,
    type: "subtelLink",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const disabled: Story = {
  args: {
    label: "subtelLink button",
    type: "subtelLink",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
    disabled: true,
  },
};
