import UserType from "@/types/UserType";
import { z } from "zod";

const userSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(5, "Username must have between 5 and 15 characters").max(15, "Username must have between 5 and 15 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must have 6 characters at least"),
    image: z.string().optional(),
    createdAt: z.date()
});

const validateUser = async (user: UserType) => {
    return await userSchema.safeParseAsync(user);
}

export default validateUser;