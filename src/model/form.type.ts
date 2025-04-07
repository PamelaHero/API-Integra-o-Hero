export type FieldType = {
    email?: string;
    password?: string;
    clientId?: string;
    clientSecret?:string;
    code?: string;
    redirectUrl?:string;
    cpo?:string;
};

export type MigrationStatus = 'Parado' | 'Executando' | 'Concluida' | 'Erro' ;

export type MigrationAction = 
  | 'Migrar Cadastro de Cliente'
  | 'Atualizar Cliente Cadastrado'
  | 'Migrar Ordem de Serviço';

export interface MigrationData {
  key: number;
  action: MigrationAction;
  sourceDb: string;
  targetDb: string;
  status: MigrationStatus;
  date: string;
}