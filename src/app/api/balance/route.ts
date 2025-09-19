import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(
      "https://api.versellpay.com/api/v1/dashboard/getUserNewAge",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`Balance API returned status: ${response.status}`);
      const text = await response.text();
      console.error("Balance Response body:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Balance data fetched successfully:", data);

    return NextResponse.json(data);
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
