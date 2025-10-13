"use client";

import React from "react";
import LandingHero from "@/components/layout/LandingHero";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex bg-white overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-purple-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl"></div>

      {/* Conteúdo principal */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 relative z-10">
        <LandingHero />
      </div>

      {/* Imagem lateral */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10">
        <Image
          src="/assets/app-mockup.svg"
          alt="App ControleFácil"
          width={750}
          height={500}
          className="object-contain select-none pointer-events-none"
          priority
        />
      </div>
    </div>
  );
};

export default LandingPage;
