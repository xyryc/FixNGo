import UpdateBookingForm from "@/components/forms/UpdateBookingForm";
import { headers } from "next/headers";
import React from "react";

const UpdateBookingPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/my-bookings/${id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();

  return (
    <div>
      <UpdateBookingForm data={data} />
    </div>
  );
};

export default UpdateBookingPage;
