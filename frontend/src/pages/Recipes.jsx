import { useState } from 'react'

export default function Recipes({ recipes, onReset }) {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '60px 24px' }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(245,240,232,0.6)',
            cursor: 'pointer',
            marginBottom: 32
          }}
        >
          ← Back to recipes
        </button>

        <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 18 }}>
          {selected.name}
        </h2>

        <div style={{ display: 'flex', gap: 22, color: 'rgba(245,240,232,0.6)', marginBottom: 32 }}>
          <span>⏱ {selected.time}</span>
          <span>📊 {selected.difficulty}</span>
          <span>🔥 {selected.calories} kcal</span>
        </div>

        <h3 style={{ color: '#f59e0b', fontSize: 14, marginBottom: 14 }}>
          INGREDIENTS
        </h3>

        {selected.ingredients?.map((ingredient, index) => (
          <div
            key={index}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid rgba(245,240,232,0.08)'
            }}
          >
            {ingredient}
          </div>
        ))}

        <h3 style={{ color: '#f59e0b', fontSize: 14, margin: '32px 0 14px' }}>
          STEPS
        </h3>

        {selected.steps?.map((step, index) => (
          <div key={index} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(245,158,11,0.2)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              {index + 1}
            </div>
            <div style={{ lineHeight: 1.6 }}>{step}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '70px 24px' }}>
      <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>
        Your recipes
      </h2>

      <p style={{ color: 'rgba(245,240,232,0.55)', marginBottom: 32 }}>
        Click a recipe to view details.
      </p>

      {recipes.map((recipe, index) => (
        <div
          key={index}
          onClick={() => setSelected(recipe)}
          style={{
            padding: 24,
            borderRadius: 16,
            marginBottom: 16,
            cursor: 'pointer',
            background: 'rgba(245,240,232,0.04)',
            border: '1px solid rgba(245,240,232,0.1)'
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
            {recipe.name}
          </h3>

          <div style={{ color: 'rgba(245,240,232,0.55)', display: 'flex', gap: 20 }}>
            <span>⏱ {recipe.time}</span>
            <span>📊 {recipe.difficulty}</span>
            <span>🔥 {recipe.calories} kcal</span>
          </div>
        </div>
      ))}

      <button
        onClick={onReset}
        style={{
          marginTop: 18,
          background: 'none',
          border: '1px solid rgba(245,240,232,0.2)',
          borderRadius: 10,
          padding: '12px 24px',
          color: 'rgba(245,240,232,0.7)',
          cursor: 'pointer'
        }}
      >
        ← Start over
      </button>
    </div>
  )
}