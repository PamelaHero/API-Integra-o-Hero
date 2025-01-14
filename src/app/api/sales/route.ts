
import { ISale } from "@/model/sales.type";
import HttpClient from "@/services/httpClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {} = body as ISale
  try {
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = `v1/sales`;
    const authResponse = await client.post(
      uri,
      body
    );
    return new Response(JSON.stringify(authResponse), {
      status: 201,
    });
  } catch (error) {
    return new Response(`Error: Failed to authenticate ${error}`, { status: 500 });
  }
}
