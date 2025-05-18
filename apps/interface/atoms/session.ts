import { atom } from "jotai";
export const session = atom<{
	userId: string;
	email: string;
	name: string;
} | null>();
