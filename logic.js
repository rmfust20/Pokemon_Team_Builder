
// database authentication
const firebaseConfig = {
  // login information to database
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

//create a db object to interaface with the database

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// we want to setup a dictionary so that we don't have to keep pulling from the database
var pokemon_dict = {};


const pokemon_list =
['Murkrow', 'Miraidon', 'Torkoal', 'Meowstic', 'Stantler', 'Zoroark', 'Cutiefly', 'Venomoth', 'Bellsprout', 'Alcremie', 'Flutter Mane', 'Bulbasaur', 'Linoone', 'Primeape', 'Croagunk', 'Noibat', 'Emolga', 'Exeggutor', 'Ursaring', 'Natu', 'Ursaluna', 'Espurr', 'Pinsir', 'Dustox', 'Haxorus', 'Fuecoco', 'Gallade', 'Buneary', 'Buzzwole', 'Igglybuff', 'Heracross', 'Krookodile', 'Cinderace', 'Pansear', 'Avalugg', 'Flamigo', "Sirfetch'd", 'Luvdisc', 'Gumshoos', 'Sneasel', 'Tapu Fini', 'Bagon', 'Greedent', 'Minior', 'Skwovet', 'Toxtricity', 'Excadrill', 'Kirlia', 'Axew', 'Duskull', 'Latios', 'Pawmot', 'Nuzleaf', 'Cloyster', 'Ambipom', 'Litten', 'Quaxly', 'Blitzle', 'Tepig', 'Jigglypuff', 'Sigilyph', 'Iron Moth', 'Jynx', 'Zarude', 'Lunatone', 'Drifblim', 'Salazzle', 'Nidorino', 'Feraligatr', 'Dubwool', 'Tinkaton', 'Surskit', 'Gorebyss', 'Raticate', 'Sandaconda', 'Hitmonchan', 'Totodile', 'Rampardos', 'Dondozo', 'Salandit', 'Masquerain', 'Bouffalant', 'Manectric', 'Lileep', 'Magearna', 'Wimpod', 'Weavile', 'Jumpluff', 'Electabuzz', 'Staraptor', 'Makuhita', 'Politoed', 'Naclstack', 'Wooloo', 'Kleavor', 'Clawitzer', 'Spectrier', 'Shiftry', 'Golem', 'Poliwag', 'Shieldon', 'Dunsparce', 'Chimecho', 'Tynamo', 'Arcanine', 'Chinchou', 'Grafaiai', 'Pignite', 'Dewgong', 'Hariyama', 'Lotad', 'Metang', 'Obstagoon', 'Houndstone', 'Drampa', 'Urshifu', 'Bayleef', 'Skrelp', 'Rabsca', 'Snubbull', 'Dartrix', 'Simisage', 'Vullaby', 'Clauncher', 'Butterfree', 'Shroodle', 'Swoobat', 'Revavroom', 'Aipom', 'Pachirisu', 'Coalossal', 'Lumineon', 'Dachsbun', 'Minccino', 'Weedle', 'Silvally', 'Unfezant', 'Hoppip', 'Blissey', 'Bibarel', 'Kricketune', 'Cinccino', 'Ting-Lu', 'Donphan', 'Treecko', 'Barbaracle', 'Rufflet', 'Gengar', 'Quaquaval', 'Thwackey', 'Fidough', 'Sawsbuck', 'Kingdra', 'Crabrawler', 'Iron Jugulis', 'Aron', 'Gulpin', 'Pichu', 'Scovillain', 'Woobat', 'Octillery', 'Pikipek', 'Machop', 'Walrein', 'Gossifleur', 'Victini', 'Galvantula', 'Beartic', 'Tangrowth', 'Bombirdier', 'Raikou', 'Huntail', 'Iron Treads', 'Cherubi', 'Voltorb', 'Charmeleon', 'Leavanny', 'Froslass', 'Pangoro', 'Dragapult', 'Aurorus', 'Mantyke', 'Flygon', 'Crustle', 'Zygarde', 'Rolycoly', 'Tadbulb', 'Conkeldurr', 'Sunkern', 'Fraxure', 'Arctibax', 'Rowlet', 'Kommo-o', 'Bounsweet', 'Marshadow', 'Hattrem', 'Dratini', 'Terrakion', 'Tyrantrum', 'Oddish', 'Fearow', 'Hydreigon', 'Jangmo-o', 'Naganadel', 'Poliwhirl', 'Mewtwo', 'Persian', 'Pawmi', 'Torracat', 'Espathra', 'Groudon', 'Lurantis', 'Tarountula', 'Thievul', 'Tsareena', 'Chingling', 'Yamper', 'Malamar', 'Silicobra', 'Lycanroc', 'Spewpa', 'Monferno', 'Minun', 'Drapion', 'Delibird', 'Basculegion', 'Sawk', 'Thundurus', 'Cresselia', 'Nymble', 'Grimmsnarl', 'Ekans', 'Mudkip', 'Piplup', 'Honchkrow', 'Deino', 'Wooper', 'Cofagrigus', 'Melmetal', 'Swablu', 'Charizard', 'Wynaut', 'Zweilous', 'Binacle', 'Skorupi', 'Chespin', 'Flaaffy', 'Dialga', 'Cursola', 'Deerling', 'Combee', 'Lanturn', 'Hitmontop', 'Pidgey', 'Medicham', 'Marowak', 'Claydol', 'Mothim', 'Gardevoir', 'Blastoise', 'Arboliva', 'Baxcalibur', 'Lillipup', 'Rapidash', 'Clodsire', 'Karrablast', 'Kricketot', 'Tranquill', 'Sunflora', 'Beautifly', 'Wiglett', 'Eternatus', 'Grookey', 'Giratina', 'Hippowdon', 'Glimmora', 'Azurill', 'Roselia', 'Gligar', 'Rhyhorn', 'Tapu Lele', 'Rillaboom', 'Magmar', 'Eelektrik', 'Illumise', 'Silcoon', 'Hitmonlee', 'Swinub', 'Swampert', 'Amoonguss', 'Cleffa', 'Pelipper', 'Archeops', 'Calyrex', 'Tinkatink', 'Wugtrio', 'Hatenna', 'Alakazam', 'Virizion', 'Zebstrika', 'Simipour', 'Arctozolt', 'Magnemite', 'Dudunsparce', 'Sinistea', 'Kangaskhan', 'Zubat', 'Joltik', 'Glameow', 'Toxel', 'Klinklang', 'Finizen', 'Mr. Mime', 'Registeel', 'Glaceon', 'Rhydon', 'Trapinch', 'Geodude', 'Meditite', 'Seaking', 'Goomy', 'Klang', 'Ferrothorn', 'Inkay', 'Crabominable', 'Pheromosa', 'Eiscue', 'Regidrago', 'Porygon-Z', 'Aegislash', 'Spearow', 'Dwebble', 'Bellossom', 'Barboach', 'Wartortle', 'Type: Null', 'Nihilego', 'Banette', 'Klink', 'Gothitelle', 'Zapdos', 'Tentacool', 'Quilava', 'Eelektross', 'Druddigon', 'Beheeyem', 'Gholdengo', 'Weepinbell', 'Cacturne', 'Chien-Pao', 'Slurpuff', 'Volcanion', 'Delphox', 'Palossand', 'Wobbuffet', 'Exploud', 'Latias', 'Gothorita', 'Crocalor', 'Electrike', 'Lickitung', 'Cosmoem', 'Sandy Shocks', 'Psyduck', 'Darmanitan', 'Amaura', 'Girafarig', 'Staryu', 'Umbreon', 'Foongus', 'Cascoon', 'Cobalion', 'Comfey', 'Indeedee', 'Iron Bundle', 'Applin', 'Spinda', 'Slowbro', 'Azumarill', 'Carvanha', 'Feebas', 'Chansey', 'Croconaw', 'Swanna', 'Swirlix', 'Bewear', 'Orthworm', 'Dewott', 'Klawf', 'Rellor', 'Rayquaza', 'Simisear', 'Greninja', 'Carnivine', 'Nosepass', 'Darumaka', 'Scizor', 'Tyrogue', 'Blipbug', 'Cramorant', 'Polteageist', 'Nidorina', 'Volcarona', 'Falinks', 'Cosmog', 'Riolu', 'Wyrdeer', 'Rattata', 'Noivern', 'Meowth', 'Pawmo', 'Vanillite', 'Kyogre', 'Aromatisse', 'Elgyem', 'Yamask', 'Skeledirge', 'Pincurchin', 'Lombre', 'Solrock', 'Escavalier', 'Mime Jr.', 'Mienshao', 'Shinx', 'Koffing', 'Trumbeak', 'Anorith', 'Incineroar', 'Ditto', 'Braviary', 'Misdreavus', 'Luxray', 'Phantump', 'Venusaur', 'Forretress', 'Togetic', 'Varoom', 'Koraidon', 'Marshtomp', 'Durant', 'Lampent', 'Plusle', 'Squawkabilly', 'Onix', 'Quilladin', 'Gliscor', 'Taillow', 'Kubfu', 'Metapod', 'Bronzor', 'Talonflame', 'Jellicent', 'Sneasler', 'Dolliv', 'Golbat', 'Quagsire', 'Delcatty', 'Porygon', 'Timburr', 'Eldegoss', 'Omastar', 'Exeggcute', 'Ludicolo', 'Volbeat', 'Rhyperior', 'Trubbish', 'Helioptile', 'Spinarak', 'Kecleon', 'Shiinotic', 'Sizzlipede', 'Cyclizar', 'Poipole', 'Ho-oh', 'Tropius', 'Gyarados', 'Kingler', 'Parasect', 'Shuppet', 'Empoleon', 'Palkia', 'Electivire', 'Regigigas', 'Pancham', 'Fennekin', 'Beldum', 'Boldore', 'Sylveon', 'Nincada', 'Wigglytuff', 'Primarina', 'Necrozma', 'Morgrem', 'Clefable', 'Ledian', 'Meganium', 'Fletchling', 'Bergmite', 'Gigalith', 'Lopunny', 'Vibrava', 'Staravia', 'Chatot', 'Arceus', 'Boltund', 'Furret', 'Crawdaunt', 'Carracosta', 'Litwick', 'Doduo', 'Fletchinder', 'Florges', 'Impidimp', 'Garbodor', 'Skarmory', 'Purrloin', 'Vanilluxe', 'Diggersby', 'Maschiff', 'Spheal', 'Mr. Rime', 'Farigiraf', 'Sudowoodo', 'Dragonair', 'Whirlipede', 'Dhelmise', 'Milcery', 'Celebi', 'Turtwig', 'Golduck', 'Torchic', 'Komala', 'Rookidee', 'Omanyte', 'Roserade', 'Ducklett', 'Starly', 'Munna', 'Oinkologne', 'Sharpedo', 'Flapple', 'Ferroseed', 'Petilil', 'Mienfoo', 'Tatsugiri', 'Torterra', 'Kingambit', 'Solosis', 'Swadloon', 'Deoxys', 'Alomomola', 'Toxapex', 'Iron Hands', 'Whismur', 'Fomantis', 'Tauros', 'Phione', 'Vivillon', 'Oshawott', 'Samurott', 'Decidueye', 'Accelgor', 'Clobbopus', 'Grapploct', 'Sandile', 'Bisharp', 'Heliolisk', 'Chi-Yu', 'Snorlax', 'Electrode', 'Regice', 'Sewaddle', 'Grotle', 'Toxicroak', 'Oranguru', 'Kilowattrel', 'Abomasnow', 'Flabébé', 'Tyranitar', 'Muk', 'Hoothoot', 'Machamp', 'Drowzee', 'Slowking', 'Trevenant', 'Slugma', 'Chikorita', 'Lechonk', 'Greavard', 'Mandibuzz', 'Golett', 'Beedrill', 'Braixen', 'Diglett', 'Nidoqueen', 'Yungoos', 'Sandslash', 'Scraggy', 'Spidops', 'Slaking', 'Lugia', 'Mabosstiff', 'Sableye', 'Mankey', 'Snom', 'Flittle', 'Happiny', 'Glalie', 'Buizel', 'Gothita', 'Grovyle', 'Dottler', 'Stunky', 'Sandygast', 'Dusclops', 'Jirachi', 'Zekrom', 'Drizzile', 'Quaxwell', 'Klefki', 'Raichu', 'Golisopod', 'Charmander', 'Finneon', 'Vanillish', 'Cetitan', 'Toucannon', 'Seel', 'Herdier', 'Brute Bonnet', 'Combusken', 'Pyroar', 'Enamorus', 'Vileplume', 'Veluza', 'Pidgeot', 'Maushold', 'Patrat', 'Drilbur', 'Diancie', 'Furfrou', 'Gloom', 'Snover', 'Burmy', 'Tandemaus', 'Araquanid', 'Raboot', 'Suicune', 'Zangoose', 'Slakoth', 'Dedenne', 'Marill', 'Bunnelby', 'Pidgeotto', 'Wailord', 'Ponyta', 'Sobble', 'Nidoran♀ (female)', 'Lickilicky', 'Magmortar', 'Goodra', 'Liepard', 'Nacli', 'Wo-Chien', 'Jolteon', 'Unown', 'Chewtle', 'Throh', 'Landorus', 'Glastrier', 'Mudbray', 'Shaymin', 'Chimchar', 'Wurmple', 'Audino', 'Roaring Moon', 'Ribombee', 'Magnezone', 'Pansage', 'Granbull', 'Pidove', 'Aggron', 'Seviper', 'Miltank', 'Scream Tail', 'Lucario', 'Caterpie', 'Graveler', 'Aerodactyl', 'Snorunt', 'Noctowl', 'Dracovish', 'Bellibolt', 'Moltres', 'Mareep', 'Loudred', 'Blacephalon', 'Serperior', 'Capsakid', 'Rotom', 'Arrokuda', 'Kadabra', 'Scrafty', 'Servine', 'Clefairy', 'Gogoat', 'Pawniard', 'Appletun', 'Teddiursa', 'Magby', 'Tympole', 'Frosmoth', 'Meltan', 'Cradily', 'Dugtrio', "Farfetch'd", 'Hatterene', 'Kakuna', 'Starmie', 'Spiritomb', 'Cetoddle', 'Vaporeon', 'Articuno', 'Houndoom', 'Honedge', 'Garganacl', 'Floragato', 'Skiddo', 'Goldeen', 'Kabuto', 'Shuckle', 'Brionne', 'Grumpig', 'Pikachu', 'Ampharos', 'Relicanth', 'Breloom', 'Ninjask', 'Dragonite', 'Stoutland', 'Whimsicott', 'Regieleki', 'Krokorok', 'Meowscarada', 'Tapu Koko', 'Metagross', 'Toedscruel', 'Eevee', 'Dragalge', 'Abra', 'Zorua', 'Lokix', 'Panpour', 'Slither Wing', 'Xatu', 'Kabutops', 'Mawile', 'Maractus', 'Morpeko', 'Carbink', 'Corviknight', 'Annihilape', 'Yanmega', 'Larvesta', 'Victreebel', 'Dodrio', 'Clamperl', 'Scyther', 'Magneton', 'Cyndaquil', 'Stakataka', 'Shellder', 'Watchog', 'Pumpkaboo', 'Gourgeist', 'Overqwil', 'Ninetales', 'Milotic', 'Skuntank', 'Mudsdale', 'Tinkatuff', 'Larvitar', 'Scorbunny', 'Garchomp', 'Armaldo', 'Mismagius', 'Horsea', 'Gabite', 'Meloetta', 'Nidoran♂ (male)', 'Dreepy', 'Tirtouga', 'Bidoof', 'Lapras', 'Perrserker', 'Shedinja', 'Snivy', 'Togedemaru', 'Squirtle', 'Pyukumuku', 'Drakloak', 'Solgaleo', 'Keldeo', 'Yanma', 'Espeon', 'Poliwrath', 'Orbeetle', 'Copperajah', 'Zacian', 'Frillish', 'Zeraora', 'Typhlosion', 'Palafin', 'Vulpix', 'Bramblin', 'Darkrai', 'Manaphy', 'Brambleghast', 'Crobat', 'Great Tusk', 'Stonjourner', 'Venipede', 'Lilligant', 'Centiskorch', 'Smeargle', 'Bonsly', 'Wingull', 'Litleo', 'Altaria', 'Arctovish', 'Iron Thorns', 'Absol', 'Skiploom', 'Salamence', 'Luxio', 'Mimikyu', 'Pupitar', 'Barraskewda', 'Magikarp', 'Tangela', 'Inteleon', 'Flareon', 'Togekiss', 'Frigibax', 'Elekid', 'Vigoroth', 'Dewpider', 'Grimer', 'Ariados', 'Froakie', 'Turtonator', 'Regirock', 'Wormadam', 'Qwilfish', 'Drifloon', 'Baltoy', 'Mesprit', 'Roggenrola', 'Oricorio', 'Tapu Bulu', 'Vespiquen', 'Cacnea', 'Dusknoir', 'Entei', 'Corvisquire', 'Hippopotas', 'Stufful', 'Remoraid', 'Uxie', 'Cherrim', 'Togepi', 'Growlithe', 'Azelf', 'Golurk', 'Hypno', 'Duosion', 'Wailmer', 'Lunala', 'Xerneas', 'Steelix', 'Numel', 'Houndour', 'Leafeon', 'Floette', 'Spritzee', 'Budew', 'Scolipede', 'Whiscash', 'Charcadet', 'Palpitoad', 'Cufant', 'Dracozolt', 'Shroomish', 'Nickit', 'Slowpoke', 'Hakamo-o', 'Guzzlord', 'Lairon', 'Pineco', 'Mantine', 'Duraludon', 'Ceruledge', 'Drednaw', 'Kartana', 'Mightyena', 'Cryogonal', 'Runerigus', 'Frogadier', 'Vikavolt', 'Smoliv', 'Passimian', 'Charjabug', 'Gimmighoul', 'Shelmet', 'Tyrunt', 'Gurdurr', 'Cubchoo', 'Armarouge', 'Shellos', 'Basculin', 'Phanpy', 'Sliggoo', 'Kyurem', 'Cubone', 'Gastly', 'Genesect', 'Rockruff', 'Castform', 'Porygon2', 'Probopass', 'Shelgon', 'Steenee', 'Cottonee', 'Corsola', 'Emboar', 'Xurkitree', 'Doublade', 'Hawlucha', 'Wishiwashi', 'Seedot', 'Gastrodon', 'Hoopa', 'Smoochum', 'Chesnaught', 'Heatran', 'Floatzel', 'Mew', 'Glimmet', 'Machoke', 'Prinplup', 'Purugly', 'Yveltal', 'Toedscool', 'Chandelure', 'Reuniclus', 'Gible', 'Zamazenta', 'Sceptile', 'Skitty', 'Sandshrew', 'Seismitoad', 'Poochyena', 'Mamoswine', 'Nidoking', 'Swellow', 'Scatterbug', 'Sprigatito', 'Camerupt', 'Swalot', 'Spoink', 'Iron Valiant', 'Morelull', 'Popplio', 'Magcargo', 'Paras', 'Sentret', 'Blaziken', 'Bruxish', 'Ledyba', 'Corphish', 'Archen', 'Heatmor', 'Reshiram', 'Sealeo', 'Carkol', 'Ralts', 'Stunfisk', 'Celesteela', 'Infernape', 'Musharna', 'Cranidos', 'Munchlax', 'Grubbin', 'Zigzagoon', 'Tornadus', 'Tentacruel', 'Haunter', 'Seadra', 'Ivysaur', 'Venonat', 'Krabby', 'Weezing', 'Bastiodon', 'Bronzong', 'Piloswine', 'Mareanie', 'Arbok', 'Wattrel']

pokemon_list.sort();
for (let i = 0; i < pokemon_list.length; i++) {
  const node_one = document.createElement("a");
  const node_two = document.createElement("a");
  const node_three = document.createElement("a");
  const node_four = document.createElement("a");
  const node_five = document.createElement("a");
  const node_six = document.createElement("a");

  // Create a text node:
  const textnode_one = document.createTextNode(pokemon_list[i]);
  const textnode_two = document.createTextNode(pokemon_list[i]);
  const textnode_three = document.createTextNode(pokemon_list[i]);
  const textnode_four = document.createTextNode(pokemon_list[i]);
  const textnode_five = document.createTextNode(pokemon_list[i]);
  const textnode_six = document.createTextNode(pokemon_list[i]);

  // Append the text node to the "li" node:
  node_one.appendChild(textnode_one);
  node_two.appendChild(textnode_two);
  node_three.appendChild(textnode_three);
  node_four.appendChild(textnode_four);
  node_five.appendChild(textnode_five);
  node_six.appendChild(textnode_six);

  // Append the "li" node to the list:
  document.getElementById("myDropdown").appendChild(node_one);
  document.getElementById("myDropdown_two").appendChild(node_two);
  document.getElementById("myDropdown_three").appendChild(node_three);
  document.getElementById("myDropdown_four").appendChild(node_four);
  document.getElementById("myDropdown_five").appendChild(node_five);
  document.getElementById("myDropdown_six").appendChild(node_six);
  //document.getElementById("myDropdown_two").appendChild(node);
};




// here we will toggle our dropdwon menus
function display_pokemon_list(id) {
  document.getElementById(id).classList.toggle("show");
}

// this entire filter function is from W3 schools and allows for filtering of the dropdown menus.
function filterFunction(id_one,id_two) {
  var input, filter, ul, li, a, i;
  input = document.getElementById(id_one); // search bar
  filter = input.value.toUpperCase(); // our current search
  div = document.getElementById(id_two); // the container of the table
  a = div.getElementsByTagName("a"); // a is now a list of all the attributes in the table
  for (i = 0; i < a.length; i++) { // loop through all the attributes
    txtValue = a[i].textContent || a[i].innerText; // txtvalue = the current attributes in text form
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}



// these event listeners look for add_pokemon and suggest_pokemon buttons being clicked.

document.getElementById("myDropdown").addEventListener('click', function() {
  select_pokemon("myInput",'one',"myDropdown");
});

document.getElementById("mySuggestion_one").addEventListener('click', function() {
  suggest_pokemon('one');
});


document.getElementById("myDropdown_two").addEventListener('click',function() {
  select_pokemon("myInput_two",'two',"myDropdown_two");
});

document.getElementById("mySuggestion_two").addEventListener('click', function() {
  suggest_pokemon('two');
});

document.getElementById("myDropdown_three").addEventListener('click',function() {
  select_pokemon("myInput_three",'three',"myDropdown_three");
});

document.getElementById("mySuggestion_three").addEventListener('click', function() {
  suggest_pokemon('three');
});

document.getElementById("myDropdown_four").addEventListener('click', function() {
  select_pokemon("myInput_four",'four',"myDropdown_four");
});

document.getElementById("mySuggestion_four").addEventListener('click', function() {
  suggest_pokemon('four');
});


document.getElementById("myDropdown_five").addEventListener('click',function() {
  select_pokemon("myInput_five",'five',"myDropdown_five");
});

document.getElementById("mySuggestion_five").addEventListener('click', function() {
  suggest_pokemon('five');
});

document.getElementById("myDropdown_six").addEventListener('click',function() {
  select_pokemon("myInput_six",'six',"myDropdown_six");
});

document.getElementById("mySuggestion_six").addEventListener('click', function() {
  suggest_pokemon('six');
});

// this function identifies the pokemon selected by the user and passes that pokemon into insert_pokemon
function select_pokemon(input,slot,id) {
  var element = event.target;
  input = document.getElementById(input);
  if (element.tagName == 'A'){
  input.value = element.textContent;
  populate_pokemon(slot,element.textContent);
  document.getElementById(id).classList.toggle("show");
  }
}

// this function suggests a pokemon based on the users current team
function suggest_pokemon(slot) {
  // look at our current team
  // query a subset of pokemon that fit our type criteria
  // narrow our subset by stat total
  let keys = Object.keys(current_team);
  let dictLength = keys.length;
  if (dictLength) {
    //find types that would be beneficial
    type_reccomendation_list = get_type_reccomendation_list(slot);
    //find the stat range we want
    average_stat_total = get_average_stat_total(slot);
    average_stat_total = average_stat_total / keys.length;
    //add possible pokemon to a list
    var suggested_list = [];

    db.collection("Pogmons").where("primary_type", "in", type_reccomendation_list).where("total", ">", average_stat_total - 30).where("total", "<", average_stat_total + 30)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            suggested_list.push(doc.id);
        });
        let randomIndex = Math.floor(Math.random() * suggested_list.length);
        let randomValue = suggested_list[randomIndex];
        populate_pokemon(slot,randomValue);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    console.log("hello");

  } else {
    let randomIndex = Math.floor(Math.random() * pokemon_list.length);
    let randomValue = pokemon_list[randomIndex];
    populate_pokemon(slot,randomValue);
  }
}


