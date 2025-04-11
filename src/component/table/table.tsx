import { MigrationData } from "@/model/form.type";
import { Skeleton, Table } from "antd";
import { useTable } from "./useTable";
// import { useRouter } from "next/navigation";


export const TableMigration = () => {
  const { columns, migrationData, loading } = useTable();
  // const navigation = useRouter();
  // if (error) {
  //   return (
  //     <div className={`p-4`}>
  //       <Alert
  //         message="Error"
  //         description={
  //           <div className="space-y-2">
  //             Houve um erro ao consultar informação na base Voltbrás
  //           </div>
  //         }
  //         type="error"
  //         showIcon
  //         className="mb-4"
  //       />
  //       <Button
  //         type="primary"
  //         variant="link"
  //         onClick={() => {
  //           navigation.push("/");
  //         }}
  //         className="bg-blue-600 hover:bg-blue-700 py-4"
  //       >
  //         Retry
  //       </Button>
  //     </div>
  //   );
  // }

  if (loading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }
  return (
    <Table<MigrationData>
      columns={columns}
      dataSource={[migrationData]}
      className="shadow-lg rounded-lg"
      pagination={false}
    />
  );
};
