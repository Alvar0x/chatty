import UserType from "@/types/server/UserType";
import { ObjectId } from "mongodb";
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(5, "Username must have between 5 and 15 characters at least").max(15, "Username must have between 5 and 15 characters at least"),
    email: z.string().email(),
    password: z.string().min(6, "Password must have 6 characters at least"),
    image: z.string(),
    groups: z.array(
        z.object({
            _id: z.instanceof(ObjectId)
        })
    ),
    createdAt: z.date()
});

const validateUser = async (user: UserType) => {
    return await userSchema.safeParseAsync(user);
}

export default validateUser;