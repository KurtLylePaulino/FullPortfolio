/* =====================================================================
   THE CANRAEL CODEX — Quote Bank
   "In a world where the gods have turned their gaze away,
    we are but whispers in the ruins of a forgotten age."

   Voices are anonymous — archetypes of the peoples and places of
   Canrael, never named individuals. Categories follow the world's
   geography, and each carries its own backdrop and cultural voice.
   ===================================================================== */

const CATEGORIES = [
  { id: "all",         label: "All Voices",            sigil: "✦", image: "hero.webp",           blurb: "Every whisper in the ruins of Canrael." },
  { id: "world",       label: "The World Adrift",      sigil: "✦", image: "bg-world.webp",        blurb: "Proverbs from a world where the gods have gone silent and decay eats at all things." },
  { id: "alverdon",    label: "Alverdon · The East",   sigil: "☼", image: "bg-alverdon.webp",     blurb: "Desert tribes, fading knights, the cursed Rift, and the silent faith of the Holy City." },
  { id: "empire",      label: "The Empire · Shield of Humanity", sigil: "⚙", image: "bg-empire.webp", blurb: "The dieselpunk Shield of Humanity — faith kept in steel, smoke, and sacrifice." },
  { id: "eldovia",     label: "Eldovia · The West",    sigil: "⧖", image: "bg-eldovia.webp",      blurb: "The mystic time-elves of the Weave, the rune-forges of the dwarves, and the vampiric south." },
  { id: "frosthold",   label: "Frosthold · The North", sigil: "❅", image: "bg-frosthold.webp",    blurb: "Eternal winter, the Gray Wardens, and the rising tide of the Lich King." },
  { id: "ankari",      label: "Ankari · Land of Reeds", sigil: "⛩", image: "bg-ankari.webp",      blurb: "Yokai, samurai, and the spirits warring beneath the Golden Sun Throne." },
  { id: "miran",       label: "Miran · Martial Realm", sigil: "☯", image: "bg-miran.webp",        blurb: "A land of cultivation and sects where strength is the only authority." },
  { id: "abyss",       label: "The Abyss Below",       sigil: "✸", image: "bg-abyss.webp",        blurb: "The hunger beneath the world, the failing lighthouses, and those who fight the dark." },
  { id: "convergence", label: "Echoes of the Golden Age", sigil: "✶", image: "bg-convergence.webp", blurb: "The Convergence that shattered the world, and the lost wonders of a mythic past." }
];

