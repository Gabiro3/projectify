import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { ProjectStatus, TaskPriority, TaskStatus, TaskType } from "./types";
import { icons } from "lucide-react";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: ProjectStatus,
    team: v.array(v.string()),
    creatorId: v.string(),
    creatorName: v.optional(v.string()),
    orgId: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),

  workItems: defineTable({
    assigneeId: v.id("users"),
    assignee: v.string(),
    label: TaskType,
    priority: TaskPriority,
    projectId: v.id("projects"),
    status: TaskStatus,
    title: v.string(),
    description: v.optional(v.string()),
  })
    .index("by_project", ["projectId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["projectId"],
    }),
  tasks: defineTable({
    userId: v.optional(v.string()),             // Reference to the user who owns the task
    projectId: v.id("projects"), // Optional reference to a project
    status: TaskStatus,                // Status of the task (todo, in_progress, done)
    title: v.string(),                 // Title of the task
    description: v.string(), 
    priority: TaskPriority,
    type: TaskType
  })
    .index("by_project", ["projectId"])     // Index for querying tasks by project
    .searchIndex("search_title", {          // Search index for querying tasks by title
      searchField: "title",
      filterFields: ["projectId"],
    }),

  users: defineTable({
    email: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  })
    .index("by_clerk", ["clerkId"])
    .index("by_email", ["email"]),

  teams: defineTable({
    name: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    createdBy: v.id("users"),
  })
    .index("by_clerkId", ["clerkId"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["clerkId"],
    }),

  team_memberships: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    isAdmin: v.boolean(),
  })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_user", ["teamId", "userId"]),

  links: defineTable({
    title: v.string(),
    url: v.string(),
    icon: v.optional(v.id("_storage")),
    projectId: v.id("projects"),
  })
    .index("by_project", ["projectId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["projectId"],
    }),

  files: defineTable({
    title: v.string(),
    storageId: v.id("_storage"),
    projectId: v.id("projects"),
    type: v.string(),
  })
    .index("by_project", ["projectId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["projectId"],
    }),
});
