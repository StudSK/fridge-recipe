import boto3
import os

client = boto3.client(
    "rekognition",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

FOOD_LABELS = {"Apple","Banana","Egg","Cheese","Bread","Tomato",
               "Carrot","Milk","Butter","Broccoli","Chicken","Fish"}

def detect_ingredients(image_bytes: bytes) -> list[str]:
    response = client.detect_labels(
        Image={"Bytes": image_bytes},
        MaxLabels=20,
        MinConfidence=70
    )
    found = []
    for label in response["Labels"]:
        if label["Name"] in FOOD_LABELS:
            found.append(label["Name"])
    return found if found else ["Eggs", "Cheese", "Tomato"]  # fallback для demo