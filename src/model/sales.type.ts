interface Product {
    description: string;
    quantity: number;
    product_id: string;
    value: number;
  }
  
  interface Service {
    description: string;
    quantity: number;
    service_id: string;
    value: number;
  }
  
  interface Discount {
    measure_unit: string;
    rate: number;
  }
  
  interface Installment {
    number: number;
    value: number;
    due_date: string;
    status: string;
    note: string;
    hasBillet: boolean;
  }
  
  interface Payment {
    type: string;
    method: string;
    installments: Installment[];
    financial_account_id: string;
  }
  
  export interface ISale {
    number?: number;
    emission: string;
    status: string;
    customer_id?: string;
    seller_id?: string;
    products?: Product[];
    services?: Service[];
    discount?: Discount;
    payment?: Payment;
    notes?: string;
    shipping_cost?: number;
  }
  