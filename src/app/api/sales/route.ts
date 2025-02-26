
import HttpClient from "@/services/httpClient";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const customer_id= searchParams.get('customer_id');
  
    if (!date) {
      return NextResponse.json(
        { error: 'O parâmetro "date" é obrigatório.' },
        { status: 400 }
      );
    }

  try {
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = `/v1/sales?emission_start=${date}&emission_end=${date}&customer_id=${customer_id}`
    const response = await client.get(
      uri,
      {
        headers:{
          "Authorization" : req.headers.get("authorization")
        }
      }
    );
    
    return new Response(JSON.stringify(response), {
      status: 200,
    });

  } catch (error) {
    return new Response(`Error: Failed to ${error}`, { status: 500 });
  }
}
