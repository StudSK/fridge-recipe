import { useState } from 'react'
import { getRecipes } from '../api/client'

export default function Ingredients({ ingredients, onDone }) {
  const [selected, setSelected] = useState(ingredients)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = (ingredient) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await getRecipes(selected)
      onDone(res.data.recipes)
    } catch (e) {
      setError('Failed to generate recipes. Check backend and AI API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 650, margin: '0 auto', padding: '70px 24px' }}>
      <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>
        Found ingredients
      </h2>

      <p style={{ color: 'rgba(245,240,232,0.55)', marginBottom: 32 }}>
        Select ingredients you want to use in the recipes.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
        {ingredients.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => toggle(ingredient)}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              cursor: 'pointer',
              fontSize: 15,
              background: selected.includes(ingredient)
                ? 'rgba(245,158,11,0.22)'
                : 'rgba(245,240,232,0.06)',
              border: selected.includes(ingredient)
                ? '1px solid #f59e0b'
                : '1px solid rgba(245,240,232,0.12)',
              color: '#f5f0e8'
            }}
          >
            {ingredient}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || selected.length === 0}
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          border: 'none',
          borderRadius: 12,
          padding: '16px 34px',
          color: '#0f0e0c',
          fontWeight: 800,
          fontSize: 16,
          cursor: 'pointer',
          opacity: loading || selected.length === 0 ? 0.6 : 1
        }}
      >
        {loading ? 'Generating recipes...' : 'Generate recipes'}
      </button>

      {error && <div style={{ color: '#ef4444', marginTop: 18 }}>{error}</div>}
    </div>
  )
}