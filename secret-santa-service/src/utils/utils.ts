export function encodeBase64(plainText: string): string {
    return Buffer.from(plainText, "utf-8").toString("base64");
}

export function decodeBase64(encodedString: string): string {
    return Buffer.from(encodedString, "base64").toString("utf8");
}
