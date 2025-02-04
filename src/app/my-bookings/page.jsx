"use client";

import BookingsTable from "@/components/tables/BookingsTable";
import React, { useEffect, useState } from "react";

const MyBookingsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("http://localhost:3000/api/service");
      const data = await res.json();
      setData(data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <BookingsTable data={data} />
    </div>
  );
};

export default MyBookingsPage;
