import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        throw error;
    }
  }

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
}