import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type ClientProps = {
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
};

// GET Actions
async function getClients() {
  return NextResponse.json({
    type: "success",
    message: "Success on retrieve clients list",
    code: 202,
  });
}

// POST Actions
export async function createClient(data: ClientProps) {
  try {
    const clientAlreadyInCreated = await prisma.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (clientAlreadyInCreated) {
      return NextResponse.json(
        {
          type: "error",
          message: "Client already in our system",
          code: 409,
        },
        { status: 409 }
      );
    }

    await prisma.client.create({
      data: data,
    });

    return NextResponse.json(
      {
        type: "success",
        message: "Client created successfully",
        code: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

// Handlers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  switch (action) {
    case "getClients":
      return await getClients();
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  switch (action) {
    case "createClient":
      const body = await request.json();
      return await createClient(body);
  }
}
