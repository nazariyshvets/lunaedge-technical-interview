import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Input from "../components/Input";
import Label from "../components/Label";
import AssistiveText from "../components/AssistiveText";

/**
 * Custom Input component
 */
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    icon: <EnvelopeIcon />,
    onChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2">
        <Label>Label</Label>
        <Story />
        <AssistiveText>This is a help text.</AssistiveText>
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("input"));
  },
};

export const Filled: Story = {
  args: {
    value: "Some value...",
  },
};

export const Validation: Story = {
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Custom placeholder...",
  },
};
