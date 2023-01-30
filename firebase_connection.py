import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pokemon_teambuilder import pokemond_dict

# Use a service account.
cred = credentials.Certificate('teambuilder.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()



for key in pokemond_dict.keys():
  doc_ref = db.collection('Pogmons').document(key)
  doc_ref.set({
          'primary_type': pokemond_dict[key]['type'][0],
          'secondary_type': pokemond_dict[key]['type'][1],
          'abilities': pokemond_dict[key]['abilities'],
          'hp' : pokemond_dict[key]['stats'][0],
          'attack' : pokemond_dict[key]['stats'][1],
          'defense' : pokemond_dict[key]['stats'][2],
          'special_attack' : pokemond_dict[key]['stats'][3],
          'special_defense' : pokemond_dict[key]['stats'][4],
          'speed' : pokemond_dict[key]['stats'][5],
          'total' : pokemond_dict[key]['total'],
          'picture' : pokemond_dict[key]['picture']
  })

