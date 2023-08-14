import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import TripDescription from "./components/TripDescription";
import TripHeader from "./components/TripHeader";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";
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
    <div className="container mx-auto lg:px-40">
      <TripHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
            maxGuests={trip.maxGuests}
            pricePerDay={trip.pricePerDay as any}
          />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
