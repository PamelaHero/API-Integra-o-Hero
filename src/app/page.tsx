"use client";
import { Form, Button, Input, Card } from "antd";

import usePage from "./usePage";
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  CodeOutlined,
  LinkOutlined,
  // AuditOutlined,
} from "@ant-design/icons";
import { Guide } from "@/component/guide/guide";
import { TableMigration } from "@/component/table/table";

export default function Home() {
  const {
    onConnectVoltbras,
    onConnectContaAzul,
    loadingLogin,
    handleAuthorizationContaAzul,
    step,
    queryParams,
    onFinishGuide,
    // form
  } = usePage();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      {step === "step0" ? <Guide handleStartStep={onFinishGuide} /> : null}
      {step === "step1" ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Card style={{ width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Login na Conta Voltbras
              </h2>
            </div>

            <Form
              name="login_form"
              initialValues={{ remember: true  }}
              onFinish={onConnectVoltbras}
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira seu email!",
                  },
                  {
                    type: "email",
                    message: "Email inválido!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira sua senha!",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
              </Form.Item>
              {/* <Form.Item
                name="CPO"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira seu cpo!",
                  }
                ]}
              >
                <Input prefix={<AuditOutlined />} placeholder="CPO" />
              </Form.Item> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  {loadingLogin ? "Acessando..." : "Entrar"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ) : null}
      {step === "step2" ? (
        <div>
          <Card style={{ width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Autorização Conta Azul
              </h2>
              <p style={{ color: "#666" }}>
                Insira seu Client ID para iniciar a autorização
              </p>
            </div>

            <Form
              name="auth_redirect_form"
              onFinish={handleAuthorizationContaAzul}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="clientId"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o Client ID!",
                  },
                ]}
              >
                <Input
                  prefix={<KeyOutlined />}
                  placeholder="Digite seu Client ID"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                >
                  Autorizar Acesso
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ) : null}
      {step === "step3" ? (
        <div>
          <Card style={{ width: "100%", maxWidth: 500 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Login Conta Azul
              </h2>
            </div>

            <Form
              name="conta_azul_form"
              onFinish={onConnectContaAzul}
              layout="vertical"
              size="large"
            >
              <Form.Item
                label="Client ID"
                name="clientId"
                initialValue={queryParams.clientId} 
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o Client ID!",
                  },
                ]}
              >
                <Input
                  prefix={<KeyOutlined />}
                  placeholder="Digite o Client ID"
                  value={queryParams.clientId ?? ""}
                />
              </Form.Item>

              <Form.Item
                label="Client Secret"
                name="clientSecret"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o Client Secret!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined />}
                  placeholder="Digite o Client Secret"
                />
              </Form.Item>

              <Form.Item
                label="Redirect URL"
                name="redirectUrl"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a URL de redirecionamento!",
                  },
                  {
                    type: "url",
                    message: "Por favor, insira uma URL válida!",
                  },
                ]}
              >
                <Input
                  prefix={<LinkOutlined />}
                  placeholder="https://sua-url-de-redirecionamento.com"
                  value={queryParams.currentUrl ?? ""}
                />
              </Form.Item>

              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o código de autorização!",
                  },
                ]}
              >
                <Input
                  prefix={<CodeOutlined />}
                  placeholder="Digite o código de autorização"
                  value={queryParams.code ?? ""}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Autenticar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      ) : null}
      {step === "integration" ? (
        <div className="p-6">
          <TableMigration />
        </div>
      ) : null}
    </div>
  );
}
