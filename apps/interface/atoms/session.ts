import { atom } from "jotai";
export const session = atom<{
	token: string;
	email: string;
} | null>();
