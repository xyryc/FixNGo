import ServiceCard from "./ServiceCard";
import dbConnect, { collectionNames } from "@/lib/dbConnect";

const ServicesSection = async () => {
  const serviceCollection = dbConnect(collectionNames.servicesCollection);
  const data = await serviceCollection.find({}).toArray();

  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((item) => (
        <ServiceCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ServicesSection;
