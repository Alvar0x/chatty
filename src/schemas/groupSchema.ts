import GroupType from '@/types/server/GroupType';
import { z } from 'zod';
import { ObjectId } from 'mongodb';

const groupSchema = z.object({
    name: z.string().min(1, 'Group name can\'t be empty'),
    createdAt: z.date()
});

const validateGroup = async (group: GroupType) => {
    return await groupSchema.safeParseAsync(group);
}

export default validateGroup;