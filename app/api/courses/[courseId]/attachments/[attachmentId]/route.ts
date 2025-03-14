import { db } from "@/lib/db";
import { useCurrentUser } from "@/actions/use-current-user";
import { NextResponse } from "next/server";

/* 
	These params will came from a delete req from attachment-form.tsx
*/
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const currentUser = await useCurrentUser();
    const userId = currentUser?.id;

    /* 
			Check if there's a logged in user (authentication)
		*/
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /* 
			Check if the user creating an attachment for a course is
			the owner of the course (authorization)
		*/
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
