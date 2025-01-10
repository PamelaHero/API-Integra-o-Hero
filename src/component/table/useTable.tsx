import { MigrationData, MigrationStatus } from "@/model/form.type";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { getStatusTag } from "../tag/tag";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { DRIVERS } from "@/graphql/query/drivers";

export const useTable = () => {
  const { data, loading, error } = useQuery(DRIVERS);

  const handleInstantMigration = (record: MigrationData) => {
    console.log(record);
  };

  const handleRoutineMigration = (record: MigrationData) => {
    console.log(record);
  };

  const migrationData: MigrationData[] = [
    {
      key: "1",
      action: "Migrar Cadastro de Cliente",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: "Rodando",
      date: "2025-01-10 14:30:00",
    },
    {
      key: "2",
      action: "Atualizar Cliente Cadastrado",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: "Concluida",
      date: "2025-01-10 13:15:00",
    },
    {
      key: "3",
      action: "Migrar Ordem de Serviço",
      sourceDb: "Voltbras",
      targetDb: "Conta Azul",
      status: "Erro",
      date: "2025-01-10 12:45:00",
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
      render: (_: any, record: MigrationData) => (
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
  };
};
