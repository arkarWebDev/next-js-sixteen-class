import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export const FAKE_POSTS = [
  {
    title: "First post",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, maiores. Quos unde voluptatum omnis corporis autem maiores quam. Maxime, veritatis possimus voluptatibus a vitae molestiae officia sequi illum expedita nobis?",
  },
  {
    title: "Second post",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, maiores. Quos unde voluptatum omnis corporis autem maiores quam. Maxime, veritatis possimus voluptatibus a vitae molestiae officia sequi illum expedita nobis?",
  },
  {
    title: "Third post",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, maiores. Quos unde voluptatum omnis corporis autem maiores quam. Maxime, veritatis possimus voluptatibus a vitae molestiae officia sequi illum expedita nobis?",
  },
];

const seed = async () => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: FAKE_POSTS,
  });
  console.log("database seeded...");
};

seed();
