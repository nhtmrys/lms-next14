import { Chapter, Course, UserProgress } from "@prisma/client";

import NavbarRoutes from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { useCurrentUser } from "@/actions/use-current-user";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = async ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  const currentUser = await useCurrentUser();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        currentUser={currentUser}
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
};
