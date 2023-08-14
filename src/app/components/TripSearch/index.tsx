"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DataPicker from "@/components/DataPicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type TripSearchForm = {
  text: string;
  startDate: Date | null;
  budget: number;
};

const TripSearch = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TripSearchForm>();

  const router = useRouter();

  const onSubmit = (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${
        data.text
      }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`
    );
  };

  return (
    <form
      className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">
        Encontre o sua próxima <span className="text-primary">viagem</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[940px] lg:mx-auto lg:p-4 lg:bg-primary lg:mt-12 lg:bg-opacity-20 lg:rounded-lg">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text", {
            required: {
              value: true,
              message: "Texto obrigatório",
            },
          })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DataPicker
                className="w-full"
                placeholderText="Data Final"
                onChange={field.onChange}
                selected={field.value}
                minDate={new Date()}
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button className="w-1/2 lg:h-fit" disabled={isSubmitting}>
          Buscar
        </Button>
      </div>
    </form>
  );
};

export default TripSearch;
