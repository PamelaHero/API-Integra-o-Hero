export type FieldType = {
    email?: string;
    password?: string;
    clientId?: string;
    clientSecret?:string;
    code?: string;
    redirectUrl?:string;
};

export type MigrationStatus = 'Rodando' | 'Concluida' | 'Erro';

export type MigrationAction = 
  | 'Migrar Cadastro de Cliente'
  | 'Atualizar Cliente Cadastrado'
  | 'Migrar Ordem de Serviço';

export interface MigrationData {
  key: string;
  action: MigrationAction;
  sourceDb: string;
  targetDb: string;
  status: MigrationStatus;
  date: string;
}