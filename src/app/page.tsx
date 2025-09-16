"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DataItem {
  data_transacao: string;
  total_transacoes: string;
  valor_total: string;
  lucro_total: string;
}

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [balance, setBalance] = useState<string>("0.00");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
    fetchBalance();
  }, []);

  const fetchData = async () => {
    try {
      // Tenta primeiro a API real
      let response = await fetch("/api/dashboard", {
        cache: 'no-store'
      });
      let result = await response.json();

      // Se falhar, usa os dados mockados
      if (result.error) {
        console.log("API real falhou, usando dados mockados");
        response = await fetch("/api/dashboard/mock");
        result = await response.json();
      }

      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      // Tenta carregar dados mockados como fallback
      try {
        const response = await fetch("/api/dashboard/mock");
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (mockErr) {
        setError("Erro ao carregar dados");
        setLoading(false);
      }
    }
  };

  const fetchBalance = async () => {
    try {
      // Tenta primeiro a API real
      let response = await fetch("/api/balance", {
        cache: 'no-store'
      });
      let result = await response.json();

      // Se falhar, usa os dados mockados
      if (result.error) {
        console.log("Balance API real falhou, usando dados mockados");
        response = await fetch("/api/balance/mock");
        result = await response.json();
      }

      setBalance(result.query?.currentBalance || "0.00");
    } catch (err) {
      console.error("Erro ao carregar saldo:", err);
      // Tenta carregar dados mockados como fallback
      try {
        const response = await fetch("/api/balance/mock");
        const result = await response.json();
        setBalance(result.query?.currentBalance || "0.00");
      } catch (mockErr) {
        console.error("Erro ao carregar saldo mockado:", mockErr);
        setBalance("0.00");
      }
    }
  };

  const calculateTotals = () => {
    if (!data || !data.length) return { transacoes: 0, valor: 0, lucro: 0 };

    return data.reduce(
      (acc, item) => {
        return {
          transacoes:
            acc.transacoes + parseInt(item.total_transacoes.replace(/\./g, "")),
          valor:
            acc.valor +
            parseFloat(item.valor_total.replace(/\./g, "").replace(",", ".")),
          lucro:
            acc.lucro +
            parseFloat(item.lucro_total.replace(/\./g, "").replace(",", ".")),
        };
      },
      { transacoes: 0, valor: 0, lucro: 0 }
    );
  };

  const totals = calculateTotals();

  const getTodayProfit = () => {
    if (!data || !data.length) return 0;
    // Pega o último item (mais recente) da lista
    const lastItem = data[0];
    return parseFloat(lastItem.lucro_total.replace(/\./g, "").replace(",", "."));
  };

  const todayProfit = getTodayProfit();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  const chartData = data && data.length > 0 ? data.slice().reverse().map(item => ({
    data: item.data_transacao.substring(0, 5),
    transacoes: parseInt(item.total_transacoes.replace(/\./g, "")),
    valor: parseFloat(item.valor_total.replace(/\./g, "").replace(",", ".")),
    lucro: parseFloat(item.lucro_total.replace(/\./g, "").replace(",", "."))
  })) : []

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#101828] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101828] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101828] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101828] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Image
            src="https://app.versellbank.com/assets/versell-logo.svg"
            alt="Versell Logo"
            width={150}
            height={40}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Total de Transações</p>
            <p className="text-3xl font-bold text-white">
              {formatNumber(totals.transacoes)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Valor Total Transacionado</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totals.valor)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Lucro de Hoje</p>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(todayProfit)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Saldo Disponível</p>
            <p className="text-3xl font-bold text-blue-400">
              {formatCurrency(parseFloat(balance.replace(',', '.')))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <h2 className="text-xl font-bold text-white mb-4">Evolução das Transações</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#354153" />
                <XAxis dataKey="data" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1D2A39', border: '1px solid #354153' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="transacoes" stroke="#3B82F6" name="Transações" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <h2 className="text-xl font-bold text-white mb-4">Evolução do Lucro</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#354153" />
                <XAxis dataKey="data" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1D2A39', border: '1px solid #354153' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="lucro" stroke="#10B981" name="Lucro (R$)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153] overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            Histórico de Transações
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#354153]">
                <th className="text-left text-gray-400 py-3 px-4">Data</th>
                <th className="text-right text-gray-400 py-3 px-4">
                  Transações
                </th>
                <th className="text-right text-gray-400 py-3 px-4">
                  Valor Total Transacionado
                </th>
                <th className="text-right text-gray-400 py-3 px-4">Lucro</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#354153] hover:bg-[#354153] transition-colors"
                >
                  <td className="text-white py-3 px-4">
                    {item.data_transacao}
                  </td>
                  <td className="text-white text-right py-3 px-4">
                    {item.total_transacoes}
                  </td>
                  <td className="text-white text-right py-3 px-4">
                    {formatCurrency(parseFloat(item.valor_total.replace(/\./g, "").replace(",", ".")))}
                  </td>
                  <td className="text-green-400 text-right py-3 px-4">
                    {formatCurrency(parseFloat(item.lucro_total.replace(/\./g, "").replace(",", ".")))}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="text-gray-400 text-center py-8">
                    Nenhum dado disponível
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
