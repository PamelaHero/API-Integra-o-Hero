import { MigrationData } from "@/model/form.type"
import { Skeleton, Table } from "antd"
import { useTable } from "./useTable"

export const TableMigration = () => {
    const {columns, migrationData, loading} = useTable()

    if (loading) {
      return <Skeleton active paragraph={{ rows: 6 }} />
    }
    return (
          <Table<MigrationData>
            columns={columns}
            dataSource={[migrationData]}
            className="shadow-lg rounded-lg"
            pagination={false}
        />
    )
}