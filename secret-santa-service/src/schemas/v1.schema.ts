import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(64),
    email: z.string().email(),
    password: z.string().base64(), // validate password pattern in the frontend service
    confirm: z.string().base64(), // validate password pattern in the frontend service
});

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|[\]\\:";'<>?,./])[A-Za-z\d!@#$%^&*()_+-={}|[\]\\:";'<>?,./]{8,}$/;
export const passwordSchema = z
    .string()
    .regex(passwordRegex, "Incorrect password format");
