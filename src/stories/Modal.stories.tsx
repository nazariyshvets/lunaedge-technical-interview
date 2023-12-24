import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/Modal";

/**
 * Custom Modal component
 */
const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    title: "Modal title",
    children: <div></div>,
    onCancel: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    children: (
      <div className="flex h-72 w-72 items-center justify-center border-2 border-black">
        Modal content
      </div>
    ),
  },
};

export const WithLongTitle: Story = {
  args: {
    title: "Modal title Modal title Modal title Modal title",
  },
};
