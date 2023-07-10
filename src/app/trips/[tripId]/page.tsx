import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import TripDescription from "./components/TripDescription";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";

type TripProps = {
  params: {
    tripId: string;
  };
};

const getTripDetail = async (tripId: string) => {
  const trip = await prisma.trip
    .findUniqueOrThrow({
      where: { id: tripId },
    })
    .finally(() => prisma.$disconnect);

  return trip;
};

const TripDetails = async ({ params: { tripId } }: TripProps) => {
  const trip: Trip = await getTripDetail(tripId);

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
    </div>
  );
};

export default TripDetails;
