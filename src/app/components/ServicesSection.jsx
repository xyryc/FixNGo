import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import dbConnect from "@/lib/dbConnect";

const ServicesSection = async () => {
  const serviceCollection = dbConnect("services");
  const data = await serviceCollection.find({}).toArray();
  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <ServiceCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ServicesSection;
