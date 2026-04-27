import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
})

export const analyzeImage = (file) => {
  const form = new FormData()
  form.append('file', file)
  return api.post('/api/analyze', form)
}

export const getRecipes = (ingredients) => {
  return api.post('/api/recipes', { ingredients })
}