"use client";

import { ElementRef, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/kanban/create-board";
import { useProModal } from "@/hooks/use-pro-modal";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
  team: any;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const initialStatuses = [
  { id: "notStarted", name: "Not Started", statuses: ["To Do"] },
  { id: "inprogress", name: "Active", statuses: ["In Progress"] },
  { id: "done", name: "Done", statuses: ["Done"] },
  { id: "closed", name: "Closed", statuses: ["Complete"] },
];

export const FormPopover = ({
  team,
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { toast } = useToast();
  const [statuses, setStatuses] = useState(initialStatuses);
  const [selectedStatuses, setSelectedStatuses] = useState(initialStatuses);
  const [showStatusPopover, setShowStatusPopover] = useState(false);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast({
        title: "Başarılı.",
        description: "Tablo başarıyla oluşturuldu.",
      });
      closeRef.current?.click();
      router.push(`/dashboard/board/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Hata.",
        description: "İşlem sırasında bir hata oluştu",
      });
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image, statuses: selectedStatuses, team: team });
  };

  const addStatus = (categoryId: string) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((category) =>
        category.id === categoryId
          ? { ...category, statuses: [...category.statuses, "New Status"] }
          : category
      )
    );
  };

  const updateStatus = (
    categoryId: string,
    index: number,
    newStatus: string
  ) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              statuses: category.statuses.map((status, i) =>
                i === index ? newStatus : status
              ),
            }
          : category
      )
    );
  };

  const applyStatusChanges = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the form submit
    setSelectedStatuses(statuses);
    setShowStatusPopover(false); // Close the workflow popover
  };

  // Prevent form submit when opening the status popover
  const handleSelectWorkflowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the form submit
    setShowStatusPopover(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-full max-w-md p-4"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Yeni tablo oluştur
        </div>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Tablo Adı"
              type="text"
              errors={fieldErrors}
            />
            {/* Workflow Status Selector */}
            <div>
              <Button
                variant="outline"
                onClick={handleSelectWorkflowClick} // Use the custom handler
                className="w-full"
              >
                Select Workflow Statuses
              </Button>
              {showStatusPopover && (
                <PopoverContent className="w-full max-w-md p-4 ">
                  <div className="text-center text-gray-600 font-medium mb-4">
                    Workflow Statuses
                  </div>
                  {statuses.map((category) => (
                    <div key={category.id} className="space-y-2 mb-4">
                      <div className="font-semibold text-gray-700">
                        {category.name}
                      </div>
                      {category.statuses.map((status, index) => (
                        <input
                          key={index}
                          value={status}
                          onChange={(e) =>
                            updateStatus(category.id, index, e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border rounded-md mb-1"
                        />
                      ))}
                      <Button
                        variant="ghost"
                        className="text-blue-500 text-sm"
                        onClick={() => addStatus(category.id)}
                      >
                        + Add status
                      </Button>
                    </div>
                  ))}
                  <Button onClick={applyStatusChanges} className="w-full mt-4">
                    Apply changes
                  </Button>
                </PopoverContent>
              )}
            </div>
          </div>

          <FormSubmit className="w-full">Kaydet</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
