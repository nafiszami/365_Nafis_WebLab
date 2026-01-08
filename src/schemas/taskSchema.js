const { z } = require('zod');

const createTaskSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'active', 'done']).default('pending'),
    priority: z.number().int().min(1).max(5),
    due_date: z.string().refine(val => !Number.isNaN(Date.parse(val)), { message: 'Invalid date' }).optional()
});

const updateTaskSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'active', 'done']).optional(),
    priority: z.number().int().min(1).max(5).optional(),
    due_date: z.string().refine(val => !Number.isNaN(Date.parse(val)), { message: 'Invalid date' }).optional()
});

module.exports = { createTaskSchema, updateTaskSchema };