// helper function that finds the types that the team would benefit from
function get_type_reccomendation_list() {
  var weak_list = [];
  var reccomend_list = [];
  var final_reccomend_list = [];

  // we are checking opacity because if an opacity is > .25 it means we are weak to tha type.
  for (let type in type_dict) {
    var image = document.getElementById(type);
    if (parseFloat(image.style.opacity) > .25){
      weak_list.push(image.id);
    }
  }

  // now we want to find which types resist the types the users current team is weak to.
  for(weakness in weak_list) {
    for (type in type_dict) {
      var reccomend_candidate = weak_list[weakness] + '_2';
      if (type_dict[type]['resist'].includes(reccomend_candidate)){
        reccomend_list.push(type);
      }
    }
  }

  // here we are looking for types that resist multiple of the weaknesses found in the current team
  for (let i = 0; i < reccomend_list.length; i++){
    for (let j = i + 1; j < reccomend_list.length; j++) {
      if (reccomend_list[i] == reccomend_list[j]) {
        final_reccomend_list.push(reccomend_list[i]);
      }
    }
  }


  // we want to check the length here because there could be no type that resists multiple of our weaknesses.
  if (final_reccomend_list.length < 1) {
    while(reccomend_list.length > 10) {
      reccomend_list.pop();
    }
    return reccomend_list;
  }
  else {
    while(final_reccomend_list.length > 10) {
      final_reccomend_list.pop();
    }
    return final_reccomend_list;
  }
}

