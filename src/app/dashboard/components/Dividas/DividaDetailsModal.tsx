"use client"

import { Divida, pagarTudo, pagarParcelas } from "@/http/api/dashboard/dashboardService"

interface Props {
  open: boolean
  onClose: () => void
  divida: Divida | null
  reload: () => void
}

export default function DividaDetailsModal({
  open,
  onClose,
  divida,
  reload
}: Props) {

  if (!open || !divida) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-[500px] space-y-4">

        <h2 className="text-xl font-bold">
          {divida.nomeCredor}
        </h2>

        <p className="text-gray-500">
          Categoria: {divida.categoria}
        </p>

        <p>
          Tipo: {divida.tipo}
        </p>

        {divida.quantidadeParcelas && (
          <p>
            Parcelas pagas: {divida.parcelasPagas} / {divida.quantidadeParcelas}
          </p>
        )}

        <p>
          Valor pago: R$ {divida.valorPago.toFixed(2)}
        </p>

        <p className="font-semibold text-red-500">
          Valor restante: R$ {divida.valorRestante.toFixed(2)}
        </p>

        <div className="flex gap-3 pt-3">

          {!divida.quitada && (
            <button
              onClick={async () => {
                await pagarTudo(divida.id)
                reload()
                onClose()
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg"
            >
              Pagar tudo
            </button>
          )}

          {!divida.quitada && divida.tipo === "PARCELADA" && (
            <button
              onClick={async () => {
                await pagarParcelas(divida.id, 2)
                reload()
              }}
              className="bg-purple-600 text-white px-3 py-2 rounded-lg"
            >
              Pagar 2 parcelas
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-gray-100 px-3 py-2 rounded-lg"
          >
            Fechar
          </button>

        </div>

      </div>

    </div>
  )
}