"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateBookingForm({ data }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { _id, service_price, service_name, phone, date, address, message } =
    data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const phone = form.phone.value;
    const date = form.date.value;
    const address = form.address.value;
    const message = form.message.value;

    const updatedPayload = { phone, date, address, message };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/my-bookings/${_id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedPayload),
        }
      );
      const updatedRes = await res.json();

      if (updatedRes.modifiedCount > 0) {
        setLoading(false);
        toast.success("Booking Updated!");
        router.push("/my-bookings");
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
          Update Booking: {service_name}
        </h1>

        <h1 className="text-lg font-bold opacity-90">Price: {service_price}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              className="bg-black/10 cursor-not-allowed"
              defaultValue={session?.user?.name}
              name="name"
              placeholder="John"
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-black/10 cursor-not-allowed"
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
              defaultValue={phone}
              name="phone"
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input defaultValue={date} name="date" type="date" />
          </div>
        </div>

        {/*  Address Fields */}
        <div>
          <Label htmlFor="Address">Address</Label>
          <Input
            defaultValue={address}
            name="address"
            placeholder="6/A Jerusalem St. Palestine"
          />
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            defaultValue={message}
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
