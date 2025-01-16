interface Contact {
    name: string;
    business_phone: string;
    email: string;
    job_title: string;
}

interface Address {
    zip_code: string;
    street: string;
    number: string;
    complement?: string;  // Optional
    neighborhood: string;
}

export interface ICustomer {
    id?: string;
    name: string;
    company_name: string;
    email: string;
    business_phone: string;
    mobile_phone: string;
    person_type: 'NATURAL' | 'LEGAL';  // Assuming it's an enum
    document: string;
    identity_document: string;
    state_registration_number: string;
    state_registration_type: 'NO_CONTRIBUTOR' | 'CONTRIBUTOR';
    city_registration_number: string;
    date_of_birth: string;  // Use ISO 8601 string format
    notes?: string;  // Optional
    contacts: Contact[];
    address: Address;
}
