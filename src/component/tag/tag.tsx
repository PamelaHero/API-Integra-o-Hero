import { MigrationStatus } from "@/model/form.type";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

export const getStatusTag = (status: MigrationStatus): React.ReactNode => {
    const statusConfig: Record<MigrationStatus, { color: string; icon?: React.ReactNode }> = {
      'Rodando': { color: 'processing', icon: <PlayCircleOutlined spin /> },
      'Concluida': { color: 'success' },
      'Erro': { color: 'error' },
    };

    const config = statusConfig[status];

    return (
      <Tag 
        icon={config.icon}
        color={config.color}
      >
        {status}
      </Tag>
    );
  };