import GroupType from '@/types/GroupType';
import { z } from 'zod';

const groupSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Group name can\'t be empty'),
    createdAt: z.date()
});

const validateGroup = async (group: GroupType) => {
    return await groupSchema.safeParseAsync(group);
}

export default validateGroup;