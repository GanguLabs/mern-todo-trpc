import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";

export const todoRouter = trpc.router({
    list: trpc.procedure.query(()=>{
        // const todos = await prisma.todo.findMany();
        // return todos;

        return prisma.todo.findMany();
    }),
    create: trpc.procedure.input(z.object({title: z.string()}))
    .mutation(({input})=>{
        const title = input.title;

        return prisma.todo.create({
            data: {
                title,
                isCompleted: false
            }
        })
    }),
    delete: trpc.procedure.input(z.object({id: z.string()}))
    .mutation(({input})=>{
        const id = input.id;

        return prisma.todo.delete({
            where: {
                id
            }
        })
    }),
    update: trpc.procedure.input(z.object({id: z.string(), isCompleted: z.boolean()}))
    .mutation(({input})=>{
        const id = input.id;

        return prisma.todo.update({
            where: {
                id
            },
            data:{
                isCompleted: input.isCompleted
            }
        })
    }),
});
