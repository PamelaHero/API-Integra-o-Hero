import { LOGIN_MEMBER } from "@/graphql/mutation/loginMember";
import { ContaAzulAuthType } from "@/model/auth.type";
import { FieldType } from "@/model/form.type";
import HttpClient from "@/services/httpClient";
import { useMutation } from "@apollo/client";
import { FormProps, notification } from "antd"; // Import notification
import { useEffect, useState } from "react";

type StepType = "step0" | "step1" | "step2" | "step3" | "integration";

const usePage = () => {
  const [step, setStep] = useState<StepType>("step0");
  const [queryParams, setQueryParams] = useState<{
    code: string | null;
    state: string | null;
    currentUrl: string | null;
    clientId: string | null;
  }>({
    code: null,
    state: null,
    clientId: null,
    currentUrl: null,
  });

  const [loginMember, { loading: loadingLogin }] = useMutation(LOGIN_MEMBER);
  const client = new HttpClient("");

  // Function to show error notifications
  const showErrorNotification = (message: string, description?: string) => {
    notification.error({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search); // Extract query string
      const code = params.get("code");
      const state = params.get("state");
      setQueryParams((prev) => ({ ...prev, code, state }));
    }
  }, []);

  useEffect(() => {
    if (queryParams.code) {
      localStorage.setItem("step", "step3");
      setStep("step3");
    }
  }, [queryParams]);

  const SignInVoltbras = async (email: string, password: string) => {
    try {
      const { data } = await loginMember({ variables: { data: { email, password } } });
      const token = data?.loginMember.authToken;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("step", "step2");
        setStep("step2");
      }
    } catch (err) {
      showErrorNotification("Erro no Login", "Ocorreu um erro ao fazer login na Voltbras.");
      console.error("Error signing in to Voltbras:", err);
    }
  };

  const SigninContaAzul = async (
    username: string,
    password: string,
    currentUrl: string,
    code: string
  ) => {
    try {
      const response: ContaAzulAuthType = await client.post("api/auth", {
        currentUrl,
        username,
        password,
        code,
      });

      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("step", "");
        setStep("integration");
      }
    } catch (error) {
      setStep("step2");
      showErrorNotification("Erro no Login", "Ocorreu um erro ao fazer login na Conta Azul.");
      console.error("Error signing in to Conta Azul:", error);
    }
  };

  const handleAuthorizationContaAzul: FormProps<FieldType>["onFinish"] = ({ clientId }) => {
    const currentUrl = window?.location?.href;
    const state = Math.random().toString(36).substring(7); // Generate a random state
    setQueryParams((prev) => ({ ...prev, clientId: clientId!, currentUrl: currentUrl }));
    const uri = `https://api.contaazul.com/auth/authorize?redirect_uri=${currentUrl}&client_id=${clientId}&scope=sales&state=${state}`;
    window.open(uri, "_self");
  };

  const onConnectContaAzul: FormProps<FieldType>["onFinish"] = async ({
    clientId,
    clientSecret,
    code,
    redirectUrl,
  }) => {
    try {
      await SigninContaAzul(clientId!, clientSecret!, redirectUrl!, code!);
    } catch (error) {
      showErrorNotification("Erro na Conexão", "Ocorreu um erro ao conectar à Conta Azul.");
      console.error("Error connecting to Conta Azul:", error);
    }
  };

  const onConnectVoltbras: FormProps<FieldType>["onFinish"] = async ({ email, password }) => {
    try {
      await SignInVoltbras(email!, password!);
    } catch (error) {
      showErrorNotification("Erro na Conexão", "Ocorreu um erro ao conectar à Voltbras.");
      console.error("Error connecting to Voltbras:", error);
    }
  };

  const onFinishGuide = () => {
    setStep("step1");
  };

  return {
    onConnectVoltbras,
    onConnectContaAzul,
    handleAuthorizationContaAzul,
    queryParams,
    loadingLogin,
    step,
    onFinishGuide,
  };
};

export default usePage;