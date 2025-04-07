interface Address {
    city: string;
    country: string;
    id: string;
    neighborhood: string;
    postalCode: string;
    street: string;
    state: string;
    streetNumber: string;
    title: string;
}

interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    CPF: string;
    identificationNumber: string;
    cellPhone: string;
    landline: string | null;
    dateOfBirth: string;
    gender: string | null;
    civilStatus: string | null;
    twoFactorEnabled: boolean;
    cellPhoneValidated: boolean;
}

interface Order {
    capturedValue: number;
    subtotal: number;
    totalCost: number;
    status: string;
    orderId: string;
    netValue: number;
    currencyType: string;
    createdAt: string;
    capturedAt: string;
    cpo: string;
}

export interface IDrivers {
    addresses: Address[];
    id: number;
    profile: Profile;
    orders: Order[];
}
