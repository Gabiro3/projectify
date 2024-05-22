import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { TaskStatus } from "./types";

// Create a new task
export const createTask = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    status: TaskStatus,
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const taskId = await ctx.db.insert("tasks", {
      userId: args.userId,
      projectId: args.projectId,
      status: args.status,
      title: args.title,
      description: args.description,
    });

    return taskId;
  },
});

// Retrieve a task by ID
export const getTask = query({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  },
});

// Remove a task by ID
export const removeTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return "Task removed";
  },
});

// Update an existing task
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.string(),
    description: v.optional(v.string()),
    status: TaskStatus,
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      status: args.status,
    });
    return "Task updated";
  },
});

