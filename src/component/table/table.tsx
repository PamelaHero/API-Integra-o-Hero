import { MigrationData } from "@/model/form.type"
import { Table } from "antd"
import { useTable } from "./useTable"
import { Suspense } from "react"

export const TableMigration = () => {
    const {columns, migrationData, loading} = useTable()
    return (
      <Suspense fallback={loading}>
          <Table<MigrationData>
            columns={columns}
            dataSource={migrationData}
            className="shadow-lg rounded-lg"
            pagination={false}
        />
      </Suspense>
    )
}