import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const generateRandomPhone = () => {
    const phonePrefix = "(00)"; // Código do Brasil
    const phoneNumber = Math.floor(Math.random() * 1000000000);
    return `${phonePrefix} ${phoneNumber}`;
  };

  const generateRandomBirth = () => {
    const year = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1980;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Evitar erro no dia
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