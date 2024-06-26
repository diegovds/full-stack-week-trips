import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import CancelButton from "../CancelButton";

type UserReservationItemProps = {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
};

const UserReservationItem = ({
  reservation,
  reservation: { trip },
}: UserReservationItemProps) => {
  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            {trip && (
              <Image
                className="rounded-lg"
                src={trip.coverImage}
                fill
                style={{ objectFit: "cover" }}
                alt={trip.name}
              />
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip?.name}
            </h2>
            <div className="flex items-center gap-1">
              {trip && <ReactCountryFlag countryCode={trip.countryCode} svg />}
              <p className="text-xs text-grayPrimary underline">
                {trip?.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">
              {format(reservation.startDate, "dd 'de' MMMM", { locale: ptBr })}
            </p>
            {" - "}
            <p className="text-sm">
              {format(reservation.endDate, "dd 'de' MMMM", { locale: ptBr })}
            </p>
          </div>

          <h3 className="mt-5 text-sm">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold text-primaryDarker pt-5 border-t border-solid border-grayLighter">
            Informações sobre o preço
          </h3>

          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm mt-2">Total:</p>
            <p className="font-medium text-sm">
              R${Number(reservation.totalPaid)}
            </p>
          </div>

          <CancelButton reservationId={reservation.id} />
        </div>
      </div>
    </div>
  );
};

export default UserReservationItem;
