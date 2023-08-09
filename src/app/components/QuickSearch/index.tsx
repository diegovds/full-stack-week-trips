import Link from "next/link";
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
        <Link href={`/trips/search?text=hotel`}>
          <SearchIcon image="/hotel-icon.png" text="Hotel" />
        </Link>
        <Link href={`/trips/search?text=fazenda`}>
          <SearchIcon image="/farm-icon.png" text="Fazenda" />
        </Link>
        <Link href={`/trips/search?text=chalé`}>
          <SearchIcon image="/cottage-icon.png" text="Chalé" />
        </Link>
        <Link href={`/trips/search?text=pousada`}>
          <SearchIcon image="/inn-icon.png" text="Pousada" />
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
