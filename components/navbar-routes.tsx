"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";
import { isTeacher } from "@/lib/teacher";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { useCurrentUser } from "@/actions/use-current-user";

/*
    The SearchInput component will only appear if the
    user is in the /search path 
*/
const NavbarRoutes = ({ currentUser }: any) => {
  const userId = currentUser?.id || "userId";

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  console.log("isTeacher(userId)", isTeacher(userId));

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserNav user={currentUser} />
      </div>
    </>
  );
};

export default NavbarRoutes;
