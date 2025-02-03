import CheckoutForm from "@/components/forms/CheckoutForm";
import React from "react";

const CheckoutPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/service/${id}`);
  const data = await res.json();

  return (
    <div className="px-4">
      <CheckoutForm data={data} />
    </div>
  );
};

export default CheckoutPage;
