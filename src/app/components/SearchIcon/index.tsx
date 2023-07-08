import Image from "next/image";

type SearchIconProps = {
  image: string;
  text: string;
};

const SearchIcon = ({ image, text }: SearchIconProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image src={image} alt={text} width={35} height={35} />
      <p className="text-sm text-grayPrimary">{text}</p>
    </div>
  );
};

export default SearchIcon;
