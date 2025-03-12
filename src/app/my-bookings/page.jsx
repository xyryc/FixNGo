import BookingsTable from "@/components/tables/BookingsTable";
import { headers } from "next/headers";
import React from "react";

const fetchBookings = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/service`, {
    headers: await headers(),
  });
  const data = await res.json();
  return data;
};

const MyBookingsPage = async () => {
  const data = await fetchBookings();
  // console.log(data);

  return (
    <div>
      <BookingsTable data={data} />
    </div>
  );
};

export default MyBookingsPage;
