import { atom } from "jotai";

export const orgActiveAtom = atom<{
	name: "somato" | "blipkart";
	env: "food" | "eCom";
	style: string;
}>();