// here we want to find our average stat total of the team so that our suggestion is balanced.
function get_average_stat_total() {
  total = 0;
  for (let pokemon in current_team) {
            total += parseFloat(current_team[pokemon]['hp']) + parseFloat(current_team[pokemon]['attack']) + parseFloat(current_team[pokemon]['defense'])
             + parseFloat(current_team[pokemon]['special_attack']) + parseFloat(current_team[pokemon]['special_defense']) + parseFloat(current_team[pokemon]['speed'])
  }
  return total;
}

// below is commented out code that supports the cost efficient database approach.



function populate_pokemon(slot,pokemon) {
  console.log(pokemon);
  const pokemonCollection = db.collection("Pokemon");
  const pokemonDoc = pokemonCollection.doc(pokemon);

  // Get the document data as a snapshot
  pokemonDoc.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
      console.log(docSnapshot.data());
      } else {
      console.log("Pokemon not found");
      }
      const data = docSnapshot.data();
      const key = String(docSnapshot.id);
      pokemon_dict[key] = {
        "name" : key,
        "abilities" : data[key]['abilities'],
        "primary_type" : data[key]['primary_type'],
        "secondary_type" : data[key]['secondary_type'],
        "hp" : data[key]['hp'],
        "attack" : data[key]['attack'],
        "defense" : data[key]['defense'],
        "special_attack" : data[key]['special_attack'],
        "special_defense" : data[key]['special_defense'],
        "speed" : data[key]['speed'],
        "picture" : data[key]['picture']
      };
      insert_pokemon(slot,pokemon);
    });


}


