
import HttpClient from "@/services/httpClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json()
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = '/v1/sales';
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
    return new Response(`Error: Failed to ${error}`, { status: 500 });
  }
}
