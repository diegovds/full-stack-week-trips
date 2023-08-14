import Button from "@/components/Button";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">
        Minhas viagens
      </h1>
      {userTrips.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
          {userTrips.map((userTrip) => (
            <UserReservationItem key={userTrip.id} reservation={userTrip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:max-w-[300px]">
          <p className="font-medium text-primaryDarker mt-2">
            Você não tem nenhuma reserva ! ☹️
          </p>
          <Link href="/">
            <Button className="w-full mt-2 lg:mt-5">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
