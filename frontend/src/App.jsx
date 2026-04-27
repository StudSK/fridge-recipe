import { useState } from 'react'
import Upload from './pages/Upload'
import Ingredients from './pages/Ingredients'
import Recipes from './pages/Recipes'

export default function App() {
  const [stage, setStage] = useState('upload')
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  return (
    <div style={{ minHeight: '100vh', background: '#0f0e0c', color: '#f5f0e8', fontFamily: 'Arial, sans-serif' }}>
      {stage === 'upload' && (
        <Upload onDone={(ings) => { setIngredients(ings); setStage('ingredients') }} />
      )}

      {stage === 'ingredients' && (
        <Ingredients
          ingredients={ingredients}
          onDone={(recs) => { setRecipes(recs); setStage('recipes') }}
        />
      )}

      {stage === 'recipes' && (
        <Recipes recipes={recipes} onReset={() => setStage('upload')} />
      )}
    </div>
  )
}