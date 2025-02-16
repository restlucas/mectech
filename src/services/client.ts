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

export const getClientsList = async (page: number, search: string) => {
  try {
    const response = await fetch(`${baseUrl}/client?action=getClients&page=${page}&search=${search}`, {
      method: 'GET'
    })

    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getClient = async(clientId: string) => {
  try {
    const response = await fetch(`${baseUrl}/client?action=getClient&clientId=${clientId}`, {
      method: 'GET'
    })
    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

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

export const updateClient = async(clientId: string, form: FormProps) => {
  try {
    const response = await fetch(`${baseUrl}/client?action=updateClient&clientId=${clientId}`, {
      method: "PUT",
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
}

export const deleteClient = async(clientId: string[]) => {
  try {
    const response = await fetch(`${baseUrl}/client?action=deleteClient`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientId)
    })

    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}