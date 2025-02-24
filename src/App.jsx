import { useEffect, useState } from 'react'

function App() {
  const [bancoDeMexicoData, setbancoDeMexicoData] = useState(null)

  const BASE_URL = import.meta.env.VITE_BANXICO_BASE_URL
  const TOKEN = import.meta.env.VITE_BANXICO_TOKEN

  const fetchDatosTipoCambio = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Bmx-Token": TOKEN
        }
      })

      const data = await response.json()
      setbancoDeMexicoData(data)

      console.log(data)
    } catch (error) {
      console.log("ERROR CON EL FETCH DE DATOS TIPO CAMBIO", error)
    }
  }

  useEffect(() => {
    fetchDatosTipoCambio()
  }, [])

  const renderTable = () => {
    if (!bancoDeMexicoData) return null;

    const datos = bancoDeMexicoData.bmx.series[0]?.datos;

    if (!datos || datos.length === 0) return <p className="text-center text-lg text-gray-500">No data available</p>;

    return (
      <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Tipo de Cambio</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{item.fecha}</td>
                <td className="py-3 px-6">{item.dato}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-semibold text-center mb-5">Datos del Banco de México</h1>
      {renderTable()}
    </div>
  )
}

export default App

