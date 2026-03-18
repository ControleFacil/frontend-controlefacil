"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  Divida,
  getDividas,
  deleteDivida,
  pagarTudo,
  pagarParcela
} from "@/http/api/dashboard/dashboardService"

import DividaFormModal from "./DividasFormModal"
import DividaDetailsModal from "./DividaDetailsModal"

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import { Pencil, Trash2, CreditCard } from "lucide-react"

export default function Dividas() {

  const [dividas, setDividas] = useState<Divida[]>([])
  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState<Divida | null>(null)
  const [openForm, setOpenForm] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const loadDividas = async () => {
    setLoading(true)
    const data = await getDividas()
    setDividas(data)
    setLoading(false)
  }

  useEffect(() => {
    loadDividas()
  }, [])

  const totalRestante = dividas.reduce(
    (acc, d) => acc + d.valorRestante,
    0
  )

  const totalDividas = dividas.length

  const ativas = dividas.filter(d => !d.quitada).length

  const chartData = dividas.map(d => ({
    name: d.nomeCredor,
    restante: d.valorRestante
  }))

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">

            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                Suas Dívidas
                </h2>
                <p className="text-sm text-gray-500">
                Gerencie e acompanhe seus parcelamentos
                </p>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                setSelected(null)
                setOpenForm(true)
                }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-sm"
            >
                + Nova dívida
            </motion.button>

            </div>
      {/* ESTATISTICAS */}
    
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total de dívidas</p>
          <h3 className="text-2xl font-bold">{totalDividas}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Valor restante</p>
          <h3 className="text-2xl font-bold text-red-500">
            R$ {totalRestante.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Dívidas ativas</p>
          <h3 className="text-2xl font-bold">{ativas}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Parcelamentos</p>
          <h3 className="text-2xl font-bold">
            {dividas.reduce(
              (a, d) => a + (d.quantidadeParcelas ?? 0),
              0
            )}
          </h3>
        </div>

      </div>

      {/* GRAFICO */}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

        <h3 className="font-semibold mb-4">
          Evolução das Dívidas
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="restante"
              stroke="#7c3aed"
              fill="#c4b5fd"
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

      {/* LISTA */}

      <div className="space-y-4">

        {dividas.map((divida, index) => (

          <motion.div
            key={divida.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
          >

            <div>

              <h3 className="font-semibold">
                {divida.nomeCredor}
              </h3>

              <p className="text-sm text-gray-500">
                Categoria: {divida.categoria}
              </p>

              {divida.quantidadeParcelas && (
                <p className="text-sm">
                  Parcelas: {divida.parcelasPagas}/{divida.quantidadeParcelas}
                </p>
              )}

            </div>

            <div className="text-right">

              <p className="font-semibold text-red-500">
                R$ {divida.valorRestante.toFixed(2)}
              </p>

              <div className="flex gap-2 mt-2 justify-end">

                <button
                  onClick={() => {
                    setSelected(divida)
                    setOpenForm(true)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Pencil size={18}/>
                </button>

                <button
                  onClick={async () => {
                    await deleteDivida(divida.id)
                    loadDividas()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Trash2 size={18}/>
                </button>

                {!divida.quitada && divida.tipo === "PARCELADA" && (
                  <button
                    onClick={async () => {
                      await pagarParcela(divida.id)
                      loadDividas()
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <CreditCard size={18}/>
                  </button>
                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      <DividaFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        divida={selected}
        reload={loadDividas}
      />

      <DividaDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        divida={selected}
        reload={loadDividas}
      />

    </div>
  )
}