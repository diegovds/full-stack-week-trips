"use client";

import Button from "@/components/Button";
import DataPicker from "@/components/DataPicker";
import Input from "@/components/Input";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type TripReservationProps = {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
  tripId: string;
};

type TripReservationForm = {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
};

const TripReservation = ({
  tripId,
  tripStartDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    setError,
  } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (d: TripReservationForm) => {
    await axios
      .post("/api/trips/check", {
        startDate: d.startDate,
        endDate: d.endDate,
        tripId,
      })
      .then(() =>
        router.push(
          `/trips/${tripId}/confirmation?startDate=${d.startDate?.toISOString()}&endDate=${d.endDate?.toISOString()}&guests=${maxGuests}`
        )
      )
      .catch((error) => {
        if (error.response.data.error.code === "TRIP_ALREADY_RESERVED") {
          if (error) {
            setError("startDate", {
              type: "manual",
              message: "Está data já está reservada.",
            });

            setError("endDate", {
              type: "manual",
              message: "Está data já está reservada.",
            });
          }
        }

        if (error.response.data.error.code === "INVALID_START_DATE") {
          if (error) {
            setError("startDate", {
              type: "manual",
              message: "Data inválida.",
            });
          }
        }

        if (error.response.data.error.code === "INVALID_END_DATE") {
          if (error) {
            setError("endDate", {
              type: "manual",
              message: "Data inválida.",
            });
          }
        }
      });
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <form className="flex flex-col px-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatório.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DataPicker
              className="w-full"
              placeholderText="Data Inicial"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              minDate={tripStartDate}
              maxDate={tripEndDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatório.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DataPicker
              className="w-full"
              placeholderText="Data Final"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              minDate={startDate ?? tripStartDate}
              maxDate={tripEndDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}`,
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
        type="number"
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$${differenceInDays(endDate, startDate) * pricePerDay}`
            : "R$0"}
        </p>
      </div>

      <div className="pb-10 border-b border-b-grayLighter w-full">
        <Button disabled={isSubmitting} className="mt-3 w-full">
          Reservar agora
        </Button>
      </div>
    </form>
  );
};

export default TripReservation;
