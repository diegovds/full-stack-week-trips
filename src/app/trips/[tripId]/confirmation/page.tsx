"use client";

import Button from "@/components/Button";
import { Trip } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

type TripProps = {
  params: {
    tripId: string;
  };
};

const TripConfirmation = ({ params: { tripId } }: TripProps) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const searchParams = useSearchParams();

  const router = useRouter();

  const { status, data } = useSession();

  useEffect(() => {
    const getTrip = async () => {
      await axios
        .post("/api/trips/check", {
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          tripId,
        })
        .then((res) => {
          setTrip(res.data.trip);
          setTotalPrice(res.data.totalPrice);
        })
        .catch((err) => {
          if (err.response.data.error.code === "INVALID_START_DATE") {
            router.push("/");
          }
        });
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    getTrip();
  }, [tripId, searchParams, router, status]);

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  const handleBuyClick = async () => {
    await axios
      .post("/api/payment", {
        tripId,
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
        guests: Number(guests),
        totalPrice,
        coverImage: trip?.coverImage,
        name: trip?.name,
        description: trip?.description,
      })
      .then(async (res) => {
        //router.push("/");

        const { sessionId } = res.data;

        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_KEY as string
        );

        await stripe?.redirectToCheckout({ sessionId });

        toast.success("Reserva realizada com sucesso!", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao realizar a reserva!", {
          position: "bottom-center",
        });
      });
  };

  return (
    <div className="container mx-auto p-5 lg:max-w-[600px]">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

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

        <h3 className="font-semibold text-lg text-primaryDarker mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-1">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBr })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBr })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
