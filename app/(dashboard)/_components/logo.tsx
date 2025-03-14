import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Atom } from "lucide-react";
import Link from "next/link";
const Logo = () => {
  // return <Image height={130} width={130} alt="logo" src="/logo.svg" />;
  return (
    <>
      <div className="flex gap-2 items-center">
        <Avatar className="bg-slate-200 dark:bg-black flex items-center justify-center">
          <Atom className="text-[#FFA500]" />
        </Avatar>
        <Link href="/" className="tracking-widest ">
          REAKTORLMS
        </Link>
      </div>
    </>
  );
};

export default Logo;
