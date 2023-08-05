import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserReservationItem from "./components/UserReservationItem";

const MyTrips = async () => {
  const user = await getServerSession(authOptions);

  if (!user) redirect("/");

  const userTrips = await prisma.tripReservation
    .findMany({
      where: {
        userId: (user?.user as any)?.id,
      },
      include: {
        trip: true,
      },
    })
    .finally(() => prisma.$disconnect);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas viagens
      </h1>
      {userTrips.map((userTrip) => (
        <UserReservationItem key={userTrip.id} reservation={userTrip} />
      ))}
    </div>
  );
};

export default MyTrips;
