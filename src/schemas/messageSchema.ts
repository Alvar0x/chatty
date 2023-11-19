import MessageType from "@/types/MessageType";
import { z } from "zod";

const messageSchema = z.object({
    id: z.string().uuid().optional(),
    content: z.string().min(1, "The message can't be empty"),
    groupId: z.string().uuid(),
    userId: z.string().uuid(),
    createdAt: z.date()
});

const validateMessage = async (message: MessageType) => {
    return await messageSchema.safeParseAsync(message);
}

export default validateMessage;