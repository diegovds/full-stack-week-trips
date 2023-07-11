"use client";

import Button from "@/components/Button";
import DataPicker from "@/components/DataPicker";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";

type TripReservationProps = {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
};

type TripReservationForm = {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
};

const TripReservation = ({
  tripStartDate,
  tripEndDate,
  maxGuests,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const startDate = watch("startDate");

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
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
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
