"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { status, data } = useSession();

  const handleLoginClick = () => signIn();

  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className="container mx-auto px-5 py-0 h-[93px] flex justify-between items-center">
      <Link href="/">
        <div className="relative h-[32px] w-[182px]">
          <Image src="/logo.png" alt="Full Stack Week logo." fill />
        </div>
      </Link>

      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
      {status === "authenticated" && data.user?.image && data.user.name && (
        <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full py-2 px-3 relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />

          <Image
            src={data.user.image}
            alt={`Foto de perfil do ${data.user.name}`}
            width={35}
            height={35}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <button
                className="text-primary text-sm font-semibold"
                onClick={handleLogoutClick}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
