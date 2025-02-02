import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function ServiceCard({ item }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Image */}
      <div className="relative h-48 w-full">
        <Image
          src={item.img}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Card Header */}
      <CardHeader className="py-3">
        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
        <CardDescription className="text-gray-600">
          ${item.price}
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="py-1">
        <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="py-2" >
        <Button asChild variant="link">
          <Link href={`/services/${item._id}`}>
            Details
            <MoveRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
