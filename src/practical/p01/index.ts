import axios from "axios";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type UserResult = {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
};

type ApiUser = {
  id: number;
  name: string;
  phone: string;
  address: Address;
};

export async function getPostalAddress(): Promise<UserResult[]> {
  try {
    const response = await axios.get<ApiUser[]>("https://jsonplaceholder.typicode.com/users");

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      // กฎ: ถ้าไม่มี address ให้เป็น null
      address: user.address ? user.address : null,
    }));

  } catch {
    // กฎ Subject 1: กรณี Error ปกติให้คืนค่า Array ว่าง (ต่างจาก Subject 4 ที่ต้องแจ้งเตือน)
    return [];
  }
}