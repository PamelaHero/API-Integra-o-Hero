
import HttpClient from "@/services/httpClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = `v1/customers`;
    const response = await client.post(
      uri,
      body,
      {
        headers:{
          "Authorization" : req.headers.get("authorization")
        }
      }
    );
    return new Response(JSON.stringify(response), {
      status: 201,
    });
  } catch (error) {
    return new Response(`Error: Failed to authenticate ${error}`, { status: 500 });
  }
}
