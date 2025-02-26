
import HttpClient from "@/services/httpClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Verifica se o corpo da requisição é um JSON válido
    let body;
    try {
      body = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json(
        { error: 'O corpo da requisição deve ser um JSON válido.' },
        { status: 400 }
      );
    }

    // Validação básica do corpo da requisição
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'O corpo da requisição não pode estar vazio.' },
        { status: 400 }
      );
    }

    const client = new HttpClient('https://api.contaazul.com/');
    const uri = 'v1/customers';

    // Faz a requisição POST para a API externa
    const response = await client.post(uri, body, {
      headers: {
        Authorization: req.headers.get('authorization') || '',
      },
    });

    // Retorna a resposta da API externa
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Erro na requisição POST:', error);

    // Retorna uma mensagem de erro genérica para o cliente
    return NextResponse.json(
      { error: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const document = searchParams.get('document');

  if (!document) {
    return NextResponse.json(
      { error: 'O parâmetro "document" é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const client = new HttpClient("https://api.contaazul.com/");
    const uri = `v1/customers?document=${document}`;
    const response = await client.get(uri, {
      headers: {
        Authorization: req.headers.get('authorization') || '',
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao buscar cliente: ${error}` },
      { status: 500 }
    );
  }
}
