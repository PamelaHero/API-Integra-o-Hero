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

export const useTable = () => {
  const { data } = useQuery(DRIVERS);
  const client = new HttpClient("")
  const driversData: IDrivers[] = data as IDrivers[]
  console.log(driversData)


  const handleInstantMigration = async(record: MigrationData) => {
    if(record.key == 1){
      await handleMigrationSalesData()
    }
    if(record.key == 2){
      await handleMigrationCustomersData()
    }
  };

  const handleRoutineMigration = (record: MigrationData) => {
    console.log(record);
  };

  const handleMigrationSalesData = async() => {
    const sales: ISale[] = driversData.map((drivers)=>{
      return drivers.orders.map((order) => ({
        customer_id: drivers.id,
        emission: order.capturedAt,
        status: order.status,
        seller_id: "",
        services: [
          {
            value: order.capturedValue,
            quantity: 1,
            description: "",
            service_id: ""
          }
        ],
      })) 
    }) as unknown as ISale[]
   try {
    await client.post("api/sales", sales)
   } catch (error) {
    console.log(error)
   }
  }

  const handleMigrationCustomersData = async() => {
    const customers: ICustomer[] = driversData.map((drivers)=>({
      name: `${drivers.profile.firstName} ${drivers.profile.lastName} ` ,
      email: drivers.profile.email,
      address:{
        number: drivers.addresses[0].streetNumber,
        zip_code: drivers.addresses[0].postalCode,
        neighborhood: drivers.addresses[0].neighborhood,
        street: drivers.addresses[0].street,
        complement: ""
      },
      date_of_birth: drivers.profile.dateOfBirth,
      identity_document: drivers.profile.identificationNumber,
      mobile_phone: drivers.profile.cellPhone,
      document: drivers.profile.CPF
    })) as ICustomer[]
   try {
    await client.post("api/customers", customers)
   } catch (error) {
    console.log(error)
   }
  }


  const migrationData: MigrationData[] = [
    {
      key: 1,
      action: "Migrar Cadastro de Cliente",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: "Parado",
      date:  String(new Date()),
    },
    {
      key: 2,
      action: "Migrar Ordem de Serviço",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: "Parado",
      date: String(new Date()),
    },
  ];

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
    handleMigrationSalesData
  };
};
