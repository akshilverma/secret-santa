import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
	try {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	} catch (error) {
		console.error("Error generating hashed password", error);
		throw new Error("Error hashing password");
	}
}