const QUOTES = [
  /* ----------------------- The World Adrift ----------------------- */
  { text: "In a world where the gods have turned their gaze away, we are but whispers in the ruins of a forgotten age.", author: "A wandering pilgrim of the broken lands", cat: "world" },
  { text: "The skies are silent, the old pantheons forgotten, and even the air feels heavy with unanswered prayers.", author: "A chronicler of the fading age", cat: "world" },
  { text: "Survival is uncertain, and every journey is a test of will against the encroaching void.", author: "A road-weary sellsword", cat: "world" },
  { text: "Kindle a small light in the endless dark. It is not much. It is everything.", author: "An old proverb of the ruined world", cat: "world" },
  { text: "Mistrust hope, the elders say; clutch tightly to faith, strength, or coin. Yet the ones who endure clutch tightest to each other.", author: "A grandmother of the outlands", cat: "world" },
  { text: "Every ruin holds the secret of a lost age — and few of those secrets were ever meant to be kept.", author: "A grave-robber turned scholar", cat: "world" },
  { text: "Paladins question their faith, knights become mercenaries, and mages delve into forbidden arts. All of us only seek purpose where the gods no longer answer.", author: "A disillusioned cleric", cat: "world" },
  { text: "Decay eats away at every civilization, and survival here often comes at the cost of morality.", author: "An archivist of the dying cities", cat: "world" },
  { text: "We remember our heroes only in myth now, and every step forward is a defiance against the despair that would swallow us.", author: "A keeper of old songs", cat: "world" },
  { text: "This world once knew greatness. Now it struggles against time and entropy, and calls the struggle living.", author: "A historian of forgotten glory", cat: "world" },
  { text: "Hope is a stubborn thing. It survives in outcasts, scholars, and warriors — anyone foolish enough to still kindle a light.", author: "A wandering storyteller", cat: "world" },
  { text: "The golden age is a distant dream, and the future is written in both hope and despair.", author: "A seer of the broken lands", cat: "world" },
  { text: "The gods did not die. They simply stopped listening, which for the praying is the same thing.", author: "A street preacher of the ruined cities", cat: "world" },
  { text: "We are the children of a broken promise, and we have learned to keep our own.", author: "A matron of the refugee roads", cat: "world" },
  { text: "Light a candle for the dead if you must, but save the lantern for the road ahead.", author: "A caravan-master of the wastes", cat: "world" },
  { text: "Faith, strength, or coin — choose what you will cling to. The void does not care which.", author: "A beggar-philosopher of the crossroads", cat: "world" },
  { text: "Each step forward is a small defiance against the creeping dark.", author: "A nameless traveler of the wastes", cat: "world" },

  /* ----------------------- Alverdon · The East ----------------------- */
  { text: "We are masters of the harshest sand, where culture and tradition grow only around the rarest water.", author: "A desert warrior of the Great Outlands", cat: "alverdon" },
  { text: "The Warrior King's banner gathers orc and goliath and man alike. In the desert, the only tribe that matters is the one that survives the night.", author: "A nomad of the Great Outlands", cat: "alverdon" },
  { text: "The Outlands forgive nothing and forget no one. The desert keeps every bone it is given.", author: "A nomad elder of the Great Outlands", cat: "alverdon" },
  { text: "Altmira's chivalry is a polished shell, and beneath it the rot spreads. I have worn that armor; I know its weight and its lie.", author: "A disillusioned knight of the Border Kingdoms", cat: "alverdon" },
  { text: "Once we rode gryphons against the orc-tide as one. Now the city-states bicker while the coalition frays.", author: "An old gryphon-rider of Altmira", cat: "alverdon" },
  { text: "A knight's honor is a candle in a gale. Mind it carefully, for the wind here never stops.", author: "A hedge-knight of the Border Kingdoms", cat: "alverdon" },
  { text: "Do not go into the Rift. The land is grey, the storms are violent, and the things that dwell there were never meant to.", author: "A bastion-guard of the Great Rift", cat: "alverdon" },
  { text: "We hold the wall against the horrors so the rest of Alverdon may pretend they do not exist.", author: "A sentinel of the Rift bastions", cat: "alverdon" },
  { text: "The Rift took my brothers and gave back only their faces, worn wrong.", author: "A survivor of the grey wastes", cat: "alverdon" },
  { text: "The Seven are silent, yet still we ring the bells — lest the silence become the only prayer we know.", author: "A cleric of the Holy City", cat: "alverdon" },
  { text: "Kindness is the Theocracy's newest mask. It wears the mask well; I have seen what lies beneath.", author: "An orphan of the Holy City", cat: "alverdon" },
  { text: "Faith here is a shield in one hand and a chain in the other. Pray you are never taught which is which.", author: "A lapsed paladin of the Seven", cat: "alverdon" },
  { text: "I kept the orphanage lamps lit long after I stopped believing anyone was listening.", author: "A caretaker of the Holy City", cat: "alverdon" },
  { text: "Devotion and fear are minted from the same coin; the Orthodoxy decides which face you are shown.", author: "A confessor of the Holy City", cat: "alverdon" },
  { text: "Water, steel, and a true word given — these are the only riches the desert respects.", author: "A caravan-guard of the oasis roads", cat: "alverdon" },
  { text: "An oasis is a promise the desert makes and rarely keeps.", author: "A wanderer of the Great Outlands", cat: "alverdon" },

  /* ----------------------- The Empire · Shield of Humanity ----------------------- */
  { text: "We are the Shield of Humanity. When the gods went silent, we picked up the hammer.", author: "An officer of the Empire", cat: "empire" },
  { text: "Faith in gods is a luxury. We keep our faith in steel, in smoke, and in one another.", author: "An imperial Auxilla", cat: "empire" },
  { text: "Some give their arms to the machine. Some give their legs. The truest give their humanity — and call it duty.", author: "Of the Steam Soldiers", cat: "empire" },
  { text: "The legend marched into the Convergence rather than pray for it to end. The Empire has called that courage ever since.", author: "An imperial war-song", cat: "empire" },
  { text: "The skies are ours. Let the dragons and the horrors look up and despair.", author: "A captain of the airship fleet", cat: "empire" },
  { text: "Better a smoke-choked sky than no sky at all.", author: "An imperial proverb", cat: "empire" },
  { text: "We pull the elf and the orc from the dark, then call ourselves better than them. That is the oldest lie of the Empire.", author: "A repentant officer of the Empire", cat: "empire" },
  { text: "Numbers and iron. That is all the Abyss respects, and all we have left to give.", author: "A Praetorum commander", cat: "empire" },
  { text: "Resilience is the only god we have not yet buried.", author: "Imperial doctrine", cat: "empire" },
  { text: "Hold the line. The line is humanity. There is nothing behind it.", author: "An Auxilla battle-creed", cat: "empire" },
  { text: "The furnace does not ask whether you believe. It asks only that you feed it.", author: "A foreman of the imperial forges", cat: "empire" },
  { text: "A man may be replaced. A regiment may be replaced. The Empire endures — and so its arithmetic is its mercy.", author: "A quartermaster of the Empire", cat: "empire" },
  { text: "They built me a body of brass and called me lucky. On the days I still remember her name, perhaps I am.", author: "A Steam Soldier of the front", cat: "empire" },
  { text: "We do not worship. We manufacture. Salvation, like everything else, comes off the line.", author: "An engineer of the war-works", cat: "empire" },
  { text: "Smoke is the Empire's incense, and the factory-whistle its only hymn.", author: "A laborer of the imperial forges", cat: "empire" },
  { text: "Pride in humanity is our armor and our wound. We have never learned to wear the one without the other.", author: "A chronicler of the Empire", cat: "empire" },

  /* ----------------------- Eldovia · The West ----------------------- */
  { text: "Time is a weave, and we are only threads. Fortunate the thread that learns to choose its own pattern.", author: "An elven warrior of the Whispering Wood", cat: "eldovia" },
  { text: "We worship the Great Weave, the river of all moments. Outsiders name us Time Elves and understand nothing.", author: "A chronomancer of Valefor", cat: "eldovia" },
  { text: "The World Tree remembers every age. We elves merely pretend that we do too.", author: "An elder of the Eternal Forest", cat: "eldovia" },
  { text: "A century is a single breath to the Weave. Do not ask the long-lived to hurry their grief.", author: "An elven warrior of noble blood", cat: "eldovia" },
  { text: "In the eternal forest, a single careless step can cost you a hundred years.", author: "A pathfinder of the Whispering Wood", cat: "eldovia" },
  { text: "Listen — the wind in Valefor is not wind. It is the future, rehearsing what it means to arrive.", author: "A seer of the Weave", cat: "eldovia" },
  { text: "We dwarves carve our prayers into stone, for stone at least remembers. The gods do not.", author: "A stonewright of Clan Mundir", cat: "eldovia" },
  { text: "Beneath the Mythril Mountains we raised five keeps and ten towers, and still the mountain is the elder of us all.", author: "A runesmith of Clan Mundir", cat: "eldovia" },
  { text: "The Starlight Forge wakes only when the heavens align, and what it makes, no mortal age can equal.", author: "A Starlight Smith of the dwarves", cat: "eldovia" },
  { text: "A rune cut true outlives the hand that cut it. That is the only immortality a dwarf will trust.", author: "A runesmith of Clan Mundir", cat: "eldovia" },
  { text: "In the southern marshes the night is eternal, and the counts who rule it have long forgotten the taste of mercy.", author: "A survivor of the vampiric south", cat: "eldovia" },
  { text: "Immortality is not a gift. It is the longest sentence, served alone.", author: "A vampire-count of the marshes", cat: "eldovia" },
  { text: "Hunt me if you must, hunter. We are both only trying to outlive our grief.", author: "A creature of the eternal night", cat: "eldovia" },
  { text: "The trollkin enslave, the vampires expand, and humanity learns to whisper in its own land.", author: "A refugee of the southern jungles", cat: "eldovia" },
  { text: "Drifters, they call us — souls knocked loose from another world, hunted by the Wardens of time for the crime of being lost.", author: "One displaced by the Weave", cat: "eldovia" },
  { text: "On the Night of Fading the great ones vanished in light and shadow. The Wardens, they whisper, collect their debts in silence.", author: "A keeper of Eldovian legends", cat: "eldovia" },

  /* ----------------------- Frosthold · The North ----------------------- */
  { text: "Even in a world of frost, fire and blood can still rage.", author: "A saying of the frozen Tzardom", cat: "frosthold" },
  { text: "The Lich King raises the dead faster than we can bury our own. Still we dig. Still we hold.", author: "A gray warden of Norvdal", cat: "frosthold" },
  { text: "Cold does not kill you. Despair does. The cold merely carries the message.", author: "A warden of the frozen wall", cat: "frosthold" },
  { text: "Our honor erodes a little more with every winter. Pray we fall before there is none left to lose.", author: "A gray warden of the north", cat: "frosthold" },
  { text: "The Orthodoxy calls it divine will. The frostbitten dead in the square call it nothing at all.", author: "A dissenter of Norvdal", cat: "frosthold" },
  { text: "Dwarf and orc share one fire in the north. In Frosthold, even the oldest hatreds freeze.", author: "A smith of the mountain citadels", cat: "frosthold" },
  { text: "We raised the Gates of Mundus in reverence to the god who shaped the world. He has not spoken since.", author: "A dwarf of the northern halls", cat: "frosthold" },
  { text: "The frost elves come down from the mountains only when the world is ending. Sleep well, knowing they have not yet come.", author: "A trader of Frostport", cat: "frosthold" },
  { text: "Face me in the Martial Trial, or do not waste my winter.", author: "A frost elf of the high peaks", cat: "frosthold" },
  { text: "Every victory here is hard-fought and fleeting. We have learned to love the fleeting kind.", author: "A survivor of the long winter", cat: "frosthold" },
  { text: "Hold the wall. The Tzar is far, the gods are farther, and the dead are very close.", author: "A watch-cry of the gray wardens", cat: "frosthold" },
  { text: "The Tzar rules the living; the Orthodoxy rules their fear; the Lich King rules everything that comes after.", author: "A grim proverb of the north", cat: "frosthold" },
  { text: "We do not fear the long night. We fear the morning that finds our walls already breached.", author: "A sentinel of the frozen gate", cat: "frosthold" },
  { text: "Frostport is a rare warm hearth in a cold land — and pirates, bandits, and dark magic all gather where the fire is.", author: "A dockmaster of Frostport", cat: "frosthold" },
  { text: "Towering glaciers, windswept tundra, silent forests: a land as beautiful as it is willing to kill you.", author: "A scout of the frozen wastes", cat: "frosthold" },
  { text: "We orcs hunt the monsters, the dwarves raise the walls, and together we earn one more season of breath.", author: "An orc of the northern alliance", cat: "frosthold" },

  /* ----------------------- Ankari · Land of Reeds ----------------------- */
  { text: "The gods are silent, but the spirits are not. In Ankari, it is the dead who answer first.", author: "A shrine-maiden of the reed-lands", cat: "ankari" },
  { text: "Three lords reach for the Golden Sun Throne. The throne reaches back, and it is hungry.", author: "A wandering monk of Ankari", cat: "ankari" },
  { text: "The reed that bends outlasts the oak that will not. So too the warrior who yields to win.", author: "A swordsman of the central plains", cat: "ankari" },
  { text: "Draw your blade but once, and let the drawing be the whole of the argument.", author: "A masterless samurai", cat: "ankari" },
  { text: "The cherry falls at the height of its beauty. A samurai should ask no different of himself.", author: "A retainer of the disciplined city", cat: "ankari" },
  { text: "Honor and duty are the walls of our citadel. They are also its prison.", author: "A samurai of the disciplined city", cat: "ankari" },
  { text: "The Yokai kept their oaths for a thousand years. They will not keep them through a thousand more of our war.", author: "A keeper of the old shrines", cat: "ankari" },
  { text: "Leave an offering at the old shrine. The kami have long memories and longer patience.", author: "A village priest of the reed-lands", cat: "ankari" },
  { text: "The Ghosts of War rise from the bloodied earth, and they remember every hand that spilled them.", author: "A battlefield mourner of Ankari", cat: "ankari" },
  { text: "Once a spirit of peace, now a figure of change — the Pale Oni is both, and fears neither.", author: "A follower of the Pale", cat: "ankari" },
  { text: "I do not rule through wisdom or mercy. I rule because my hand has never once trembled.", author: "A soldier of the Red banner", cat: "ankari" },
  { text: "A master of every weapon needs no name; the skill speaks, and the banner falls silent.", author: "A retainer of the Nameless King", cat: "ankari" },
  { text: "The land rots with the decay of time and blood, yet still the reeds grow, green and indifferent.", author: "A farmer of the war-torn fields", cat: "ankari" },
  { text: "Peace is a discipline, not a gift. Few in Ankari have the patience to train in it.", author: "A hermit of the northern hills", cat: "ankari" },
  { text: "An oni's claim to the throne is as old as the mountains, and as patient.", author: "A spirit-speaker of the sacred forests", cat: "ankari" },
  { text: "We fight, we die, and the spirits of the fallen grow fat on the war we feed them.", author: "A foot-soldier of the warring provinces", cat: "ankari" },
  { text: "The moon takes no side in our war. Perhaps that is why it alone has found peace.", author: "A wandering monk of Ankari", cat: "ankari" },

  /* ----------------------- Miran · Martial Realm ----------------------- */
  { text: "Strength is the ultimate form of authority. All else is decoration.", author: "A cultivator of the orthodox sects", cat: "miran" },
  { text: "Magic is distrusted, science rejected, the gods forgotten. Only the body, the spirit, and the will remain.", author: "A wandering martial artist of Miran", cat: "miran" },
  { text: "A fist that can shatter a mountain is still nothing before a will that will not break.", author: "A disciple of the sundering fists", cat: "miran" },
  { text: "Move like water and none can hold you; stand like the mountain and none can move you.", author: "A master of the flowing waters", cat: "miran" },
  { text: "The Nine Skies are not a height to be reached, but a depth to be cultivated.", author: "An elder of the orthodox sects", cat: "miran" },
  { text: "Ten thousand techniques, and the heavens still bow only to sincerity of effort.", author: "An ascetic of the mountain monasteries", cat: "miran" },
  { text: "In the Seven Ruins we kept what the empire discarded: the freedom to choose our own ruin.", author: "An outcast of the unorthodox sects", cat: "miran" },
  { text: "Only the strong survive, and the strong are never finished becoming so.", author: "An old proverb of the Murim", cat: "miran" },
  { text: "The Demonic Cult promises power without price. There is no such thing — only debts that come due in blood.", author: "A swordsman of the sainted sects", cat: "miran" },
  { text: "I have spent a thousand days perfecting a single strike. Tomorrow I begin the second.", author: "An ascetic of the mountain monasteries", cat: "miran" },
  { text: "Bow to no fate. The heavens did not grant your strength — you tore it from them.", author: "A teaching of the martial path", cat: "miran" },
  { text: "Cultivate the heart before the fist; a sharp blade in a cruel hand cuts its wielder first.", author: "A master of the divine mandate", cat: "miran" },
  { text: "The Heavenly Demon's shadow lengthens over us all. Cultivate swiftly, for the long night is coming.", author: "A watcher of the demonic cult", cat: "miran" },
  { text: "A sect is a family forged in suffering. Betray it, and a thousand brothers become a thousand blades.", author: "A disciple of the divine mandate", cat: "miran" },
  { text: "The mountain itself hums with energy. Listen closely, and it will teach you to break it.", author: "A hermit of the high cliffs", cat: "miran" },
  { text: "A hundred sects, a thousand masters, ten thousand techniques — and still death stands undefeated.", author: "An old wanderer of the martial world", cat: "miran" },
  { text: "The dao is not walked in a single life. We climb a little, and leave the rest to the disciples who carry our name.", author: "An elder of the orthodox sects", cat: "miran" },

  /* ----------------------- The Abyss Below ----------------------- */
  { text: "It had always been there, waiting. The Abyss did not come into being — it simply woke.", author: "A scholar driven half-mad by the deep", cat: "abyss" },
  { text: "The Abyss does not simply kill. It takes — memory, purpose, name — and in return it gives only silence.", author: "A survivor of the descent", cat: "abyss" },
  { text: "It does not think, but it remembers. It does not plan, but it waits.", author: "A chronicler of the dark below", cat: "abyss" },
  { text: "To stand at the edge and look down is to feel the pull — not the gravity of the chasm, but the call of something deeper.", author: "A keeper of an abyssal gate", cat: "abyss" },
  { text: "The Abyss does not claim its victims by force. It whispers to them; it calls to the desperate and the lost.", author: "A priest who guards the descent", cat: "abyss" },
  { text: "Those who return are never the same. They speak in whispers and dream of things with too many eyes.", author: "A healer of the broken-minded", cat: "abyss" },
  { text: "As long as a single lighthouse still burns, there is hope.", author: "A keeper of the failing lights", cat: "abyss" },
  { text: "The souls within do not sleep. They burn — so that the dark may not.", author: "A keeper of the lighthouse flame", cat: "abyss" },
  { text: "Each lighthouse is a lonely vigil, a solitary war against the inevitable. And still we keep the flame.", author: "A warden of the dimming beacons", cat: "abyss" },
  { text: "I was born a lightbringer in an endless dark. I will die and rise and die again — until my final death buys the world one more dawn.", author: "The last of her people", cat: "abyss" },
  { text: "We are the ones made monsters to slay monsters. We give the dark no ground without first shedding blood.", author: "A hunter of the night", cat: "abyss" },
  { text: "To fight the dark, you must carry a little of it. The trick is never letting it carry you.", author: "A teaching of the night-hunters", cat: "abyss" },
  { text: "They adore us in daylight and bar their doors against us at night. We have made our peace with both.", author: "A shunned hunter of the deep places", cat: "abyss" },
  { text: "We do not kneel. We do not pray. We rise. The light abandoned us, so we found our strength in the dark.", author: "A heretic of the abyssal faith", cat: "abyss" },
  { text: "For every ruler of the dark that falls, another rises. The Abyss has no limit, and names hold power within it.", author: "A frightened cartographer of the underworld", cat: "abyss" },
  { text: "Do not name what answers from the deep. To name it is to be known by it.", author: "A scholar of forbidden things", cat: "abyss" },

  /* ----------------------- Echoes of the Golden Age ----------------------- */
  { text: "The Convergence shattered realms and birthed things that should not exist. We live in the rubble of that single hour.", author: "A chronicler of the catastrophe", cat: "convergence" },
  { text: "Long ago, heroes defied fate and stood against beings beyond mortal understanding. We inherited only the ruins of their courage.", author: "A historian of the golden age", cat: "convergence" },
  { text: "Ascalon reached past the limits of the soul and vanished into myth. Its lighthouses still burn — proof that ambition outlives the ambitious.", author: "An archivist of the lost kingdom", cat: "convergence" },
  { text: "They forged wonders from the very essence of the soul. That same hunger for truth, some say, is precisely what unmade them.", author: "A scholar of forgotten Ascalon", cat: "convergence" },
  { text: "The relics of a dead kingdom are still hunted by those who would wield its forbidden power.", author: "A relic-hunter of the old world", cat: "convergence" },
  { text: "Fate is not written by the gods, but by hands far colder — and those hands can, perhaps, be stayed.", author: "A seeker of lost truths", cat: "convergence" },
  { text: "I have seen too much, lost too much, and endured what no mortal should. Do not envy the long-lived.", author: "A wanderer who remembers the old age", cat: "convergence" },
  { text: "The mythic past lingers like a distant dream, buried beneath layers of myth and broken magic.", author: "A keeper of ruined libraries", cat: "convergence" },
  { text: "Every scar upon this land is the signature of an ancient war. Read them, and you read our doom.", author: "A cartographer of the old battlefields", cat: "convergence" },
  { text: "Once there was divine presence and magical splendor. Now there is only the hollow where it used to be.", author: "A mourner of the silent heavens", cat: "convergence" },
  { text: "The forge of a lost age still hums in the dark, untended, waiting for hands worthy of it.", author: "A pilgrim to the ruins of the old kingdom", cat: "convergence" },
  { text: "We were not abandoned all at once. The gods turned away slowly, the way a fire dies — and we noticed only the cold.", author: "A theologian of the fading faith", cat: "convergence" },
  { text: "Heroes once stood against the things beyond the veil. The veil tore anyway, and they with it.", author: "A bard of the Convergence", cat: "convergence" },
  { text: "What the golden age built, the Convergence broke. What the Convergence broke, we are still learning to fear.", author: "A chronicler of the broken world", cat: "convergence" },
  { text: "To study the old world is to fall in love with a corpse and call it history.", author: "A scholar of forgotten Ascalon", cat: "convergence" },

  /* ===================== Expansion II — five more per region ===================== */

  /* The World Adrift */
  { text: "We do not pray for better days. We only ask the dark to take us slowly.", author: "A widow of the burned villages", cat: "world" },
  { text: "Trust the road, not the map. Maps were drawn by a world that no longer exists.", author: "A wayfarer of the shattered provinces", cat: "world" },
  { text: "The brave die first here, then the kind. The careful inherit the ruins.", author: "A scarred mercenary", cat: "world" },
  { text: "Even a cursed coin still spends. In Canrael, so does a cursed life.", author: "A gambler of the border taverns", cat: "world" },
  { text: "Ask not which god forsook us. Ask which of us first stopped listening back.", author: "A doubting friar", cat: "world" },

  /* Alverdon · The East */
  { text: "A vow sworn in Altmira is worth its weight in rust.", author: "A cynic of the Border Kingdoms", cat: "alverdon" },
  { text: "The sand does not hate you. It has simply buried a thousand others who thought themselves its master.", author: "A dune-speaker of the Great Outlands", cat: "alverdon" },
  { text: "We pray to the Seven for rain and to the Warrior King for water. Only one has ever answered.", author: "A villager of the oasis roads", cat: "alverdon" },
  { text: "Beyond the bastions there is no honor, no law, no mercy — only the Rift, and the grey it makes of men.", author: "A captain of the Rift wall", cat: "alverdon" },
  { text: "The Coalition is a rope of frayed threads. We hold only because no single strand dares snap first.", author: "A diplomat of the fractured city-states", cat: "alverdon" },

  /* The Empire · Shield of Humanity */
  { text: "Mourn quietly and reload quickly. The Empire grants no other rites.", author: "A frontline chaplain of the Auxilla", cat: "empire" },
  { text: "Every gear we forge turns on the bones of the generation that forged the last one.", author: "A widow of the war-works", cat: "empire" },
  { text: "They ask if the machine remembers being a man. It does not — and that is the kindest thing the Empire ever built.", author: "An overseer of the Steam Soldiers", cat: "empire" },
  { text: "We did not conquer the sky. We simply made it too poisonous for anything else to want it.", author: "An airship navigator", cat: "empire" },
  { text: "Loyalty is the cheapest fuel we burn, and the only one we never run short of.", author: "A commissar of the Empire", cat: "empire" },

  /* Eldovia · The West */
  { text: "Mortals fear death because it is sudden. We fear it because we have watched it approach for a thousand years.", author: "An elf of the Whispering Wood", cat: "eldovia" },
  { text: "The Weave shows me every road I might walk. None of them, I have learned, end in peace.", author: "A diviner of Valefor", cat: "eldovia" },
  { text: "A dwarf measures a life by the stone he leaves behind. By that measure, most men never lived at all.", author: "A delver of Clan Mundir", cat: "eldovia" },
  { text: "I have forgotten more languages than the young have ever spoken, and still I cannot say what I feel.", author: "An elder of the Eternal Forest", cat: "eldovia" },
  { text: "Do not pity the vampire his hunger. Pity him his memory.", author: "A scholar of the southern marshes", cat: "eldovia" },

  /* Frosthold · The North */
  { text: "The snow keeps no graves. By spring, the dead simply walk out of it.", author: "A gravedigger of Norvdal", cat: "frosthold" },
  { text: "Warm hands are for the dying. The living keep theirs on the spear.", author: "A war-mother of the northern clans", cat: "frosthold" },
  { text: "We sing the names of the fallen so the Lich King cannot. A named soul is harder to raise.", author: "A skald of the gray wardens", cat: "frosthold" },
  { text: "Three things survive a Frosthold winter: stone, spite, and the things that should have stayed buried.", author: "A trapper of the high tundra", cat: "frosthold" },
  { text: "The Tzar promises spring, the Orthodoxy promises heaven, and the ice promises only the ice — yet the ice has never once lied.", author: "A heretic of Norvdal", cat: "frosthold" },

  /* Ankari · Land of Reeds */
  { text: "Strike as the heron strikes — once, and without apology to the water.", author: "A sword-saint of the central plains", cat: "ankari" },
  { text: "The dead outnumber the living in Ankari, and they vote with steel.", author: "A grave-warden of the reed-lands", cat: "ankari" },
  { text: "Bow to the shrine, not the warlord. One has kept its promises far longer.", author: "A wandering nun of Ankari", cat: "ankari" },
  { text: "A blade with no lord is a poem with no reader — still beautiful, still sharp.", author: "A masterless samurai", cat: "ankari" },
  { text: "When the lanterns drift downriver, do not count them. Some of those lights are watching you back.", author: "A boatman of the spirit-marshes", cat: "ankari" },

  /* Miran · Martial Realm */
  { text: "The river yields to the boulder and wears it to sand. Be patient as water, and you will outlast mountains.", author: "An elder of the flowing waters", cat: "miran" },
  { text: "A sword is honest. It is the hand behind it that learns to lie.", author: "A swordmaster of the sainted sects", cat: "miran" },
  { text: "Cripple the body and the spirit grows hungry. The unorthodox call this a doorway; the orthodox call it a grave.", author: "A wanderer of the Seven Ruins", cat: "miran" },
  { text: "Heaven set a ceiling upon mortal strength. Every master you have heard of died trying to crack it.", author: "An ascetic of the Nine Skies", cat: "miran" },
  { text: "Power without restraint is a flood, not a river. It feeds nothing; it only drowns.", author: "A teacher of the divine mandate", cat: "miran" },

  /* The Abyss Below */
  { text: "Map the Abyss if you must, but know this: the ink will be dry long before the territory holds still.", author: "A cartographer of the deep", cat: "abyss" },
  { text: "The deeper you descend, the more the silence begins to sound like your own name.", author: "A survivor who will not sleep", cat: "abyss" },
  { text: "We do not light the beacons to be seen. We light them so that we, too, remember which way is up.", author: "A keeper of the failing lights", cat: "abyss" },
  { text: "Every monster I have slain wore, somewhere beneath the rot, a face I almost recognized.", author: "A hunter of the night", cat: "abyss" },
  { text: "The Abyss asked what I would give to understand it. I am still paying, and I no longer remember the question.", author: "A scholar undone by the dark", cat: "abyss" },

  /* Echoes of the Golden Age */
  { text: "They built machines to cage the soul and called it progress. The Abyss calls it an open door.", author: "An archivist of fallen Ascalon", cat: "convergence" },
  { text: "The heroes of the golden age did not lose to a darker army. They lost to the consequences of their own brilliance.", author: "A historian of the catastrophe", cat: "convergence" },
  { text: "We dig up their wonders and marvel — the way a child marvels at the blade that will one day cut him.", author: "A relic-hunter of the old world", cat: "convergence" },
  { text: "A philosopher's stone outlives the philosopher, the kingdom, and the very wisdom that warned against making it.", author: "A scholar of forbidden Ascalon", cat: "convergence" },
  { text: "The world did not end at the Convergence. It simply learned that it could.", author: "A chronicler of the broken age", cat: "convergence" },

  /* ===================== Expansion III — wanderers, places, and wisdoms ===================== */

  /* The World Adrift */
  { text: "Every city in Canrael is two cities: the one drawn on the maps, and the one the survivors actually live in.", author: "A wandering chronicler", cat: "world" },
  { text: "The roads between the great realms are longer than they once were. Distance, like everything else, has begun to rot.", author: "A courier of the old routes", cat: "world" },
  { text: "Walk far enough in any direction and you will find a ruin that once swore it would last forever.", author: "A pilgrim of the long roads", cat: "world" },
  { text: "A border is only a scar the land remembers a war by.", author: "A surveyor of the contested marches", cat: "world" },
  { text: "Coin, candle, and a good pair of boots — the only trinity that has never once failed me.", author: "A peddler of the crossroads", cat: "world" },
  { text: "Hope in Canrael is not a feeling. It is a discipline, practiced daily, like sharpening a blade you pray never to use.", author: "A keeper of a roadside shrine", cat: "world" },
  { text: "We measure wealth here in winters survived, not in gold. Gold cannot be eaten, and it makes a poor fire.", author: "A matron of the wastes", cat: "world" },
  { text: "Every traveler lies about where they have been. The truthful ones simply never came back to tell it.", author: "A keeper of a waystation", cat: "world" },
  { text: "The world did not grow crueler. We simply ran out of gods to blame for the cruelty that was always ours.", author: "A defrocked priest", cat: "world" },
  { text: "Maps end where the mapmakers died. The blank spaces are not empty — they are merely honest.", author: "A cartographer of the frontier", cat: "world" },

  /* Alverdon · The East */
  { text: "Altmira gleams from a distance and reeks up close — like all things that polish their armor more often than their conscience.", author: "A traveler through the Border Kingdoms", cat: "alverdon" },
  { text: "In the Great Outlands a stranger is fed before he is questioned. Suspicion is a luxury that kills you slower than thirst.", author: "A guest of the desert tribes", cat: "alverdon" },
  { text: "The oasis cities are gardens grown inside a clenched fist — beautiful, and one bad season from closing.", author: "A merchant of the Outland roads", cat: "alverdon" },
  { text: "They built the bastions to keep the Rift out. No one mentions that the bastions also keep the watchers in.", author: "A deserter of the Rift wall", cat: "alverdon" },
  { text: "A gryphon remembers a kind rider and a cruel one alike. Altmira has bred far too many of the second sort.", author: "An old beastmaster of Altmira", cat: "alverdon" },
  { text: "Walk the Selndrian eaves softly. The wood elves forgive trespass less often than the desert forgives thirst.", author: "A ranger of the borderlands", cat: "alverdon" },
  { text: "Honor in the Border Kingdoms is a coin every lord swears by and none will spend.", author: "A sellsword of the Coalition", cat: "alverdon" },
  { text: "The desert teaches one prayer worth keeping: be grateful for shade, and never trust the man who offers it freely.", author: "A caravan elder of the Outlands", cat: "alverdon" },
  { text: "The grey of the Rift is not a color. It is the absence of every reason a thing once had to keep its shape.", author: "A survivor of the bastions", cat: "alverdon" },
  { text: "The Holy City rings a thousand bells a day. I have counted, and not one was ever answered — yet still the ringing comforts me.", author: "A pilgrim turned skeptic", cat: "alverdon" },

  /* The Empire · Shield of Humanity */
  { text: "The Imperial cities have no dawn — only the hour the furnaces are lit, and the hour they are banked.", author: "A clerk of the lower wards", cat: "empire" },
  { text: "We named our greatest fortress after the old commander, then forgot every lesson the man actually taught.", author: "A veteran of the Rift garrisons", cat: "empire" },
  { text: "A child of the Empire learns three songs before her letters, and all three are about dying well.", author: "A schoolmistress of the war-wards", cat: "empire" },
  { text: "The smog is not weather. It is the Empire exhaling, and it has not drawn a clean breath in three hundred years.", author: "A physician of the factory districts", cat: "empire" },
  { text: "An airship is a cathedral that learned to kill. We pray in them the only way the Empire knows — hands upon the guns.", author: "A sky-chaplain", cat: "empire" },
  { text: "The Praetorum number barely a hundred, and a hundred of them have ended wars that whole armies could not.", author: "A historian of the Empire", cat: "empire" },
  { text: "We tell the other races they are safe behind our shield. We simply never mention which side of it they stand on.", author: "A border officer", cat: "empire" },
  { text: "Promotion in the Empire is mostly a matter of outliving the rank above you.", author: "A weary sergeant of the Auxilla", cat: "empire" },
  { text: "They oil the Steam Soldiers daily and the orphans never. The Empire knows precisely what it values.", author: "A dissident of the lower city", cat: "empire" },
  { text: "Progress, the Empire calls it. The scorched land it leaves behind has another name for the very same thing.", author: "An exile of the industrial heart", cat: "empire" },

  /* Eldovia · The West */
  { text: "Coldharbor flies no flag but the one its richest guest is buying that week.", author: "A factor of the northern port", cat: "eldovia" },
  { text: "Bruma's knights ride out singing and ride home counting. The Grand Plains keep no chorus, only the tally.", author: "A camp-follower of the Knight King's host", cat: "eldovia" },
  { text: "Beneath the World Tree, an hour of rest can cost a season of your life. The elves call this a fair exchange.", author: "A pilgrim to the Eternal Forest", cat: "eldovia" },
  { text: "The Way Watchers do not guard a path. They guard the choice of whether the path was ever taken at all.", author: "A lost traveler of Valefor", cat: "eldovia" },
  { text: "Clan Mundir carved five keeps and ten towers into the Mythril Mountains, and still they bow to the mountain as their elder.", author: "A guest of the dwarven halls", cat: "eldovia" },
  { text: "The Starlight Forge wakes but once in a generation. Most smiths of Clan Grund die having only heard it described.", author: "An apprentice of the forge-wardens", cat: "eldovia" },
  { text: "In the vampiric marshes the night does not fall. It was always here, patient, waiting only for the lamps to fail.", author: "A survivor of the southern reach", cat: "eldovia" },
  { text: "A treant takes a century to turn its head. By the time it judges you a trespasser, your grandchildren will pay the debt.", author: "A woodcutter of the borders", cat: "eldovia" },
  { text: "The trollkin do not hate their slaves. Hatred would require that they had noticed us at all.", author: "One who escaped the southern jungles", cat: "eldovia" },
  { text: "On the Night of Fading the brightest among us simply went out, like candles a careful hand had pinched. No smoke. No scream. Only absence.", author: "A keeper of Eldovian sorrows", cat: "eldovia" },

  /* Frosthold · The North */
  { text: "Frostport is the only fire in a thousand miles of ice, and so every kind of moth has come to circle it.", author: "A harbor-watch of Frostport", cat: "frosthold" },
  { text: "Norvdal does not bury its Tzars deep. In the north, even kings are expected to fight again come the thaw.", author: "A gravekeeper of the Tzardom", cat: "frosthold" },
  { text: "The Gates of Mundus were raised to a god who shaped the world. He has not answered a single knock since.", author: "A pilgrim to the dwarven halls", cat: "frosthold" },
  { text: "Cross the frost elves' peaks uninvited and you will be offered a Martial Trial. Decline, and you will be offered a grave.", author: "A guide of the high passes", cat: "frosthold" },
  { text: "Sanctus Glacialis preaches that the cold is divine punishment. The frostbitten learn it is simply the cold.", author: "A doubter of the Orthodoxy", cat: "frosthold" },
  { text: "We share our fires with the orcs now. Starvation makes brothers faster than any oath ever could.", author: "A clan-elder of the citadels", cat: "frosthold" },
  { text: "The Lich King's army never tires, never thaws, never doubts. Some nights I envy it more than I should.", author: "A gray warden of the long wall", cat: "frosthold" },
  { text: "In the south they fear the dark. In Frosthold we fear the white — the field of snow that hides how close the dead have crept.", author: "A scout of the tundra", cat: "frosthold" },
  { text: "A Frosthold wedding ends with a question no southerner thinks to ask: which of the guests will still be breathing come spring?", author: "A matron of the northern clans", cat: "frosthold" },
  { text: "Glaciers move slower than grief and crush just as completely. I have lost kin to both.", author: "A widow of Norvdal", cat: "frosthold" },

  /* Ankari · Land of Reeds */
  { text: "Kyorin is so quiet you can hear the war it is pretending not to fight.", author: "A traveler to the Pale's city", cat: "ankari" },
  { text: "In Gwanseol the streets are paved red, and the people have long stopped asking what stained them.", author: "A refugee of the southern capital", cat: "ankari" },
  { text: "Taishu drills its warriors until the sword forgets it was ever held by a man. They call this mastery; I call it a beautiful grave.", author: "A wandering swordsman", cat: "ankari" },
  { text: "The Golden Sun Throne has sat empty for a generation, yet three men bleed a nation white to claim a single chair.", author: "A historian of the reed-lands", cat: "ankari" },
  { text: "A river remembers its banks even after the flood. So too a feud — it returns to its old shape the moment the water falls.", author: "An elder of the central plains", cat: "ankari" },
  { text: "Feed the yokai of your household, even the unkind ones. A spirit scorned keeps a longer ledger than any lord.", author: "A grandmother of the reed-villages", cat: "ankari" },
  { text: "The cherry and the blade teach the same lesson: the most beautiful things are the ones most willing to fall.", author: "A poet-monk of Kyorin", cat: "ankari" },
  { text: "When the Imperial Sun vanished, the spirits did not mourn. They simply remembered they had never truly sworn to us at all.", author: "A shrine-keeper of the old faith", cat: "ankari" },
  { text: "In Ankari the dead do not rest; they enlist. Every battlefield is a recruiting ground for the next.", author: "A grave-warden of the war-fields", cat: "ankari" },
  { text: "Walk the reed-marsh at dusk and the lanterns will follow you home. Be certain, traveler, that they are lanterns.", author: "A boatman of the spirit-waters", cat: "ankari" },

  /* Miran · Martial Realm */
  { text: "Shizhuan trades in silk and rumor alike, and of the two, rumor moves the faster and cuts the deeper.", author: "A merchant of the central plains", cat: "miran" },
  { text: "The Divine Feathers walk on wind and the Sundering Fists break mountains — yet both, in the end, kneel to a single misjudged breath.", author: "An elder of the Nine Skies", cat: "miran" },
  { text: "Climb to the cloud-temples if you would learn humility. The mountain teaches it whether or not you ask.", author: "A pilgrim of the high sects", cat: "miran" },
  { text: "The Lightless Shadow Sect is named for what you never see. Pray you never learn how well the name is earned.", author: "A survivor of the unorthodox wars", cat: "miran" },
  { text: "A sect raises you like a son and spends you like a coin. Love it anyway; there is little else in Miran to love.", author: "An old disciple of the orthodox", cat: "miran" },
  { text: "The Demonic Cult does not knock. By the time the Heavenly Demon's name is spoken plainly, the door already stands open.", author: "A watcher of the dark sects", cat: "miran" },
  { text: "The Seven Ruins were once seven glories. In Miran, the distance between the two is a single defeat.", author: "A wanderer of the broken sects", cat: "miran" },
  { text: "Water carves the canyon not by force but by refusing to stop. Cultivate that same patience, and the heavens will widen for you.", author: "A master of the flowing waters", cat: "miran" },
  { text: "Dan Zheng bows to no sect, and so every sect covets it. Neutrality, in Miran, is merely a prize not yet claimed.", author: "A magistrate of the trade-city", cat: "miran" },
  { text: "The strongest warrior in the valley is always the loneliest. Power, cultivated far enough, becomes a kind of exile.", author: "An ascetic of the Mount Gu sect", cat: "miran" },

  /* The Abyss Below */
  { text: "Chor's Compass is not a door we opened. It is a wound that opened us, and we merely built a stair down into it.", author: "A keeper of the descent", cat: "abyss" },
  { text: "In the north of the Abyss the stars are named Warden Lights. Follow them faithfully and they will guide you — always deeper, never out.", author: "A wanderer of the Frozen Void", cat: "abyss" },
  { text: "The Sundered Ashlands are bound in chains the size of rivers. Ask not what they hold together; ask what they were meant to hold down.", author: "A survivor of the southern deep", cat: "abyss" },
  { text: "Every Evergem in a lighthouse was once a person who chose to burn. We keep their flame and have forgotten their names.", author: "A keeper of the Aetherflame", cat: "abyss" },
  { text: "In the Shattered Glimmer the light itself lies. Trust nothing that shines down here — least of all your own reflection.", author: "A scout of the western Abyss", cat: "abyss" },
  { text: "The Sovereigns do not rule the Abyss. They are merely the shapes its madness keeps returning to.", author: "A scholar of the deep things", cat: "abyss" },
  { text: "A rescued soul thanks you. An abyssal one thanks you too — in a voice you will keep hearing for the rest of your shortened life.", author: "A hunter of the night", cat: "abyss" },
  { text: "The Maw beneath the stars does not hunt. It has no need. Everything, given long enough, falls toward it on its own.", author: "A doomsayer of the gates", cat: "abyss" },
  { text: "We Nightsbane are shown gratitude the way a wound shows gratitude to the knife that drained it.", author: "A scarred hunter of the deep", cat: "abyss" },
  { text: "There are doors at the edge of the dark that open onto nothing and still, somehow, knock back. I have stopped answering.", author: "A keeper of the failing lights", cat: "abyss" },

  /* Echoes of the Golden Age */
  { text: "Alverion was the shining empire of heroes; Ascalon, the quiet one that learned to outshine the sun. Both are dust now, and the dust will not say which it preferred.", author: "A historian of the first age", cat: "convergence" },
  { text: "The soul-weavers of Ascalon could bind a spirit into a stone forever. It never once occurred to them to ask the spirit.", author: "A scholar of the lost craft", cat: "convergence" },
  { text: "A Philosopher's Stone amplifies the soul. Ascalon learned, too late, that a soul made louder is also a soul more easily heard by the dark.", author: "An archivist of the ruins", cat: "convergence" },
  { text: "The Moderators shuffle the Deck of Many Things and call it fate. We who are dealt from it call it something far less polite.", author: "A wanderer who has seen the cards", cat: "convergence" },
  { text: "Long ago, mortals stood against beings beyond reckoning and won. We cannot even agree on their names now.", author: "A keeper of the oldest songs", cat: "convergence" },
  { text: "The Convergence did not break a single world. It pressed many worlds together until all of them began to bleed.", author: "A theologian of the catastrophe", cat: "convergence" },
  { text: "Heroes built the lighthouses to outlast them. The lighthouses are dimming now, and no more heroes are being built.", author: "A mourner of the old age", cat: "convergence" },
  { text: "Study a ruin long enough and it begins to study you back. That is how you know it was Ascalon's.", author: "A relic-hunter of the deep ruins", cat: "convergence" },
  { text: "The golden age ended not in fire but in ambition — the only blaze that burns brightest just before it consumes the hand that lit it.", author: "A chronicler of the fall", cat: "convergence" },
  { text: "They say the gods turned away during the Convergence. I think they simply saw what we had built, and could not bear to keep watching.", author: "A defrocked theologian", cat: "convergence" }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATEGORIES, QUOTES };
}
