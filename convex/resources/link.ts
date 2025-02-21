import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    url: v.string(),
    projectId: v.id("projects"),
    icon: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot create resources");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return ctx.db.insert("links", args);
  },
});

export const update = mutation({
  args: {
    _id: v.id("links"),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
    icon: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    console.log("Updating link", args);

    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot update resources");
    }

    const link = await ctx.db.get(args._id);

    if (!link) throw new Error("Link resource not found");

    await ctx.db.patch(args._id, args);

    return args._id;
  },
});

export const remove = mutation({
  args: {
    _id: v.id("links"),
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated user cannot delete resources");
    }

    const link = await ctx.db.get(args._id);

    if (!link) {
      throw new Error("Link resource not found");
    }

    return ctx.db.delete(args._id);
  },
});
