"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateBookingForm({ data }) {
  console.log(data);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { _id, title, img, price, description, facility } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const phone = form.phone.value;
    const date = form.date.value;
    const address = form.address.value;
    const message = form.message.value;

    const bookingPayload = { phone, date, address, message };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/service`, {
        method: "POST",
        body: JSON.stringify(bookingPayload),
      });
      const postedRes = await res.json();

      if (postedRes.insertedId) {
        setLoading(false);
        toast.success("Service Booked!");
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="border border-black/30 max-w-screen-sm mx-auto rounded-md p-10 sm:p-12">
      <div className="mb-4 items-center">
        <h1 className="text-2xl font-bold mb-2">
          Update Booking: {data?.service_name}
        </h1>

        <h1 className="text-lg font-bold opacity-90">
          Price: {data?.service_price}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              className="bg-black/10"
              defaultValue={session?.user?.name}
              name="name"
              placeholder="John"
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-black/10"
              defaultValue={session?.user?.email}
              readOnly
              name="email"
              type="email"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              defaultValue={data?.phone}
              name="phone"
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input defaultValue={data?.date} name="date" type="date" />
          </div>
        </div>

        {/*  Address Fields */}
        <div>
          <Label htmlFor="Address">Address</Label>
          <Input
            defaultValue={data?.address}
            name="address"
            placeholder="6/A Jerusalem St. Palestine"
          />
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            defaultValue={data?.message}
            name="message"
            placeholder="Enter your message"
            rows={2}
          />
        </div>

        {/* Confirm Order Button */}
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Update Order"
          )}
        </Button>
      </form>
    </div>
  );
}
