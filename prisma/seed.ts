const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function generateDresses(numOfDresses: any) {
   const dresses = [];
   for (let i = 1; i < numOfDresses; i++) {
      const randomNum = Math.floor(Math.random() * 2);
      dresses.push({
         title: `שמלה ${i}`,
         price: "600",
         coverIndex: randomNum,
         sizes: ["36", "38"],
         tags: ["מחוך", "טול"],
         images: [
            "4df1d21a-8693-4237-9413-6ac01f607f70",
            "345fa5bc-6453-4d24-a989-dc9c2c3831e9",
         ],
      });
   }
   return dresses;
}

async function main() {
   console.log("Seed starts...");
   const dresses = generateDresses(8);
   console.log(dresses);

   const res = await prisma.dress.createMany({ data: dresses });
   console.log(res);

   console.log("Seed ends.");
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
