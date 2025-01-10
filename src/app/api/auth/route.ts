
import HttpClient from "@/services/httpClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { username, password, currentUrl, queryParams } = body;
  try {
    const client = new HttpClient("https://api.contaazul.com/", null);
    const uri = `oauth2/token?grant_type=authorization_code&redirect_uri=http://localhost:3000&code=${queryParams.code}`;
    const authResponse = await client.post(
      uri,
      {},
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
    return new Response(JSON.stringify(authResponse), {
      status: 201,
    });
  } catch (error) {
    return new Response(`Error: "Failed to authenticate"`, { status: 500 });
  }
}
