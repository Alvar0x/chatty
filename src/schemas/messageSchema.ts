import MessageType from "@/types/server/MessageType";
import { ObjectId } from "mongodb";
import { z } from "zod";

const messageSchema = z.object({
    content: z.string().min(1, "The message can't be empty"),
    groupId: z.instanceof(ObjectId),
    userId: z.instanceof(ObjectId),
    createdAt: z.date()
});

const validateMessage = async (message: MessageType) => {
    return await messageSchema.safeParseAsync(message);
}

export default validateMessage;