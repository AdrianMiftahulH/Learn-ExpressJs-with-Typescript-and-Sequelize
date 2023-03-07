import bcrypt from 'bcrypt';

// Membuat fun Password Hash
const PasswordHashing = async (password:string): Promise<string> => {
    // Membuat password hashing dengan bcrypt
    const result = await bcrypt.hash(password, 10);
    return result;
}

// Membandingkan password di req.body dengan password di database
const PasswordCompare = async (password:string, passwordHash: string): Promise<boolean> => {
    const matched = await bcrypt.compare(password, passwordHash);

    return matched
}

export default {PasswordHashing, PasswordCompare};