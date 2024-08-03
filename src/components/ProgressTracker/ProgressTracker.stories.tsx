import type { Meta, StoryObj } from "@storybook/react";
import ProgressTracker from "./ProgressTracker";

const meta = {
  title: "sep-panel-ui/ProgressTracker",
  component: ProgressTracker,
} satisfies Meta<typeof ProgressTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    direction: "ltr",
    stepTitles: ["step step 1", "step 2", "step 3", "step 4", "step 5"],
    activeStep: 1,
  },
};
