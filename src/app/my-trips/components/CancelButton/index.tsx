"use client";

import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CancelButtonProps = {
  reservationId: string;
};

const CancelButton = ({ reservationId }: CancelButtonProps) => {
  const router = useRouter();

  const handleDeleteTrip = async () => {
    await axios
      .delete(`/api/trips/reservation/${reservationId}`)
      .then(() => {
        toast.success("Reserva deletada com sucesso!", {
          position: "bottom-center",
        });
        router.refresh();
      })
      .catch(() =>
        toast.error("Ocorreu um erro ao cancelar a reserva!", {
          position: "bottom-center",
        })
      );
  };

  return (
    <Button variant="danger" className="mt-5" onClick={handleDeleteTrip}>
      Cancelar
    </Button>
  );
};

export default CancelButton;
