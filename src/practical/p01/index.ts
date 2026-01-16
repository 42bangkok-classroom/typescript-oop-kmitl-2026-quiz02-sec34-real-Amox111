import axios from "axios";

interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface ApiUser {
    id: number;
    name: string;
    phone: string;
    address: Address;
}

interface UserResult {
    id: number;
    name: string;
    phone: string;
    address: Address | null;
}

const filterUserById = async (id: number): Promise<UserResult | string> => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get<ApiUser[]>(url);
    const foundUser = response.data.find((u) => u.id === id);

    if (!foundUser) {
      return "Invalid id";
    }

    return {
      id: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
      address: foundUser.address || null
    };

  } catch (error) {
    return "Invalid id";
  }
};

export default filterUserById;