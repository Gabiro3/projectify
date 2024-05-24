"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTaskModal } from "@/lib/store/use-task-modal";

import { ChevronDown, File, Link } from "lucide-react";
import { useParams } from "next/navigation";

const AddButton = () => {
  const params = useParams();

  const { onOpen } = useTaskModal();




  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ size: "sm" })}>
        Add Task <ChevronDown className="w-4 h-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onOpen()}>
          <Link className="w-4 h-4 mr-2" /> Add Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen()}
        >
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddButton;