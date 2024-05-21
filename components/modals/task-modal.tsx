import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(50),
  description: z.string().optional(),
  assigneeId: z.string(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"]),
  priority: z.enum(["low", "medium", "high"]),
  type: z.enum(["documentation", "bug", "feature"]),
});

const TaskModal = () => {
  // Manage the task modal state.
  const { isOpen, onClose, values } = useTaskModal();

  const params = useParams();

  const { mutate: createTask, isPending: isCreating } = useApiMutation(
    api.work_item.create
  );

  const { mutate: updateWorkItem, isPending: isUpdating } = useApiMutation(
    api.work_item.update
  );

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      id: values?._id ?? "",
      title: values?.title ?? "",
      assigneeId: "dummyAssigneeId",
      status: values?.status ?? "todo",
      priority: values?.priority ?? "low",
      type: values?.label ?? "feature",
      description: values?.description ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const taskObject = {
      title: values.title,
      description: values.description,
      assignee: "Dummy Assignee",
      assigneeId: "dummyAssigneeId" as Id<"users">,
      status: values.status,
      priority: values.priority,
      label: values.type,
      projectId: params.id as Id<"projects">,
    };

    if (values?.id) {
      updateWorkItem({
        _id: values.id as Id<"workItems">,
        ...taskObject,
      });
    } else {
      createTask(taskObject);
    }

    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{values?._id ? "Edit" : "Create"} Work item</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summary of the work" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="Assignee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input placeholder="Priority" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isCreating || isUpdating}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;