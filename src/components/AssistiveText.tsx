interface AssistiveTextProps {
  children?: string;
  error?: boolean;
}

const AssistiveText = ({ children, error = false }: AssistiveTextProps) => {
  return (
    <p className={`text-sm ${error ? "text-red-400" : "text-gray-400"}`}>
      {children}
    </p>
  );
};

export default AssistiveText;
