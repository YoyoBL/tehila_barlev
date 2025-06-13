/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
      },
   },
   // plugins: [require("daisyui")],
   // daisyui: {
   //    themes: [
   //       {
   //          light: {
   //             ...require("daisyui/src/theming/themes")["light"],
   //             primary: "black",
   //             secondary: "#FFF1EB",
   //             "secondary-content": "black",
   //             neutral: "#9ca3af",
   //             "neutral-content": "black",
   //             "base-200": "#FFF1EB",
   //             "--rounded-box": "2rem",
   //             "--rounded-btn": "0.6rem",
   //          },
   //       },
   //    ],
   // },
};
