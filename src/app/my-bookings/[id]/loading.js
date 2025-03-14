import Spinner from "@/components/ui/spinner";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingSpinner;
