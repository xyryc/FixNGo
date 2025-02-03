"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CheckoutForm({ data }) {
  const { data: session } = useSession();
  const { _id, title, service_id, img, price, description, facility } = data;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const date = form.date.value;
    const address = form.address.value;
    const message = form.message.value;

    const payload = {
      // session infos
      name,
      email,
      // user inputs
      phone,
      date,
      address,
      message,
    };
    console.log(payload);
  };

  return (
    <div className="border border-black/30 max-w-screen-sm mx-auto rounded-md p-10 sm:p-12">
      <div className="mb-4 items-center">
        <h1 className="text-2xl font-bold mb-2">Book Service: {title}</h1>

        <h1 className="text-lg font-bold opacity-90">Price: {price}</h1>
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
            <Input id="phone" name="phone" placeholder="+1 234 567 890" />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input name="date" type="date" />
          </div>
        </div>

        {/* Date & Address Fields */}

        <div>
          <Label htmlFor="Address">Address</Label>
          <Input name="address" placeholder="6/A Jerusalem St. Palestine" />
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            rows={2}
          />
        </div>

        {/* Confirm Order Button */}
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
        >
          Confirm Order
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
