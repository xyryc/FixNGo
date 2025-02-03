import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const ServiceDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/service/${id}`);
  const data = await res.json();

  const { _id, title, service_id, img, price, description, facility } = data;

  return (
    <div className="container mx-auto px-4">
      <section className="my-4 2xl:my-12 relative ">
        <Image
          src={"/assets/images/checkout/checkout.png"}
          width={1280}
          height={300}
          alt="banner image"
        />

        <div className="transparent-layer overlay-bg absolute w-full h-full top-0 rounded-xl">
          <div className="flex items-center h-full ps-20">
            <h1 className="font-bold text-4xl text-white">Service Details</h1>
          </div>
        </div>
      </section>

      <section className="my-20 grid grid-cols-12 gap-6">
        {/* left */}
        <div className="col-span-9">
          <Image
            src={img}
            width={752}
            height={500}
            alt={title}
            className="rounded-lg w-full h-80 object-cover"
          />

          <h3 className="font-bold text-4xl mt-10">{title}</h3>
          <p className="opacity-70 mt-7">{description}</p>

          <div className="grid grid-cols-2 gap-6 mt-7">
            {facility?.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle className="font-bold text-xl opacity-80">
                    {item.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="opacity-70">{item.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="col-span-3 space-y-8 text-center">
          <p className="text-4xl font-bold">Price: {price}</p>

          <Button size="lg" className="w-full" asChild>
            <Link href={`/checkout/${_id}`}>Proceed to Checkout</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailsPage;
