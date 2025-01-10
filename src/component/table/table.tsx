import { MigrationData } from "@/model/form.type"
import { Table } from "antd"
import { useTable } from "./useTable"

export const TableMigration = () => {
    const {columns, migrationData} = useTable()
    return (
        <Table<MigrationData>
        columns={columns}
        dataSource={migrationData}
        className="shadow-lg rounded-lg"
        pagination={false}
      />
    )
}