import { MigrationStatus } from "@/model/form.type";
import { PlayCircleOutlined, StopFilled } from "@ant-design/icons";
import { Tag } from "antd";

export const getStatusTag = (status: MigrationStatus): React.ReactNode => {
    const statusConfig: Record<MigrationStatus, { color: string; icon?: React.ReactNode }> = {
      'Executando': { color: 'processing', icon: <PlayCircleOutlined spin /> },
      'Concluida': { color: 'success' },
      'Erro': { color: 'error' },
      'Parado':{color: 'warning', icon: <StopFilled /> }
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