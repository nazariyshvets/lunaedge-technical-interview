import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { useForm } from "react-hook-form";
import { UserIcon } from "@heroicons/react/20/solid";
import Input from "../components/Input";
import Label from "../components/Label";
import AssistiveText from "../components/AssistiveText";
import type FormValues from "../types/FormValues";
import type { InputProps } from "../components/Input";

const InputStory = (props: Omit<InputProps, "name" | "register" | "icon">) => {
  const { register } = useForm<FormValues>();
  return (
    <Input name="name" register={register} icon={<UserIcon />} {...props} />
  );
};

/**
 * Custom Input component
 */
const meta = {
  title: "Components/Input",
  component: InputStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2">
        <Label>Label</Label>
        <Story />
        <AssistiveText>This is a help text.</AssistiveText>
      </div>
    ),
  ],
} satisfies Meta<typeof InputStory>;

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
