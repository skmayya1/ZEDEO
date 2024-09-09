'use client';
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import imgurl from "@/assets/logo.png";
import { PiSignOut } from "react-icons/pi";



const Navbar = ({ session }: { session: Session | null }) => {
  const location = usePathname();
  const sessionName:string|null = session?.user?.name ?? null;
  const logoName = session ? (sessionName?.charAt(0).toUpperCase() ?? 's') : 's';
  const isDashboard = location === '/dashboard';

  return (
    <div className="text-white h-24 flex items-center justify-between px-5 sm:justify-around sm:px-0 sm:">
      <Image src={imgurl} alt="ZEDEO" width={100} height={100} onError={(e) => (e.currentTarget.src = '/fallback-image.png')} />
      <div className="flex gap-5 items-center">
        <Link href="/docs" aria-label="Docs">
          <p className="font-medium text-sm hover:underline cursor-pointer hidden sm:block">Docs</p>
        </Link>
        <Link href="/pricing" aria-label="Pricing">
          <p className="font-medium text-sm hover:underline cursor-pointer  hidden sm:block">Pricing</p>
        </Link>
        <Link href="/contact" aria-label="Contact us">
          <p className="font-medium text-sm hover:underline cursor-pointer  hidden sm:block ">Contact us</p>
        </Link>
        {!session ? (
          <Button className="bg-white text-black hover:bg-slate-50 transition-all ease-in-out duration-300">
            Get Started - Its free
          </Button>
        ) : !isDashboard ? (
          <Link href='/dashboard'>
            <Button className="bg-white text-black  hover:bg-slate-50 transition-all ease-in-out duration-300">
              Dashboard
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
  <DropdownMenuTrigger aria-label="Account menu">
                  <Avatar>
                    <AvatarFallback>{logoName}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem aria-label="Sign out">
                  <Link href='/auth/signout' className='text-red-400 flex items-center gap-3'>Sign Out <PiSignOut/></Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
          </DropdownMenu>

        )}

      </div>
    </div>
  );
};

export default Navbar;
