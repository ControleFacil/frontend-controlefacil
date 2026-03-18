import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/cfLogo.png"
          alt="Controle Facil"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="font-bold text-lg text-purple-600">
          Controle Fácil
        </span>
      </Link>

    </header>
  );
}