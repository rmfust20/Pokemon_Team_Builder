#import statmenets
from bs4 import BeautifulSoup
import requests
import re

# Start at the national dex webpage since it has all the Pokemon
link = 'https://pokemondb.net/pokedex/national'
# use request to grab the page
page_response = requests.get(link, timeout=1000)
# turn it into soup object
soup = BeautifulSoup(page_response.content, features='html.parser')

# Looking at the html source of the page we can see that all the links we want are stored in this class
pokedex_links = soup.find_all("div", {"class": "infocard-list infocard-list-pkmn-lg"})

# Create a temp soup object to parse through all pokedex links
soup = BeautifulSoup(str(pokedex_links), features='html.parser')

# create a set to remove duplicates
pokedex_set = set()
for link in soup.find_all('a'):
    pokedex_set.add(link.get('href'))

# turn it back into a list so we can iterrate through it
pokedex_list = list(pokedex_set)

# add all the links that are pokedex entries
pokedex = list()
for entry in pokedex_list:
    if entry[1:4] == 'pok':
        pokedex.append(entry)

def get_type(soup):

    table = soup.select("[class~=vitals-table]")
    a_tags = table[0].find_all("a")
    primary_type = str(a_tags[0])
    primary_type = (primary_type[25:])
    locator = primary_type.find("\"")
    primary_type = primary_type[0:locator]
    secondary_type = str(a_tags[1])
    if secondary_type[3] != 'h':
        secondary_type = (secondary_type[25:])
        locator = secondary_type.find("\"")
        secondary_type = secondary_type[0:locator]

    if secondary_type[0] == '<':
        secondary_type = 'null'
    return primary_type,secondary_type


def get_abilities(soup):
    table = soup.select("[class~=vitals-table]")
    a_tags = table[0].find_all("a")
    abilities = []
    start = 0

    if get_type(soup)[1] == 'null':
        start = 1
    else:
        start = 2
    for i in range(start,len(a_tags)):
        temp_ability = str(a_tags[i])
        ability = temp_ability[18:]
        locator = ability.find("\"")
        ability = ability[0:locator]
        abilities.append(ability)
    return abilities

def get_stats(soup):
    stats = []

    tag_table = soup.find(class_= "resp-scroll")
    stats_raw = tag_table.find_all(class_="cell-num")

    for i in range(0,len(stats_raw),3):
        current_stat = str(stats_raw[i])
        stats.append(current_stat[21:-5])


    stats.pop()

    total = 0

    for stat in stats:
        total += int(stat)

    stats.append(str(total))
    return stats

def get_image(soup):
    image = soup.find_all('img')
    image = str(image[1])
    locator = image.find("src")
    return image[locator + 5:-15]

pokemond_dict = dict()

pokemond_list = []

for pokemon in pokedex:

    link = 'https://pokemondb.net' + pokemon

    page_response = requests.get(link, timeout=1000)
    # Structure the raw data so that we can parse it
    soup = BeautifulSoup(page_response.content, features='html.parser')

    name = soup.find('h1').string
    type = get_type(soup)
    abilities = get_abilities(soup)
    stats = get_stats(soup)
    picture = get_image(soup)

    pokemond_dict[name] = {
        'name' : name,
        'type' : type,
        'abilities' : abilities,
        'stats' : stats[0:-1],
        'total' : int(stats[-1]),
        'picture' : picture
    }











