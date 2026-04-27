from fastapi import FastAPI, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, get_db, Recipe
from rekognition import detect_ingredients
from openai import AzureOpenAI
import os, json
from dotenv import load_dotenv

load_dotenv()
Base.metadata.create_all(engine)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return {"status": "FridgeAI backend running"}

@app.post("/api/analyze")
async def analyze_image(file: UploadFile):
    contents = await file.read()
    ingredients = detect_ingredients(contents)
    return {"ingredients": ingredients}

@app.post("/api/recipes")
async def get_recipes(data: dict, db: Session = Depends(get_db)):
    ingredients = data.get("ingredients", [])
    
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL")
    )
    
    prompt = f"""You are a chef. Given these ingredients: {', '.join(ingredients)}
    Generate 3 recipes. Return ONLY valid JSON array:
    [{{"name":"...","time":"...","difficulty":"Easy/Medium/Hard",
      "calories":300,"tags":["tag1"],"ingredients":["..."],
      "steps":["step1","step2"],"tip":"..."}}]"""
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    recipes = json.loads(response.choices[0].message.content)
    
    # Сохраняем в БД
    for r in recipes:
        db.add(Recipe(
            name=r["name"],
            ingredients=json.dumps(r["ingredients"]),
            steps=json.dumps(r["steps"])
        ))
    db.commit()
    
    return {"recipes": recipes}

@app.get("/api/history")
def get_history(db: Session = Depends(get_db)):
    recipes = db.query(Recipe).order_by(Recipe.created_at.desc()).limit(10).all()
    return {"recipes": [{"id": r.id, "name": r.name, 
                         "created_at": str(r.created_at)} for r in recipes]}