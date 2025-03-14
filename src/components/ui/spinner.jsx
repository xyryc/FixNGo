import { cn } from "@/lib/utils"; // Ensure you have this function or remove it

const Spinner = ({ size = "md", className }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-t-foreground border-l-foreground border-b-transparent border-r-transparent ${sizes[size]} ${className}`}
    />
  );
};

export default Spinner;
