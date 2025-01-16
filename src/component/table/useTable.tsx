import { MigrationData, MigrationStatus } from "@/model/form.type";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { getStatusTag } from "../tag/tag";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { DRIVERS } from "@/graphql/query/drivers";
import { IDrivers } from "@/model/drivers.type";
import HttpClient from "@/services/httpClient";
import { ISale } from "@/model/sales.type";
import { ICustomer } from "@/model/customer.type";
import { useEffect, useState } from "react";
import moment from "moment";

export const useTable = () => {
  const { data, loading } = useQuery(DRIVERS);
  const client = new HttpClient("");
  const [key, setKey] = useState<number>(0);
  const [status, setStatus] = useState<MigrationStatus>("Parado");
  const [migrationData, setMigrationData] = useState<MigrationData[]>([
    {
      key: 1,
      action: "Migrar Cadastro de Cliente",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: status,
      date: String(new Date()),
    },
    // {
    //   key: 2,
    //   action: "Migrar Ordem de Serviço",
    //   sourceDb: "Voltbras",
    //   targetDb: "Conta Azul",
    //   status: status,
    //   date: String(new Date()),
    // },
  ]);

  useEffect(() => {
    {
      setMigrationData((prevData) =>
        prevData.map((item) =>
          item.key === key ? { ...item, status: status } : item
        )
      );
    }
  }, [status]);

  const handleInstantMigration = async (record: MigrationData) => {
    if (record.key == 1) {
      await handleMigrationCustomersData();
    }
    // if (record.key == 2) {
    //   await handleMigrationSalesData();
    // }
  };

  const handleRoutineMigration = (record: MigrationData) => {
    console.log(record);
  };

  // const handleMigrationSalesData = async (customer_id:string) => {
  //   try {
  //     setKey(2);
  //     setStatus("Executando");
  //     const driversData: IDrivers[] = data.drivers;
  //   const sales: ISale[] = driversData.map((drivers) => {
  //     return drivers.orders.map((order) => ({
  //       customer_id: customer_id,
  //       emission: order.capturedAt,
  //       status: "COMMITTED",
  //       seller_id: "",
  //       services: [
  //         {
  //           value: order.capturedValue,
  //           quantity: 1,
  //           description: "",
  //           service_id: "",
  //         },
  //       ],
  //     }));
  //   }) as unknown as ISale[];
  //     sales.flat(2).map(async (sale: ISale) => {
  //       await client.post("api/sales", sale);
  //     });
  //     setStatus("Concluida");
  //   } catch (error) {
  //     setStatus("Erro");
  //     console.log(error);
  //   }
  // };

  const handleMigrationSalesData = async (
    customer_id: string,
    document: string
  ) => {
    try {
      debugger
      const driversData: IDrivers[] = data.drivers;
      const driverByDocument: IDrivers | undefined = driversData.find(
        (driver) => driver.profile.CPF === document
      );
      const sales: ISale[] = driverByDocument?.orders.map((order) => ({
        customer_id: customer_id,
        emission: order.capturedAt,
        status: "COMMITTED",
        seller_id: "",
        services: [
          {
            value: order.capturedValue,
            quantity: 1,
            description: "test",
            service_id: "d9e63bfc-3040-4cd7-85fb-c268278beedd",
          },
        ],
        payment: {
          type: "CASH",
          method: "CREDIT_CARD",
          installments: [{
            due_date: order.capturedAt,
            value: order.capturedValue,
            number: 1
          }]
        }
      })) as unknown as ISale[]
      sales?.map(async (sale: ISale) => {
        await client.post("api/sales", sale);
      });
    } catch (error) {
      setStatus("Erro");
      console.log(error);
    }
  };
  const handleMigrationCustomersData = async () => {
    try {
      setKey(1);
      setStatus("Executando");
      const driversData: IDrivers[] = data.drivers;
      const customers: ICustomer[] = driversData.map((drivers) => ({
        name: `${drivers.profile.firstName} ${drivers.profile.lastName} `,
        person_type: "NATURAL",
        date_of_birth: drivers.profile.dateOfBirth
          ? formatDate(drivers.profile.dateOfBirth)
          : "",
        identity_document: drivers.profile.identificationNumber,
        mobile_phone: drivers.profile.cellPhone,
        document: drivers.profile.CPF,
        address: {
          neighborhood: "",
          number: "",
          street: "",
          zip_code: "",
          complement: "",
        },
      })) as ICustomer[];

      customers.map(async (customer) => {
        const response = await client.post<ICustomer>(
          "api/customers",
          customer
        );
        handleMigrationSalesData(response.id!, response.document);
      });
      setStatus("Concluida");
    } catch (error) {
      setStatus("Erro");
      console.log(error);
    }
  };
  const formatDate = (dateString: string) => {
    const date = moment(dateString, "YYYY/MM/DD");
    if (!date.isValid()) {
      return "";
    }
    return date.format("YYYY-MM-DDTHH:mm:ss");
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
          <Button
            icon={<ClockCircleOutlined />}
            className="border-gray-300 hover:border-gray-400"
            onClick={() => handleRoutineMigration(record)}
          >
            Rotina
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