// this dictionary tracks the current_team that our user is building.
current_team = {};

//TODO add the id parameter and we will just pass that in for element id
function insert_pokemon(slot,pokemon) {
        // replace the image with the selected pokemon
        var image = document.getElementById(slot);
        image.src = pokemon_dict[pokemon]['picture'];

        //select which list we will be adding to.
        var string_slot = String(slot)
        var listId = 'myList' + string_slot;


        // clear the list so that it resets when we choose a new pokemon
        var myList = document.getElementById(listId);
        myList.innerHTML = "";

        // fill in the list with the data of the selected pokemon.
        var type_1_html = `<li>${pokemon_dict[pokemon]['primary_type']}</li>`;
        myList.insertAdjacentHTML('beforeend', type_1_html);

        if (pokemon_dict[pokemon]['secondary_type'] != "null") {
          var type_2_html = `<li>${pokemon_dict[pokemon]['secondary_type']}</li>`;
          myList.insertAdjacentHTML('beforeend', type_2_html);
        }

        for (let i = 0; i < pokemon_dict[pokemon]['abilities'].length; i++) {
          var ability_html = `<li>${pokemon_dict[pokemon]['abilities'][i]}</li>`;
          myList.insertAdjacentHTML('beforeend', ability_html);
        }

        var hp_html = `<li>hp: ${pokemon_dict[pokemon]['hp']}</li>`;
        myList.insertAdjacentHTML('beforeend', hp_html);

        var attack_html = `<li>attack: ${pokemon_dict[pokemon]['attack']}</li>`;
        myList.insertAdjacentHTML('beforeend', attack_html);

        var defense_html = `<li>defense: ${pokemon_dict[pokemon]['defense']}</li>`;
        myList.insertAdjacentHTML('beforeend', defense_html);

        var special_attack_html = `<li>sp.atk: ${pokemon_dict[pokemon]['special_attack']}</li>`;
        myList.insertAdjacentHTML('beforeend', special_attack_html);

        var special_defense_html = `<li>sp.def: ${pokemon_dict[pokemon]['special_defense']}</li>`;
        myList.insertAdjacentHTML('beforeend', special_defense_html);

        var speed_html = `<li>speed: ${pokemon_dict[pokemon]['speed']}</li>`;
        myList.insertAdjacentHTML('beforeend', speed_html);

        // add the pokemon data to our current_team
        current_team[slot] = {
          'name' : pokemon_dict[pokemon]['name'],
          "primary_type" : pokemon_dict[pokemon]['primary_type'],
          "secondary_type" : pokemon_dict[pokemon]['secondary_type'],
          "hp" : pokemon_dict[pokemon]['hp'],
          "attack" : pokemon_dict[pokemon]['attack'],
          "defense" : pokemon_dict[pokemon]['defense'],
          "special_attack" : pokemon_dict[pokemon]['special_attack'],
          "special_defense" : pokemon_dict[pokemon]['special_defense'],
          "speed" : pokemon_dict[pokemon]['speed']
        }
        update_weak_resit();
       }

