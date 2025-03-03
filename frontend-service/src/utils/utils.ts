import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function encodeBase64(plainText: string): string {
    return window.btoa(plainText);
}

export function decodeBase64(encodedString: string): string {
    return window.atob(encodedString);
}
