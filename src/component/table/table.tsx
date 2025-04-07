import { MigrationData } from "@/model/form.type";
import { Alert, Button, Skeleton, Table } from "antd";
import { useTable } from "./useTable";
import { useRouter } from "next/navigation";

export const TableMigration = ({ cpo }: { cpo: string }) => {
  const { columns, migrationData } = useTable(cpo);

  
  return (
    <Table<MigrationData>
      columns={columns}
      dataSource={[migrationData]}
      className="shadow-lg rounded-lg"
      pagination={false}
    />
  );
};
