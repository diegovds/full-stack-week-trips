import { prisma } from "@/lib/prisma";
import { differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  tripId: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { tripId, startDate, endDate } = bodySchema.parse(body);

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      }),
      {
        status: 400,
      }
    );
  }

  if (isBefore(new Date(startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }

  // Data de fim recebida precisa ser menor ou igual a data de fim da viagem
  if (isBefore(new Date(trip.endDate), new Date(endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: tripId,
      // VERIFICA SE EXISTE RESERVA ENTRE AS DATAS
      startDate: {
        lte: new Date(endDate),
      },
      endDate: {
        gte: new Date(startDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      }),
      {
        status: 400,
      }
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice:
        differenceInDays(new Date(endDate), new Date(startDate)) *
        Number(trip.pricePerDay),
    })
  );
}
