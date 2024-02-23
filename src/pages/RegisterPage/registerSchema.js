import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório!"),
    email: z.string().min(1, "O email é obrigatório!").email("Insira um email válido!"),
    password: z.string().min(8, "Insira pelo menos 8 caracteres!")
    .regex(/(?=.*?[A-Z])/, "Insira pelo menos uma letra maiúscula!")
    .regex(/(?=.*?[a-z])/, "Insira pelo menos uma letra minúscula!")
    .regex(/(?=.*?[0-9])/, "Insira pelo menos um número!"),
    confirmPassword: z.string().min(1, "Confirmar a senha é obrigatório!"),
    bio: z.string().min(1, "A bio é obrigatória!"),
    contact: z.string().min(1, "O contato é obrigatório!"),
    course_module: z.string().min(1, "O módulo é obrigatório!")
}).refine(({password, confirmPassword}) => password === confirmPassword, {
    message: "As senhas precisam ser idênticas!",
    path: ["confirmPassword"]
});