import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import DeleteBookingButton from "@/app/my-bookings/components/DeleteBookingButton";
import { Button } from "../ui/button";
import Link from "next/link";

const BookingsTable = ({ data }) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                <Image
                  className="rounded-lg"
                  src={item.service_img}
                  width={150}
                  height={150}
                  alt={item.service_name}
                />
              </TableCell>
              <TableCell className="font-bold">{item.service_name}</TableCell>
              <TableCell>${item.service_price}</TableCell>
              <TableCell className="text-right">{item.date}</TableCell>
              <TableCell className="text-right">
                <Link href={`/my-bookings/${item._id}`}>
                  <Button>Update</Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <DeleteBookingButton id={item._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
