import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "sep-panel-ui/Button",
  component: Button,
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
    type: "button",
    colorType: "primary",
    loading: false,
    lastIconSrc:
      "https://www.safirstores.com/assets/images/footer/product-authenticity.svg",
  },
};
export const warning: Story = {
  args: {
    label: "warning button",
    loading: false,
    colorType: "warning",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const danger: Story = {
  args: {
    label: "danger button",
    loading: false,
    colorType: "danger",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const link: Story = {
  args: {
    label: "link button",
    loading: false,
    colorType: "link",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const subtle: Story = {
  args: {
    label: "subtle button",
    loading: false,
    colorType: "subtle",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const subtelLink: Story = {
  args: {
    label: "subtleLink button",
    loading: false,
    colorType: "subtleLink",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
  },
};
export const disabled: Story = {
  args: {
    label: "disabled button",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
    disabled: true,
  },
};
export const more: Story = {
  args: {
    label: "more button",
    colorType: "base",
    fistIconSrc: "https://www.svgrepo.com/show/532036/cloud-rain-alt.svg",
    hasMore: true,
  },
};
