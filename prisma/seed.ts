import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const generateRandomPhone = () => {
  const phonePrefix = Math.floor(Math.random() * 90) + 10; 
  const phoneNumber = Math.floor(Math.random() * 1000000000); 
  const formattedPhoneNumber = phoneNumber.toString().padStart(9, '0'); 
  return `(${phonePrefix}) ${formattedPhoneNumber.slice(0, 5)}-${formattedPhoneNumber.slice(5)}`;
};

const generateRandomBirth = () => {
  const year = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1980;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const generateRandomAddress = () => {
  const streets = ["Rua A", "Rua B", "Rua C", "Avenida X", "Avenida Y"];
  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  return `${randomStreet} - Bairro Centro`;
};

const seed = async () => {
  const clients = Array.from({ length: 20 }).map(() => ({
    name: `Client ${Math.random().toString(36).substring(2, 7)}`,
    email: `client${Math.random().toString(36).substring(2, 7)}@example.com`,
    phone: generateRandomPhone(),
    birth: generateRandomBirth(),
    address: generateRandomAddress(),
  }));

  for (const client of clients) {
    await prisma.client.create({
      data: client,
    });
  }

  console.log('20 clients created');
  await prisma.$disconnect();
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});