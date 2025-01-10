// IntegrationGuide.tsx
import React from 'react';
import { Steps, Card, Typography } from 'antd';
import { 
  LoginOutlined, 
  KeyOutlined, 
  ApiOutlined, 
  SyncOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface StepContentProps {
  title: string;
  description: React.ReactNode;
}

export const Guide: React.FC = () => {
  const StepContent: React.FC<StepContentProps> = ({ title, description }) => (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <Title level={4} className="text-gray-800">{title}</Title>
      <div className="mt-2 text-gray-600">
        {description}
      </div>
    </div>
  );

  const steps = [
    {
      title: 'Login Voltbras',
      icon: <LoginOutlined />,
      content: {
        title: 'Acessar a conta Voltbras',
        description: (
          <div className="space-y-2">
            <Paragraph>
              1. Acesse a página de login da Voltbras
            </Paragraph>
            <Paragraph>
              2. Insira seu email cadastrado
            </Paragraph>
            <Paragraph>
              3. Digite sua senha
            </Paragraph>
            <Paragraph>
              4. Clique no botão "Entrar" para acessar sua conta
            </Paragraph>
            <Paragraph className="text-blue-600">
              Este passo é essencial para garantir acesso seguro aos dados que serão migrados.
            </Paragraph>
          </div>
        ),
      }
    },
    {
      title: 'Autorização',
      icon: <KeyOutlined />,
      content: {
        title: 'Autorizar integração',
        description: (
          <div className="space-y-2">
            <Paragraph>
              1. Localize seu Client ID fornecido pela Conta Azul
            </Paragraph>
            <Paragraph>
              2. Insira o Client ID no campo indicado
            </Paragraph>
            <Paragraph>
              3. Clique no botão "Autorizar Acesso"
            </Paragraph>
            <Paragraph>
              4. Você será redirecionado para a página de autorização da Conta Azul
            </Paragraph>
            <Paragraph className="text-blue-600">
              Este passo estabelece a conexão segura entre as plataformas.
            </Paragraph>
          </div>
        ),
      }
    },
    {
      title: 'Login Conta Azul',
      icon: <ApiOutlined />,
      content: {
        title: 'Acessar Conta Azul',
        description: (
          <div className="space-y-2">
            <Paragraph>
              1. Na página da Conta Azul, insira suas credenciais
            </Paragraph>
            <Paragraph>
              2. Confirme a autorização para a integração
            </Paragraph>
            <Paragraph>
              3. Aguarde o redirecionamento automático
            </Paragraph>
            <Paragraph className="text-blue-600">
              Este passo confirma sua identidade na Conta Azul e permite o início da integração.
            </Paragraph>
          </div>
        ),
      }
    },
    {
      title: 'Migração',
      icon: <SyncOutlined />,
      content: {
        title: 'Realizar migrações',
        description: (
          <div className="space-y-2">
            <Paragraph>
              1. Na tabela de migrações, localize a operação desejada
            </Paragraph>
            <Paragraph>
              2. Escolha o tipo de execução:
            </Paragraph>
            <ul className="list-disc pl-6 space-y-1">
              <li>Instantânea: para execução imediata</li>
              <li>Rotina: para agendamento periódico</li>
            </ul>
            <Paragraph>
              3. Monitore o status da migração na coluna "Status da Migração"
            </Paragraph>
            <Paragraph className="text-blue-600">
              Você pode executar múltiplas migrações simultaneamente e acompanhar seu progresso.
            </Paragraph>
          </div>
        ),
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8 bg-gradient-to-r from-blue-500 to-blue-700">
        <Title level={2} className="text-center text-white m-0">
          Passo a Passo para usar a aplicação de Integração Hero
        </Title>
      </Card>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Steps
          direction="vertical"
          size="default"
          items={steps.map((step, index) => ({
            title: step.title,
            icon: step.icon,
            description: (
              <StepContent
                title={step.content.title}
                description={step.content.description}
              />
            ),
          }))}
        />
      </div>
    </div>
  );
};