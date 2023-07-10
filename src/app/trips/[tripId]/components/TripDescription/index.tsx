type TripDescriptionProps = {
  description: string;
};

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="felx flex-col p-5">
      <h2 className="font-semibold text-primaryDarker">Sobre a Viagem</h2>
      <p className="text-xs leading-5 text-primaryDarker mt-1">{description}</p>
    </div>
  );
};

export default TripDescription;