// this dictionary adds logic for pokemon type charts
type_dict = {
  'bug' : {
    'weak' : ['fire','flying','rock'],
    'resist' : ['grass_2','fighting_2','ground_2']
  },
  'dark' : {
    'weak' : ['fighting','bug','fairy'],
    'resist' : ['psychic_2','ghost_2','dark_2']
  },
  'dragon' : {
    'weak' : ['ice','dragon','fairy'],
    'resist' : ['fire_2','water_2','grass_2','electric_2']
  },
  'electric' : {
    'weak' : ['ground'],
    'resist' : ['electric_2','flying_2','steel_2']
  },
  'fairy' : {
    'weak' : ['poison','steel'],
    'resist' : ['fighting_2','bug_2','dragon_2','dark_2']
  },
  'fighting' : {
    'weak' : ['flying','psychic','fairy'],
    'resist' : ['bug_2','rock_2','dark_2']
  },
  'fire' : {
    'weak' : ['water','ground','rock'],
    'resist' : ['fire_2', 'grass_2', 'ice_2', 'bug_2', 'steel_2', 'fairy_2']
  },
  'flying': {
    'weak' : ['electric', 'ice', 'rock'],
    'resist' : ['grass_2', 'fighting_2', 'bug_2', 'ground_2']
  },
  'ghost' : {
    'weak' : ['ghost','dark'],
    'resist' : ['normal_2','fighting_2','poison_2','bug_2']
  },
  'grass' : {
    'weak' : ['fire','ice','poison','flying','bug'],
    'resist' : ['water_2','grass_2','electric_2','ground_2']
  },
  'ground' : {
    'weak' : ['water', 'grass', 'ice'],
    'resist' : ['electric_2', 'poison_2', 'rock_2']
  },
  'ice' : {
    'weak' : ['fire','fighting','rock','steel'],
    'resist' : ['ice_2']
  },
  'normal' : {
    'weak' : ['fighting'],
    'resist' : ['ghost_2']
  },
  'poison' : {
    'weak' : ['ground','psychic'],
    'resist' : ['grass_2', 'fighting_2', 'poison_2', 'bug_2','fairy_2']
  },
  'psychic' : {
    'weak' : ['bug', 'ghost', 'dark'],
    'resist' : ['fighting_2', 'psychic_2']
  },
  'rock' : {
    'weak' : ['water', 'grass', 'fighting', 'ground', 'steel'],
    'resist' : ['normal_2', 'fire_2', 'poison_2', 'flying_2']
  },
  'steel' : {
    'weak' :  ['fire', 'fighting', 'ground'],
    'resist' : ['normal_2', 'grass_2', 'ice_2', 'poison_2', 'flying_2', 'psychic_2', 'bug_2', 'rock_2', 'dragon_2', 'steel_2', 'fairy_2']
  },
  'water' : {
    'weak' : ['grass', 'electric'],
    'resist' : ['fire_2', 'water_2', 'ice_2','steel_2']
  }
}


