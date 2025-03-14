import { db } from "@/lib/db";
import { useCurrentUser } from "@/actions/use-current-user";
import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const currentUser = await useCurrentUser();
  const userId = currentUser?.id;

  // if (!userId) {
  //   return redirect("/");
  // }

  /*
        Find all the courses created by the   
        user logged in and sort by most recent
    */
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
