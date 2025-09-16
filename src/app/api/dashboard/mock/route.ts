import { NextResponse } from 'next/server'

export async function GET() {
  // Dados mockados para desenvolvimento/teste
  const mockData = {
    "data": [
      {"data_transacao":"15/09/2025","total_transacoes":"1692","valor_total":"38655,99","lucro_total":"1191,90"},
      {"data_transacao":"14/09/2025","total_transacoes":"6391","valor_total":"133141,39","lucro_total":"4195,40"},
      {"data_transacao":"13/09/2025","total_transacoes":"9942","valor_total":"209710,86","lucro_total":"5986,20"},
      {"data_transacao":"12/09/2025","total_transacoes":"6114","valor_total":"139541,81","lucro_total":"3842,50"},
      {"data_transacao":"11/09/2025","total_transacoes":"6501","valor_total":"197326,39","lucro_total":"4697,45"},
      {"data_transacao":"10/09/2025","total_transacoes":"9911","valor_total":"262801,03","lucro_total":"7897,75"},
      {"data_transacao":"09/09/2025","total_transacoes":"4749","valor_total":"125668,08","lucro_total":"4016,55"},
      {"data_transacao":"08/09/2025","total_transacoes":"3925","valor_total":"157246,10","lucro_total":"3196,60"},
      {"data_transacao":"07/09/2025","total_transacoes":"5535","valor_total":"208679,90","lucro_total":"5267,70"},
      {"data_transacao":"06/09/2025","total_transacoes":"6938","valor_total":"222254,80","lucro_total":"6055,00"},
      {"data_transacao":"05/09/2025","total_transacoes":"9213","valor_total":"301393,67","lucro_total":"8930,80"},
      {"data_transacao":"04/09/2025","total_transacoes":"7485","valor_total":"331985,14","lucro_total":"7546,80"},
      {"data_transacao":"03/09/2025","total_transacoes":"6787","valor_total":"189104,61","lucro_total":"6772,60"},
      {"data_transacao":"02/09/2025","total_transacoes":"10413","valor_total":"323096,70","lucro_total":"9835,30"},
      {"data_transacao":"01/09/2025","total_transacoes":"10950","valor_total":"397273,30","lucro_total":"10046,10"},
      {"data_transacao":"31/08/2025","total_transacoes":"12745","valor_total":"402811,02","lucro_total":"12703,90"},
      {"data_transacao":"30/08/2025","total_transacoes":"8362","valor_total":"262897,83","lucro_total":"8352,50"},
      {"data_transacao":"29/08/2025","total_transacoes":"6577","valor_total":"203559,35","lucro_total":"6216,70"},
      {"data_transacao":"28/08/2025","total_transacoes":"6299","valor_total":"242325,49","lucro_total":"6445,90"},
      {"data_transacao":"27/08/2025","total_transacoes":"2446","valor_total":"75102,98","lucro_total":"1852,40"},
      {"data_transacao":"26/08/2025","total_transacoes":"3637","valor_total":"120211,46","lucro_total":"2776,00"},
      {"data_transacao":"25/08/2025","total_transacoes":"4741","valor_total":"129271,21","lucro_total":"3826,80"},
      {"data_transacao":"24/08/2025","total_transacoes":"3088","valor_total":"94372,59","lucro_total":"2333,90"},
      {"data_transacao":"23/08/2025","total_transacoes":"3737","valor_total":"125390,58","lucro_total":"3189,40"},
      {"data_transacao":"22/08/2025","total_transacoes":"6806","valor_total":"190656,35","lucro_total":"6414,30"},
      {"data_transacao":"21/08/2025","total_transacoes":"10119","valor_total":"288684,08","lucro_total":"9711,00"},
      {"data_transacao":"20/08/2025","total_transacoes":"6991","valor_total":"207467,63","lucro_total":"6351,90"},
      {"data_transacao":"19/08/2025","total_transacoes":"8527","valor_total":"233522,64","lucro_total":"8042,30"},
      {"data_transacao":"18/08/2025","total_transacoes":"11210","valor_total":"333283,17","lucro_total":"10003,70"},
      {"data_transacao":"17/08/2025","total_transacoes":"7923","valor_total":"234268,62","lucro_total":"6893,90"},
      {"data_transacao":"16/08/2025","total_transacoes":"1715","valor_total":"41924,72","lucro_total":"1906,70"}
    ]
  }

  return NextResponse.json(mockData)
}