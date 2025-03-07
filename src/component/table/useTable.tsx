import { MigrationData, MigrationStatus } from "@/model/form.type";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Space, notification } from "antd";
import { getStatusTag } from "../tag/tag";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { DRIVERS } from "@/graphql/query/drivers";
import { IDrivers } from "@/model/drivers.type";
import HttpClient from "@/services/httpClient";
import { ISale } from "@/model/sales.type";
import { ICustomer } from "@/model/customer.type";
import { useState } from "react";
import { format, isValid, parse } from "date-fns";

export const useTable = () => {
  const { data, loading } = useQuery(DRIVERS);
  const client = new HttpClient("");
  const [status, setStatus] = useState<MigrationStatus>("Parado");
  const [migrationData] = useState<MigrationData[]>([
    {
      key: 1,
      action: "Migrar Cadastro de Cliente",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: status,
      date: new Date().toISOString(),
    },
  ]);

  const showErrorNotification = (message: string, description?: string) => {
    notification.error({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleInstantMigration = async (record: MigrationData) => {
    if (record.key === 1) {
      await handleMigrationCustomersData();
    }
  };

  const handleMigrationSalesData = async (
    customer_id: string,
    document: string
  ) => {
    try {
      const driversData: IDrivers[] = data.drivers;

      const driverByDocument = driversData.find(
        (driver) => driver.profile.CPF === document
      );

      const sales: ISale[] = driverByDocument?.orders.map((order) => {
        if (order.status === 'Captured') {
          return {
            customer_id: customer_id,
            emission: order.capturedAt,
            status: "COMMITTED",
            seller_id: "",
            services: [
              {
                value: order.capturedValue,
                quantity: 1,
                description: "Carregamento de veículos elétricos",
                service_id: "f894b9e5-5675-4414-954d-5d3beee5ab96",
              },
            ],
            payment: {
              type: "CASH",
              method: "CREDIT_CARD",
              installments: [
                {
                  due_date: order.capturedAt,
                  value: order.capturedValue,
                  number: 1,
                },
              ],
            },
          };
        }
      }) as ISale[];

      await Promise.all(
        sales.map(async (sale: ISale) => {
          if (sale.emission) {
            const res: ISale[] = await client.get(
              `api/sales?date=${sale.emission}&customer_id=${customer_id}`
            );
            if (res.length === 0) {
              await client.post("api/sales", sale);
            }
          }
        })
      );
    } catch (error) {
      setStatus("Erro");
      showErrorNotification(
        "Erro na Migração de Vendas",
        "Ocorreu um erro ao migrar os dados de vendas."
      );
      console.error("Error migrating sales data:", error);
    }
  };

  const verifyUserCreated = async (document: string) => {
    try {
      const response = await client.get<ICustomer[]>(
        `api/customers?document=${document}`
      );
      return response;
    } catch (error) {
      showErrorNotification(
        "Erro na Verificação de Usuário",
        "Ocorreu um erro ao verificar o usuário."
      );
      console.error("Error verifying user:", error);
      throw error; // Re-throw the error to stop further execution
    }
  };

  const createCustomerFromDriver = (driver: IDrivers): ICustomer => ({
    name: `${driver.profile.firstName} ${driver.profile.lastName}`,
    person_type: "NATURAL",
    date_of_birth: driver.profile.dateOfBirth
      ? formatDate(driver.profile.dateOfBirth)
      : null,
    identity_document: driver.profile.identificationNumber,
    mobile_phone: driver.profile.cellPhone,
    document: driver.profile.CPF,
    email: driver.profile.email ?? "",
    contacts: [
      {
        name: driver.profile.firstName ?? "",
        business_phone: driver.profile.cellPhone ?? "",
        email: driver.profile.email ?? "",
        job_title: "",
      },
    ],
    address: {
      neighborhood: driver.addresses[0]?.neighborhood ?? "",
      number: driver.addresses[0]?.streetNumber ?? "SN",
      street: driver.addresses[0]?.street ?? "",
      zip_code: driver.addresses[0]?.postalCode ?? "",
      complement: "",
    },
    company_name: "",
    business_phone: "",
    state_registration_number: "",
    state_registration_type: "NO_CONTRIBUTOR",
    city_registration_number: "",
  });

  const handleMigrationCustomersData = async () => {
    try {
      setStatus("Executando");
      const driversData: IDrivers[] = data.drivers;
      const customers: ICustomer[] = driversData.map(createCustomerFromDriver);

      await Promise.all(
        customers.map(async (customer) => {
          if (customer.document) {
            const cleanedDocument = customer.document.replace(/[.-]/g, "");
            const verify = await verifyUserCreated(cleanedDocument);
            if (verify.length > 0) {
              await handleMigrationSalesData(verify[0].id!, customer.document);
            } else {
              const response = await client.post<ICustomer>(
                "api/customers",
                customer
              );
              await handleMigrationSalesData(response.id!, response.document);
            }
          }
        })
      );

      setStatus("Concluida");
    } catch (error) {
      setStatus("Erro");
      showErrorNotification(
        "Erro na Migração de Clientes",
        "Ocorreu um erro ao migrar os dados de clientes."
      );
      console.error("Error migrating customers data:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = parse(dateString, "yyyy/MM/dd", new Date());
    if (!isValid(date)) {
      return null;
    }
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const columns: ColumnsType<MigrationData> = [
    {
      title: "Ação",
      dataIndex: "action",
      key: "action",
      className: "font-medium",
    },
    {
      title: "Base de Dados",
      dataIndex: "sourceDb",
      key: "sourceDb",
    },
    {
      title: "Base de Migração",
      dataIndex: "targetDb",
      key: "targetDb",
    },
    {
      title: "Status da Migração",
      dataIndex: "status",
      key: "status",
      render: (status: MigrationStatus) => getStatusTag(status),
    },
    {
      title: "Data da Migração",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleString("pt-BR"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: MigrationData) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => handleInstantMigration(record)}
          >
            Instantânea
          </Button>
        </Space>
      ),
    },
  ];

  return {
    migrationData,
    columns,
    loading,
    handleMigrationSalesData,
  };
};