// this function changes opacity based on which types the current team is weak to and resists.
function update_weak_resit() {

  for (let type in type_dict) {
    var image = document.getElementById(type);
    image.style.opacity = .25;
  }

  for (let type in type_dict) {
    var type_2 = type + '_2'
    var image = document.getElementById(type_2);
    image.style.opacity = .25;
  }

  for (let pokemon in current_team) {
    //console.log(k + ' is ' + fruits[k])
    for (let i = 0; i < type_dict[current_team[pokemon]['primary_type']]['weak'].length; i++) {
      var weakness_update = document.getElementById(type_dict[current_team[pokemon]['primary_type']]['weak'][i]);
      weakness_update.style.opacity -= '-0.50';
      var temp_resistance = type_dict[current_team[pokemon]['primary_type']]['weak'][i] + '_2';
      var resistance_update = document.getElementById(temp_resistance);
      resistance_update.style.opacity -= '.50';
    }

    for (let i = 0; i < type_dict[current_team[pokemon]['primary_type']]['resist'].length; i++) {
      var resistance_update = document.getElementById(type_dict[current_team[pokemon]['primary_type']]['resist'][i]);
      resistance_update.style.opacity -= '-0.50';
      var temp_weakness = type_dict[current_team[pokemon]['primary_type']]['resist'][i].slice(0,-2);
      var weakness_update = document.getElementById(temp_weakness);
      weakness_update.style.opacity -= '0.50';
    }

    if (current_team[pokemon]['secondary_type'] != 'null') {
      for (let i = 0; i < type_dict[current_team[pokemon]['secondary_type']]['weak'].length; i++) {
        var weakness_update = document.getElementById(type_dict[current_team[pokemon]['secondary_type']]['weak'][i]);
        weakness_update.style.opacity -= '-0.50';
        var temp_resistance = type_dict[current_team[pokemon]['secondary_type']]['weak'][i] + '_2';
        var resistance_update = document.getElementById(temp_resistance);
        resistance_update.style.opacity -= '.50';
      }
      for (let i = 0; i < type_dict[current_team[pokemon]['secondary_type']]['resist'].length; i++) {
        var resistance_update = document.getElementById(type_dict[current_team[pokemon]['secondary_type']]['resist'][i]);
        resistance_update.style.opacity -= '-0.50';
        var temp_weakness = type_dict[current_team[pokemon]['secondary_type']]['resist'][i].slice(0,-2);
        var weakness_update = document.getElementById(temp_weakness);
        weakness_update.style.opacity -= '0.50';
      }
    }
 }

 for (let type in type_dict) {
   var image = document.getElementById(type);
   if (parseFloat(image.style.opacity) < .25){
     image.style.opacity = .25;
   }
 }

 for (let type in type_dict) {
   var type_2 = type + '_2'
   var image = document.getElementById(type_2);
   if (parseFloat(image.style.opacity) < .25){
     image.style.opacity = .25;
   }
 }
}
