import { NextResponse } from "next/server";

interface TransactionItem {
  lucro: string;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Busca o histórico de transações da mesma API do dashboard
    const response = await fetch(
      "https://api.versellpay.com/api/v1/dashboard/getDataNewAge",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`Dashboard API returned status: ${response.status}`);
      const text = await response.text();
      console.error("Dashboard Response body:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Transaction history fetched successfully:", result);

    // Soma todos os valores de lucro do histórico de transações
    let totalBalance = 0;
    if (result.data && Array.isArray(result.data)) {
      totalBalance = result.data.reduce((acc: number, item: TransactionItem) => {
        // Converte o formato brasileiro (1.234,56) para número
        const lucro = parseFloat(item.lucro.replace(/\./g, "").replace(",", "."));
        return acc + lucro;
      }, 0);
    }

    // Formata como string com 2 casas decimais no formato brasileiro
    const formattedBalance = totalBalance.toFixed(2).replace(".", ",");

    // Return in the expected format
    const balanceData = {
      query: {
        currentBalance: formattedBalance
      }
    };

    console.log("Balance calculated successfully:", balanceData);
    return NextResponse.json(balanceData);
  } catch (error) {
    console.error("Error fetching balance data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch balance data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
