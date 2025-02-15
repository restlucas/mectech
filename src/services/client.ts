const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_API_URL
    : "http://localhost:3000/api";

type FormProps = {
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
};

export const createClient = async (form: FormProps) => {
  try {
    const response = await fetch(`${baseUrl}/client?action=createClient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message} (Status: ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating client:", error.message);
      return { error: error.message };
    }
  }
};
