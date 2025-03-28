
import HttpClient from "@/services/httpClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, currentUrl, code } = body;
  try {
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = `oauth2/token?grant_type=authorization_code&redirect_uri=${currentUrl}&code=${code}`;
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
    return new Response(`Error: Failed to authenticate ${error}`, { status: 500 });
  }
}
