import TaskPriority from "@/components/task/task-priority";
import TaskStatus from "@/components/task/task-status";
import TaskTitle from "@/components/task/task-title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { Edit } from "lucide-react";
import AddButton from "@/components/task/add-button";

type OwnedTaskTableProps = {
  
  tasks: Doc<"tasks">[];
};

const OwnedTaskTable = ({ tasks }: OwnedTaskTableProps) => {
   const { onOpen } = useTaskModal();
  if (tasks.length === 0) return <NoTask />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-64">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <AddButton />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell className="truncate max-w-[300px]">
              <TaskTitle title={task.title} type={task.type}/>
            </TableCell>
            <TableCell>
              <TaskStatus status={task.status} />
            </TableCell>
            <TableCell>
              <TaskPriority priority={task.priority} />
            </TableCell>
            <TableCell>
              <Edit className="w-4 h-4" onClick={() => onOpen({ _id: task._id, title: task.title, priority: task.priority, status: task.status, type: task.type, description: "Task Desc", projectId: task.projectId })}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OwnedTaskTable;

const NoTask = () => {
  const { onOpen } = useTaskModal();

  return (
    <div className="h-48 bg-foreground/5 rounded-md flex items-center justify-center flex-col gap-3 border-dashed border-4">
      <h3 className="">There are no task assigned</h3>
      <Button size="sm" onClick={() => onOpen()}>
        Add Task
      </Button>
    </div>
  );
};
