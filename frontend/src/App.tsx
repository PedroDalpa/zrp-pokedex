import React, { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [abilities, setAbilities] = useState<string[] | null>(null)

  const searchPokemon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return

    setAbilities(null)

    try {
      const response = await fetch(
        `http://localhost:3000/api/pokemons/${search.toLowerCase()}`
      )
      if (!response.ok) throw new Error('Pokémon not found')
      const { data } = await response.json()
      console.log(data)

      setAbilities(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="pokedex-border rounded-3xl p-8 relative">
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="led led-blue animate-blink"></div>
            <div className="led led-red"></div>
            <div className="led led-yellow"></div>
            <div className="led led-green"></div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-8 mt-4">
            Pokédex
          </h1>

          <form onSubmit={searchPokemon} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Pokémon name..."
                className="w-full px-6 py-4 rounded-xl bg-gray-100 border-2 border-gray-800 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:bg-[#036daf] transition-colors duration-200 bg-[#28AAFE] py-2 px-6 rounded-lg shadow-lg text-lg"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="pokedex-screen rounded-xl p-6 relative overflow-hidden">
            {abilities && (
              <div className="animate-fade-in relative scanning">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-600 pb-2">
                    Habilidades
                  </h3>
                  <div className="grid gap-2">
                    {abilities.map((ability, index) => (
                      <div
                        key={index}
                        className="bg-white/80 p-3 rounded-lg flex items-center justify-between"
                      >
                        <span className="capitalize text-gray-800">
                          {ability.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-800"></div>
            <div className="flex gap-2">
              <div className="w-8 h-2 bg-gray-800 rounded"></div>
              <div className="w-8 h-2 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
