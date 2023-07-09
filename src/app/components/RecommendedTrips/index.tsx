import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany().finally(() => prisma.$disconnect);

  return trips;
};

const RecommendedTrips = async () => {
  const trips = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter" />
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter" />
      </div>

      <div className="flex flex-col items-center mt-5 gap-5">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
