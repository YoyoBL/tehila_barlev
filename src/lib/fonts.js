import { Playfair_Display, Assistant, Pinyon_Script } from "next/font/google";

export const playFairDisplay = Playfair_Display({
   weight: ["500"],
   subsets: ["latin"],
});

export const assistant = Assistant({
   subsets: ["latin"],
   weight: ["300", "400", "600"],
});

export const pinyon = Pinyon_Script({
   subsets: ["latin"],
   weight: ["400"],
});
