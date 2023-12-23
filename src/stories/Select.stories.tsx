import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Select from "../components/Select";
import Label from "../components/Label";
import AssistiveText from "../components/AssistiveText";

/**
 * Custom Select component
 */
const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    options: [
      { value: "opt1", label: "Option 1" },
      { value: "opt2", label: "Option 2" },
      { value: "opt3", label: "Option 3" },
      { value: "opt4", label: "Option 4" },
      { value: "opt5", label: "Option 5" },
    ],
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
} satisfies Meta<typeof Select>;

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

    await userEvent.click(canvas.getByRole("control-panel"));
  },
};

export const Filled: Story = {
  args: {
    defaultValue: { value: "opt3", label: "Option 3" },
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

export const Multi: Story = {
  args: {
    isMulti: true,
  },
};

export const FilledMulti: Story = {
  args: {
    defaultValue: [
      { value: "opt3", label: "Option 3" },
      { value: "opt4", label: "Option 4" },
      { value: "opt5", label: "Option 5" },
    ],
    isMulti: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Custom placeholder...",
  },
};

export const Searchable: Story = {
  args: {
    isSearchable: true,
  },
};

export const DropdownTop: Story = {
  args: {
    align: "top",
  },
};
