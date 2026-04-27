import { useRef, useState } from 'react'
import { analyzeImage } from '../api/client'

export default function Upload({ onDone }) {
  const fileRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file) => {
    if (!file) return

    setLoading(true)
    setError('')

    try {
      const res = await analyzeImage(file)
      onDone(res.data.ingredients)
    } catch (e) {
      setError('Failed to analyze image. Check that backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 650, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 24 }}>🍳</div>

      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>
        FridgeAI
      </h1>

      <p style={{ color: 'rgba(245,240,232,0.55)', marginBottom: 48, fontSize: 18 }}>
        Upload a fridge photo and generate recipes from detected ingredients
      </p>

      <div
        onClick={() => fileRef.current.click()}
        style={{
          border: '2px dashed rgba(245,240,232,0.25)',
          borderRadius: 20,
          padding: '60px 40px',
          cursor: 'pointer',
          background: 'rgba(245,240,232,0.03)'
        }}
      >
        {loading ? (
          <>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🔍</div>
            <div style={{ color: '#f59e0b' }}>Analyzing image with AWS Rekognition...</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 42, marginBottom: 12 }}>📸</div>
            <div style={{ fontSize: 18, marginBottom: 8 }}>Click to upload photo</div>
            <div style={{ color: 'rgba(245,240,232,0.45)', fontSize: 14 }}>
              JPG or PNG
            </div>
          </>
        )}
      </div>

      {error && <div style={{ color: '#ef4444', marginTop: 18 }}>{error}</div>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}