import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-walterWhite p-5 flex flex-col items-center justify-center">
      <div className="relative h-[23px] w-[133px]">
        <Image src="/logo.png" alt="Full Stack Week logo." fill />
      </div>
      <p className="text-sm font-medium text-primaryDarker mt-1">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
