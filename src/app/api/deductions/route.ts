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
    } catch (fileError) {
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

// POST - Processa CSV com valores separados por vírgula
export async function POST(request: Request) {
  try {
    const { csv } = await request.json();

    if (!csv || typeof csv !== 'string') {
      return NextResponse.json(
        { error: "CSV string is required" },
        { status: 400 }
      );
    }

    // Parse CSV - espera valores separados por vírgula
    // Exemplo: "100,50.5,200,75.25"
    const values = csv
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v !== '')
      .map((v: string) => parseFloat(v.replace(',', '.')))
      .filter((v: number) => !isNaN(v) && v > 0);

    if (values.length === 0) {
      return NextResponse.json(
        { error: "No valid values found in CSV" },
        { status: 400 }
      );
    }

    // Adiciona os novos valores às deduções
    deductions.push(...values);

    const totalDeductions = deductions.reduce((sum, value) => sum + value, 0);

    return NextResponse.json({
      success: true,
      added: values.length,
      total: totalDeductions,
      items: deductions
    });
  } catch (error) {
    console.error("Error processing CSV:", error);
    return NextResponse.json(
      { error: "Failed to process CSV" },
      { status: 500 }
    );
  }
}

// DELETE - Limpa todas as deduções
export async function DELETE() {
  try {
    deductions = [];
    return NextResponse.json({
      success: true,
      message: "All deductions cleared"
    });
  } catch (error) {
    console.error("Error clearing deductions:", error);
    return NextResponse.json(
      { error: "Failed to clear deductions" },
      { status: 500 }
    );
  }
}
