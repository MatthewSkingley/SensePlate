from pymongo import MongoClient
import json
import random
import datetime

food_list = ['apple','mars bar','brocolli','banana','chicken(raw)','spring onion','orange','carrot','pizza','cheddar','chocolate','cheerios']

def main():
    client = MongoClient('mongodb://senseplate:project19@127.0.0.1:27017/')
    db = client["data"]
    foods = db["foods"]

    foods.insert_one({  "Timestamp": datetime.datetime.utcnow(), #iso 8601
                        "Food": random.choice(food_list),
                        "Weight": random.randint(0,200) })

if __name__ == "__main__":
    main()