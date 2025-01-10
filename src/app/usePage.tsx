import { getStatusTag } from "@/component/tag/tag";
import { LOGIN_MEMBER } from "@/graphql/mutation/loginMember";
import { DRIVERS } from "@/graphql/query/drivers";
import { ContaAzulAuthType } from "@/model/auth.type";
import { FieldType, MigrationData, MigrationStatus } from "@/model/form.type";
import HttpClient from "@/services/httpClient";
import { PlayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, FormProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

type StepType = "step0" | "step1"|"step2"|"step3"|"integration"
const usePage = () => {
  const [step, setStep] = useState<StepType>("step0")
  const [clientId, setClientId] = useState("")
  const [queryParams, setQueryParams] = useState<{ code: string | null; state: string | null ; currentUrl: string | null; clientId: string | null  }>({
    code: null,
    state: null,
    clientId: null,
    currentUrl: null
  });
  const [loginMember, { data , loading: loadingLogin, error }] = useMutation(LOGIN_MEMBER);

  const client = new HttpClient("", null);

  useEffect(()=>{
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search); // Extract query string
        const code = params.get("code");
        const state = params.get("state");
        setQueryParams((prev)=>({...prev ,  code, state }));
    }
  },[])

  useEffect(()=>{
    if(queryParams.code){
        localStorage.setItem("step", "step3")
        setStep("step3")
    }
  },[queryParams])

  const SignInVoltbras = async (
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const { data } = await loginMember({ variables: { data:{email, password}}});
      const token = data?.loginMember.authToken;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("step", "step2")
        setStep("step2")
      }
    } catch (err) {
      console.error(err);
    }
  };

  const SigninContaAzul = async ( username: string,
    password: string , currentUrl: string, code: string) => {
    try {
      const response: ContaAzulAuthType = await client.post('api/auth',{
        currentUrl,
        username,
        password,
        code
      });
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("step", "")
        setStep("integration")
      }
    } catch (error) {
      setStep("step2")
      console.log(error)
    }

  }

  const handleAuthorizationContaAzul:FormProps<FieldType>["onFinish"] = ({clientId}) => {
    const currentUrl = window?.location?.href;
    const state = Math.random();
    setQueryParams((prev)=>({...prev, clientId: clientId!, currentUrl: currentUrl}));
    const uri = `https://api.contaazul.com/auth/authorize?redirect_uri=${currentUrl}&client_id=${clientId}&scope=sales&state=${state}`;
    window.open(uri , "_self");
  }

  const onConnectContaAzul:FormProps<FieldType>["onFinish"] = async ({clientId, clientSecret, code, redirectUrl }) => {
    await SigninContaAzul(clientId!, clientSecret!, redirectUrl!, code!);
  }
  const onConnectVoltbras: FormProps<FieldType>["onFinish"] = async ({email, password}) => {
    await SignInVoltbras(email!, password!);
  };
  
 
  return {
    onConnectVoltbras,
    onConnectContaAzul,
    handleAuthorizationContaAzul,
    queryParams,
    loadingLogin,
    step,
  };
};
export default usePage;
