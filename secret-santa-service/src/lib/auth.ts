import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    try {
        return await bcrypt.hash(password, 15);
    } catch (error) {
        console.error("Error generating hashed password", error);
        // TODO: create a custom error class
        const hashingError = new Error("Error hashing password");
        hashingError.name = "HashingError";
        throw hashingError;
    }
}
