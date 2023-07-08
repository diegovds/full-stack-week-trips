import SearchIcon from "../SearchIcon";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter" />
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter" />
      </div>

      <div className="flex w-full justify-between mt-5">
        <SearchIcon image="/hotel-icon.png" text="Hotel" />
        <SearchIcon image="/farm-icon.png" text="Fazenda" />
        <SearchIcon image="/cottage-icon.png" text="Chalé" />
        <SearchIcon image="/inn-icon.png" text="Pousada" />
      </div>
    </div>
  );
};

export default QuickSearch;
