import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";

/**
 * Custom Button component
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};

export const Pressed: Story = {
  parameters: {
    pseudo: { active: true },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Focused: Story = {
  parameters: {
    pseudo: { focus: true },
  },
};
