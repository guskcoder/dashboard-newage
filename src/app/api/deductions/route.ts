import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Lê o arquivo deducoes.csv e retorna o total
export async function GET() {
  try {
    const filePath = join(process.cwd(), "deducoes.csv");

    try {
      const fileContent = await readFile(filePath, "utf-8");

      // Parse CSV - valores separados por vírgula
      const values = fileContent
        .split(',')
        .map((v: string) => v.trim())
        .filter((v: string) => v !== '')
        .map((v: string) => parseFloat(v.replace(',', '.')))
        .filter((v: number) => !isNaN(v) && v > 0);

      const totalDeductions = values.reduce((sum, value) => sum + value, 0);

      return NextResponse.json({
        total: totalDeductions,
        items: values,
        count: values.length
      });
    } catch {
      // Se o arquivo não existe, retorna 0
      return NextResponse.json({
        total: 0,
        items: [],
        count: 0
      });
    }
  } catch (error) {
    console.error("Error reading deductions:", error);
    return NextResponse.json(
      { error: "Failed to read deductions" },
      { status: 500 }
    );
  }
}
