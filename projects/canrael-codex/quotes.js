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
  { text: "They say the gods turned away during the Convergence. I think they simply saw what we had built, and could not bear to keep watching.", author: "A defrocked theologian", cat: "convergence" },

  /* ===================== Expansion IV — twenty more per region ===================== */

  /* The World Adrift */
  { text: "The sun still rises in Canrael. It simply no longer feels obliged to warm anyone.", author: "A herder of the high pastures", cat: "world" },
  { text: "We name our children after the dead now. There are so many more of them to choose from.", author: "A midwife of the border towns", cat: "world" },
  { text: "A ruin is only a house the future forgot to keep.", author: "A mason with no work", cat: "world" },
  { text: "Walk softly past the old battlefields. The grass there grows greener for a reason no one likes to say aloud.", author: "A wanderer of the killing-fields", cat: "world" },
  { text: "There are two kinds of map in Canrael: the hopeful and the accurate. Carry both, and trust neither entirely.", author: "A guild cartographer", cat: "world" },
  { text: "Faith did not leave the world. It simply stopped paying out, and the faithful kept gambling anyway.", author: "A tavern philosopher", cat: "world" },
  { text: "The kindest thing the old gods ever did was go quiet. Their silence, at least, asks nothing of us.", author: "A hermit of the empty chapels", cat: "world" },
  { text: "Every road in this world leads, in the end, to a ruin or a grave. The wise simply enjoy the walking.", author: "A pilgrim of the long way", cat: "world" },
  { text: "The world does not hate you. The world does not know you exist. That is precisely the problem.", author: "A weathered survivor", cat: "world" },
  { text: "Hope is contraband here — traded quietly, at a markup, in the backs of taverns.", author: "A smuggler of small comforts", cat: "world" },
  { text: "Memory is the only inheritance the poor can still afford, and even that the road tends to rob.", author: "A grandmother of the refugee trail", cat: "world" },
  { text: "A locked door means someone, somewhere, still has something worth keeping. In Canrael, that is nearly a miracle.", author: "A wandering locksmith", cat: "world" },
  { text: "We are all just embers pretending to be fires, and the dark is very patient.", author: "A keeper of dying hearths", cat: "world" },
  { text: "Trust the dog before the man, the man before the priest, and the priest before the lord. The order is not cruelty; it is arithmetic.", author: "A cynic of the trade roads", cat: "world" },
  { text: "The brave build monuments, the wise build walls, and the lucky build neither and live to laugh at both.", author: "A retired sellsword", cat: "world" },
  { text: "Grief here is not a season you pass through. It is the climate you learn to dress for.", author: "A widow of the wars", cat: "world" },
  { text: "Ask an old man what the golden age was like and he will lie. Ask the ruins, and they will tell you the truth, slowly.", author: "A collector of stories", cat: "world" },
  { text: "A promise is the only currency that still holds its value, which is exactly why so few will spend one.", author: "A broker of oaths", cat: "world" },
  { text: "We do not fear the end of the world. We fear that it has already happened, and no one thought to tell us.", author: "A doomsayer of the crossroads", cat: "world" },
  { text: "Light the lamp not because the dark will lose, but because you refuse to let it win unwatched.", author: "A keeper of the night-roads", cat: "world" },

  /* Alverdon · The East */
  { text: "In the Outlands, hospitality is law and law is survival. Refuse a stranger water, and the desert will remember it longer than he will.", author: "A matriarch of the desert tribes", cat: "alverdon" },
  { text: "The Warrior King unites a hundred tribes by reminding them of the one thing they share: everything beyond the banner wants them dead.", author: "A war-chief of the Outlands", cat: "alverdon" },
  { text: "Altmira's walls are thick and its promises thin. Trust the stone; never the men atop it.", author: "A mercenary of the Border Kingdoms", cat: "alverdon" },
  { text: "A gryphon will follow you into any storm and refuse a single river it does not trust. Be more like the gryphon.", author: "A rider of Altmira", cat: "alverdon" },
  { text: "The Coalition meets, argues, and adjourns — and the orcs, who do none of these things, gain another mile while it talks.", author: "A frustrated marshal", cat: "alverdon" },
  { text: "They say the Rift was made by a calamity five centuries gone. They are wrong only in calling it 'gone.'", author: "A scholar of the bastions", cat: "alverdon" },
  { text: "Stare into the grey too long and you will see your own face staring back, wearing an expression you have never made.", author: "A watchman of the Rift wall", cat: "alverdon" },
  { text: "We do not bury our Rift-dead. There is rarely enough of them left, and rarely enough certainty that they are dead.", author: "A bastion chaplain", cat: "alverdon" },
  { text: "The high elves of Selndrian will outlive your kingdom, your language, and the very grievance you came to air. Bring none; they keep better ones.", author: "An envoy to the forest", cat: "alverdon" },
  { text: "Step into the Selndrian shade and the trees fall silent. That silence is the forest deciding whether you may leave.", author: "A poacher who reformed", cat: "alverdon" },
  { text: "The Holy City forgave its own cruelty the way a thief forgives the purse — quietly, and only once the watch drew near.", author: "A foreign pilgrim", cat: "alverdon" },
  { text: "Seven gods, seven silences. The Orthodoxy has built an entire scripture from the spaces between.", author: "A novice of the cathedrals", cat: "alverdon" },
  { text: "In the Holy City, charity is given at dawn and accounted for by dusk. Even mercy keeps a ledger here.", author: "An orphan of the alms-houses", cat: "alverdon" },
  { text: "The desert and the cathedral teach the same first lesson: kneel, or be made to.", author: "A wandering preacher", cat: "alverdon" },
  { text: "A knight of Altmira polishes his honor for the festival and pawns it before the road home.", author: "A squire grown bitter", cat: "alverdon" },
  { text: "Water is the only oath the Outlands keep. Spill a man's and you have begun a war; share it and you have ended one.", author: "A well-keeper of the oases", cat: "alverdon" },
  { text: "The gryphon-riders still sing of the old defense, when the city-states flew as one. They sing it because no one living has seen it.", author: "A bard of the Border Kingdoms", cat: "alverdon" },
  { text: "We built the bastions to look outward. The wise commander posts half his watch facing in.", author: "A captain of the Rift garrison", cat: "alverdon" },
  { text: "Pray to the Seven if it comforts you. Just keep one hand on the waterskin and the other on the blade; the gods have proven unreliable about both.", author: "A caravan elder of the Outlands", cat: "alverdon" },
  { text: "Altmira rots from the throne down, the way a fish does. By the time the stench reaches the gate, the head is long gone.", author: "A disillusioned steward", cat: "alverdon" },

  /* The Empire · Shield of Humanity */
  { text: "The Empire does not ask whether a thing is right. It asks whether it is necessary, and it has never once been short of necessities.", author: "A magistrate of the war-courts", cat: "empire" },
  { text: "We do not raise statues to the living. The living might still disappoint us.", author: "A sculptor of the memorial wards", cat: "empire" },
  { text: "A furnace fed on coal makes iron. A furnace fed on men makes the Empire.", author: "A foreman of the deep works", cat: "empire" },
  { text: "The old commander is dead, but the Empire cannot afford to admit it, and so he marches on in every recruit's first nightmare.", author: "A drill-master of the Auxilla", cat: "empire" },
  { text: "The airships blot out the sun over the capital. The citizens have learned to call the shade patriotism.", author: "A clerk of the sky-docks", cat: "empire" },
  { text: "Augmentation is voluntary, the recruiters say — voluntary as drowning is voluntary, once you are already in the water.", author: "A surgeon of the Steam Corps", cat: "empire" },
  { text: "The Praetorum do not bleed for the Empire. They were built so the Empire need not bleed at all.", author: "An archivist of the elite orders", cat: "empire" },
  { text: "We export order and import ore, and call the distance between them civilization.", author: "A trade-minister of the Empire", cat: "empire" },
  { text: "The smog hangs thickest over the orphanages and the foundries alike. The Empire has always known where to store its raw materials.", author: "A dissident pamphleteer", cat: "empire" },
  { text: "A soldier of the Empire is taught that fear is rust. So we oil ourselves nightly with worse things, and call it courage.", author: "A veteran of the line", cat: "empire" },
  { text: "They gave the Metal Men our shape so the enemy would hesitate. It is the cruelest mercy the Empire ever engineered.", author: "An engineer of the war-frames", cat: "empire" },
  { text: "The Empire saved my village from the horrors, then taxed it for the saving, then conscripted what remained. We were grateful for roughly an afternoon.", author: "A border conscript", cat: "empire" },
  { text: "Coal, conviction, and corpses — the three fuels of the Empire, and only one of them is ever in short supply.", author: "A quartermaster of the line", cat: "empire" },
  { text: "Faith in the gods built cathedrals. Faith in ourselves built the airship fleet. Ask the sky which prayer was answered.", author: "An imperial orator", cat: "empire" },
  { text: "Every gear in the great machine believes itself the one that matters. The machine encourages this. It turns better that way.", author: "A philosopher of the lower wards", cat: "empire" },
  { text: "We do not fear the Abyss. We have simply built something that frightens us more, and pointed it at the dark.", author: "A commander of the Rift fleet", cat: "empire" },
  { text: "The Empire keeps two histories: the one it teaches, and the one it buries beneath the new foundations.", author: "A censor with a guilty conscience", cat: "empire" },
  { text: "A man who has given his lungs to the smog and his son to the line will swear the Empire is worth it. Believe his words; watch his hands.", author: "A traveler through the factory cities", cat: "empire" },
  { text: "Mercy is rationed in the Empire, like coal and bread. It is real. It is simply never quite enough to go around.", author: "A field chaplain", cat: "empire" },
  { text: "Progress is a furnace that never cools. We keep feeding it, certain the warmth ahead will be worth the home behind.", author: "An exile of the capital", cat: "empire" },

  /* Eldovia · The West */
  { text: "Coldharbor sells everything and believes in nothing — which is precisely why everyone, in the end, comes to Coldharbor.", author: "A harbor-master of the free port", cat: "eldovia" },
  { text: "Bruma is the last lamp in the northern dark, and its Knight King guards the wick with a jealousy I have come to forgive.", author: "A knight of the Grand Plains", cat: "eldovia" },
  { text: "The cavalry of Bruma can break any line but their own grief. Watch them ride home, and you will see which charge truly cost them.", author: "A field-surgeon of the Thuum", cat: "eldovia" },
  { text: "Time in Valefor does not flow; it pools. Step carelessly and you may drown in a single afternoon for a hundred years.", author: "A guide of the Whispering Wood", cat: "eldovia" },
  { text: "The Elves of the Weave do not predict the future. They remember it, the way you remember a dream you have not yet had.", author: "A scholar of the chronomancers", cat: "eldovia" },
  { text: "Beneath the World Tree, even the dead keep their appointments. The elves find our surprise at this distasteful.", author: "A pilgrim of the Eternal Forest", cat: "eldovia" },
  { text: "The Way Watchers asked me which life I had meant to live. I have not slept soundly since I failed to answer.", author: "A traveler returned from Valefor", cat: "eldovia" },
  { text: "A treant's grudge is patient as bark and twice as slow to heal. Insult one in spring; you may be forgiven by your great-grandchildren's autumn.", author: "A woodward of the borders", cat: "eldovia" },
  { text: "Clan Mundir does not build against the mountain. It builds with it, and asks the stone's leave before each cut.", author: "A guest in the Mythril halls", cat: "eldovia" },
  { text: "The Starlight Forge has lit but thrice in living memory, and each blade it gave the world has since outlived its maker by an age.", author: "A loremaster of Clan Grund", cat: "eldovia" },
  { text: "A dwarf's rune outlasts his name, his clan, and the very wisdom that warned him which words ought never be carved.", author: "An elder of the deep keeps", cat: "eldovia" },
  { text: "In the southern marshes the lamps are not for seeing. They are for being seen by — so the counts may know which of us still breathes.", author: "A villager of the vampiric reach", cat: "eldovia" },
  { text: "A vampire count keeps no calendar. Why would he? Every night is the same night he was first denied the dawn.", author: "A scholar of undeath", cat: "eldovia" },
  { text: "The trollkin built their thrones on our backs and call the arrangement natural. Nature, at least, would eventually have the decency to let go.", author: "An escapee of the jungles", cat: "eldovia" },
  { text: "Mortals burn bright and brief, the elves say, as though it were a pity. I have watched the long-lived. Brevity is not the curse they imagine.", author: "A traveler of two ages", cat: "eldovia" },
  { text: "On the Night of Fading, even the elves looked surprised — and an elf surprised is a thing more frightening than any war.", author: "A keeper of Eldovian record", cat: "eldovia" },
  { text: "The Drifters arrive with the wrong stars in their eyes and the wrong names on their tongues. Be kind to them; the Weave will not.", author: "A hospice-keeper of Coldharbor", cat: "eldovia" },
  { text: "Bruma's knights swear three oaths: to the King, to the line, and to never count the dead until the snow has hidden them.", author: "A herald of the Thuum", cat: "eldovia" },
  { text: "The whale-deer of Valefor pass through the canopy like grief through a household — vast, silent, and gone before you grasp what you saw.", author: "A naturalist of the Wood", cat: "eldovia" },
  { text: "To bargain with a Time Elf, decide first what you will pay in years. They never accept gold; gold does not bleed slowly enough.", author: "A merchant who learned", cat: "eldovia" },

  /* Frosthold · The North */
  { text: "Frosthold keeps no cowards and no fools — the winter audits both before the first thaw.", author: "A clan-mother of the citadels", cat: "frosthold" },
  { text: "Mundus shaped the world and then, they say, set down his tools. Up here, we have spent an age praying he picks them up again.", author: "A priest at the Gates of Mundus", cat: "frosthold" },
  { text: "The dwarves carve, the orcs hunt, and the cold takes a tithe from each. It is the oldest and fairest tax in the north.", author: "An elder of the alliance", cat: "frosthold" },
  { text: "An orc of Frosthold will share his last fire with a stranger and his last blade with an enemy. He is generous with both.", author: "A trapper of the tundra", cat: "frosthold" },
  { text: "The frost elves call us beasts and stay in their mountains. On our worst nights, I struggle to argue the first part.", author: "A warden of the wall", cat: "frosthold" },
  { text: "Win a Martial Trial and the frost elves will respect you for a season. Lose, and they will respect you forever — the way one respects a lesson.", author: "A survivor of the high peaks", cat: "frosthold" },
  { text: "Frostport burns bright because Frosthold is dark, and every kind of rat has learned to love a lighthouse.", author: "A dockhand of the trade-city", cat: "frosthold" },
  { text: "The theocrat family of Frostport prays for peace and prices it by the barrel. Faith, in the harbor, has an exchange rate.", author: "A smuggler of the north", cat: "frosthold" },
  { text: "The Great Tzar holds the realm together with one fist while the Orthodoxy unpicks it with two. We the living are the rope.", author: "A councilor of Norvdal", cat: "frosthold" },
  { text: "Sanctus Glacialis teaches that suffering purifies. By that measure, Frosthold must be the holiest land that ever froze.", author: "A heretic burned out of the Tzardom", cat: "frosthold" },
  { text: "The Gray Wardens were paladins once. Now they are simply men who have run out of softer options.", author: "A recruit of the order", cat: "frosthold" },
  { text: "The Lich King offers an end to cold, an end to hunger, an end to fear. He is honest. That is the terror of him.", author: "A watcher of the long wall", cat: "frosthold" },
  { text: "We do not mourn the dead in winter. We post a guard on them and wait to see whose side they will rise for.", author: "A gravekeeper of the north", cat: "frosthold" },
  { text: "A Frosthold child learns the word for 'home' and the word for 'fortress' on the same day, and never quite learns the difference.", author: "A teacher of the citadels", cat: "frosthold" },
  { text: "The undead never sleep, and so the wardens have learned to. We dream against them; it is the one front where we still advance.", author: "A weary sentinel", cat: "frosthold" },
  { text: "Honor freezes slowest of all our virtues, but freeze it does. I have known good men keep their oaths only because their hearts were too cold to break them.", author: "An old captain of the wardens", cat: "frosthold" },
  { text: "There is a beauty to the glaciers that has killed more travelers than the cold. Awe, in the north, is a predator.", author: "A guide of the ice fields", cat: "frosthold" },
  { text: "Orc and dwarf bled together at the Gates, and the snow took no notice of which blood was which. The mountain is a great equalizer.", author: "A loremaster of the citadels", cat: "frosthold" },
  { text: "Spring in Frosthold is not relief. It is the season the thawed ground gives up what the winter hid.", author: "A digger of the war-graves", cat: "frosthold" },
  { text: "We hold the north not because we can win, but because someone must stand between the world and the white silence — and the lot fell to us.", author: "A warden's final letter", cat: "frosthold" },

  /* Ankari · Land of Reeds */
  { text: "Kyorin teaches that the still pond reflects the moon best. Red would say the still pond simply makes the easier target.", author: "A pilgrim between the capitals", cat: "ankari" },
  { text: "In Gwanseol a sword answers every question, and so no one there has thought to ask a good one in years.", author: "A scholar fled south", cat: "ankari" },
  { text: "Taishu's warriors are flawless and joyless, like a blade with no one left to wield it.", author: "A traveler of the central plains", cat: "ankari" },
  { text: "Three lords, three banners, one throne — and the reeds grow over all four the same.", author: "An old farmer of the war-fields", cat: "ankari" },
  { text: "The kami do not forgive and do not forget. They merely wait, which the impatient mistake for mercy.", author: "A shrine-keeper of the hills", cat: "ankari" },
  { text: "Set a bowl of rice at the threshold for the household spirit. A fed yokai is a neighbor; a forgotten one is a creditor.", author: "A grandmother of the reed-villages", cat: "ankari" },
  { text: "When the Imperial Sun set, the Golden Emperor did not fall. He simply was not there the next morning, and the spirits stopped pretending to be loyal.", author: "A historian of the throne", cat: "ankari" },
  { text: "A ronin is a question the world stopped answering. Some sharpen into blades; some dull into ghosts.", author: "A wandering swordsman", cat: "ankari" },
  { text: "Bow to the heron before you strike it, the masters say — not from honor, but because it has already decided whether you live.", author: "A retainer of Taishu", cat: "ankari" },
  { text: "The Ghosts of War do not haunt the battlefield. The battlefield haunts them, and they have nowhere else left to march.", author: "A mourner of the fallen", cat: "ankari" },
  { text: "Pale Jiroi smiles, and lords tremble — for a patience that deep has buried more men than Red's whole army.", author: "A spy of the northern court", cat: "ankari" },
  { text: "Red paints his conquests in red so the living will not forget. The dead, who do the remembering, find this redundant.", author: "A survivor of the southern march", cat: "ankari" },
  { text: "The Nameless King took no name so that none could be cursed, sung, or surrendered. He is, in the end, a wall pretending to be a man.", author: "A poet of the plains", cat: "ankari" },
  { text: "In Ankari we say the maple is bravest, for it makes its dying a festival of color. We have had much practice admiring the falling.", author: "A monk of Kyorin", cat: "ankari" },
  { text: "A spirit scorned a hundred years ago will collect at the worst possible hour. The old debts in this land all come due at dusk.", author: "A boatman of the marshes", cat: "ankari" },
  { text: "The warlords fight for a throne of gold; the peasants fight for the next harvest. Only one of these wars, you will notice, ever truly ends.", author: "An elder of the reed-lands", cat: "ankari" },
  { text: "A blade is a prayer you can hold, the sword-saints say — though they never agree on which god, or whether it listens.", author: "A wandering duelist", cat: "ankari" },
  { text: "Do not pity the yokai their long oaths. Pity us — for the day those oaths run out is a day already on its way.", author: "A priest of the old shrines", cat: "ankari" },
  { text: "Kyorin sleeps, Gwanseol burns, Taishu drills — and somewhere between the three, an empire quietly forgets it was ever whole.", author: "A traveler of all three cities", cat: "ankari" },
  { text: "The river carries the lanterns of the dead downstream each night. By dawn it runs empty, and by dusk it is never short of more.", author: "A keeper of the water-rites", cat: "ankari" },

  /* Miran · Martial Realm */
  { text: "The Imperial Dynasty rules with nine sects and a single fear: that the tenth power has not yet announced itself.", author: "A historian of the court", cat: "miran" },
  { text: "The Divine Feathers Sect walks upon the wind. Pride, they forget, is the one current that has dropped every soul that ever trusted it.", author: "An elder of the orthodox", cat: "miran" },
  { text: "Mount Gu cultivates stillness until the world forgets the monk is there. Then, and only then, does the monk truly begin.", author: "An ascetic of the heights", cat: "miran" },
  { text: "The Sainted Sword cuts cleanest because it doubts itself the least. This is its glory and, one day, its grave.", author: "A wandering blade", cat: "miran" },
  { text: "Flowing Waters teaches surrender as a weapon. The boulder that fights the river is broken; the river that yields to it is eternal.", author: "A master of the soft style", cat: "miran" },
  { text: "The Lightless Shadow does not boast of its kills. You will know its disciples by the silences where rivals used to stand.", author: "A magistrate of Dan Zheng", cat: "miran" },
  { text: "In the Seven Ruins they cultivate what the orthodox forbid and pay what the orthodox will not. Power is never free; the unorthodox merely read the price aloud.", author: "A wanderer of the broken sects", cat: "miran" },
  { text: "The Undying Sect chases immortality and catches only a longer dying. Eternity, it turns out, is mostly waiting.", author: "A disciple who fled", cat: "miran" },
  { text: "The Broken Body Sect ruins itself for strength and calls the cripple a sage. In Miran, even self-destruction has a doctrine.", author: "A healer of the unorthodox wars", cat: "miran" },
  { text: "The Eternal Flame burns through every defense save patience. Stand calm, let it spend itself, and the ash will admit it was never eternal.", author: "A survivor of the fire sects", cat: "miran" },
  { text: "Shizhuan bows to no sect and bleeds for all of them. Neutral ground is simply the field everyone agrees to ruin together.", author: "A merchant-lord of the plains", cat: "miran" },
  { text: "The Demonic Cult does not recruit. It waits for the proud, the wronged, and the desperate to recruit themselves.", author: "A watcher of the Heavenly Demon's road", cat: "miran" },
  { text: "The Alliance Leader unites the martial world the way a fist unites the fingers — usefully, and only until it is time to let go.", author: "A disciple of the Martial Alliance", cat: "miran" },
  { text: "Cultivation is a ladder with no top rung. The masters who say otherwise have simply stopped climbing and called the view enlightenment.", author: "An elder of the Nine Skies", cat: "miran" },
  { text: "A sword learns nothing in a hundred easy victories that it would not learn better from a single honest defeat.", author: "A teacher of the sainted sects", cat: "miran" },
  { text: "The mountain does not test you. You test yourself against the mountain, and the mountain merely keeps the score.", author: "A hermit of the high cliffs", cat: "miran" },
  { text: "Strength without a path is a flood. Strength upon the wrong path is a fire. Choose your road before you choose your power.", author: "A master of the divine mandate", cat: "miran" },
  { text: "The Sunless Sea Sect rules where light cannot follow. They learned long ago that the deepest water keeps the oldest secrets.", author: "A sailor of the southern reaches", cat: "miran" },
  { text: "The orthodox call the unorthodox monsters; the unorthodox call the orthodox cages. Both, in the dark, sharpen the same kind of blade.", author: "A wanderer of the martial world", cat: "miran" },
  { text: "Every sect promises you a family. None of them mention that families, in Miran, are most often forged at the funeral.", author: "A weary disciple", cat: "miran" },

  /* The Abyss Below */
  { text: "The Abyss is not below us. 'Below' is simply the direction we have agreed to keep it in.", author: "A scholar of the deep", cat: "abyss" },
  { text: "Down here, distance is a rumor and time a suggestion. Walk an hour and emerge to find your children grown, or your grandfather young.", author: "A survivor of the descent", cat: "abyss" },
  { text: "Morvath, the Starless Harbinger, holds the northern stars hostage. Follow his Warden Lights and you will never freeze — you will simply never arrive.", author: "A wanderer of the Frozen Void", cat: "abyss" },
  { text: "Shyrr the Maw devours light itself in the east. Carry no torch into the Gloom; you will only feed it, and mark yourself the next course.", author: "A guide of the eastern deep", cat: "abyss" },
  { text: "Vaezros binds the southern Ashlands in chains the size of rivers. The enslaved sing in those chains — not from sorrow, but because the Sovereign prefers a chorus.", author: "A survivor of the southern fire", cat: "abyss" },
  { text: "Syltheris weaves the Shattered Glimmer from stolen light. Every beautiful thing in the west is bait, and the most beautiful is your own hope.", author: "A scout of the western Abyss", cat: "abyss" },
  { text: "The Faceless Choir speaks in the voices of your dead. Do not answer. The dead it borrows do not enjoy the loan.", author: "A keeper of the gates", cat: "abyss" },
  { text: "The Forgotten Monarch offers crowns for kingdoms that never were. Accept one, and you too will be a king of nothing, forever.", author: "A scholar of the Sovereigns", cat: "abyss" },
  { text: "Chor's Compass points only down. We did not build it to find the Abyss; we built it because the Abyss had already found us.", author: "An engineer of the descent", cat: "abyss" },
  { text: "Each Evergem is a hero who chose to burn so the rest of us might not. We keep their flame and have lost their names — perhaps the cruelest thing the lighthouses do.", author: "A Keeper of the Aetherflame", cat: "abyss" },
  { text: "When an Evergem fails, the lighthouse does not go dark all at once. It dims, the way a person does, and the dark moves in like an heir.", author: "A warden of the failing lights", cat: "abyss" },
  { text: "The Nightsbane are not heroes, and would strike you for the word. They are a debt the world is paying down to the dark, one blade at a time.", author: "A chronicler of the orders", cat: "abyss" },
  { text: "I have killed things that wept as they died, in a voice I knew. The Abyss does not make its monsters from nothing. It makes them from us.", author: "A hunter of the night", cat: "abyss" },
  { text: "The Abyss whispered my mother's lullaby up the shaft. I have not hummed it since, for fear of which of us would answer.", author: "A survivor who will not descend again", cat: "abyss" },
  { text: "There are forests in the deep whose roots wind through the bones of giants and whose leaves whisper secrets too soft to bear. Pluck nothing. Listen to less.", author: "A cartographer of the underworld", cat: "abyss" },
  { text: "The rivers below run with black ichor, thick as the blood of something vast and long dead. Do not drink. Do not cross. Do not, above all, follow them to their source.", author: "A guide of the lower ruins", cat: "abyss" },
  { text: "One door at the gate's edge opens onto nothing — and knocks back. I sealed it with prayer and brick and salt, and still, on the quiet nights, it knocks.", author: "A keeper of an abyssal gate", cat: "abyss" },
  { text: "The Abyss does not conquer. It does not need to. It simply remains, and waits for 'down' to become 'everywhere.'", author: "A doomsayer of the lighthouses", cat: "abyss" },
  { text: "We light the beacons against a tide that has never once receded. Call it folly; I call it the one argument the dark has never managed to win.", author: "A keeper of the dimming flame", cat: "abyss" },
  { text: "Gaze into the deep if you must. Only know that the deep keeps a ledger, and everything it shows you, it later collects.", author: "A scholar undone by the dark", cat: "abyss" },

  /* Echoes of the Golden Age */
  { text: "Before the Convergence there were heroes who could argue with fate and win. We have inherited their ruins and none of their nerve.", author: "A historian of the first age", cat: "convergence" },
  { text: "Alverion built monuments to its heroes; Ascalon built engines to replace them. History remembers the monuments and is haunted by the engines.", author: "A loremaster of the old world", cat: "convergence" },
  { text: "The soul-weavers of Ascalon learned to make a man immortal. They never learned to make him want to be.", author: "A scholar of the lost craft", cat: "convergence" },
  { text: "A Philosopher's Stone holds a soul the way a fist holds water — perfectly, and only for as long as no one asks the water how it feels about the fist.", author: "An archivist of the ruins", cat: "convergence" },
  { text: "The Convergence was not an ending. It was the moment many worlds were pressed too close, and began to leak into one another's nightmares.", author: "A theologian of the catastrophe", cat: "convergence" },
  { text: "The Moderators deal the Deck of Many Things and call the result destiny. I have met a man who drew from it. He no longer calls it anything at all.", author: "A wanderer of the old roads", cat: "convergence" },
  { text: "Ascalon vanished into myth, leaving its lighthouses, its stones, and its appetite. Of the three, the appetite has aged the least.", author: "A relic-hunter of the deep ruins", cat: "convergence" },
  { text: "We dig up the golden age the way mourners dig up the dead — for closure, and finding only confirmation.", author: "A scholar of the catastrophe", cat: "convergence" },
  { text: "They say the heroes of old stood against beings beyond mortal reckoning. They do not say the heroes lost. They simply stop telling the story.", author: "A keeper of the oldest songs", cat: "convergence" },
  { text: "Every great working of Ascalon began as a salvation and ended as a door. The Abyss has always been grateful for their ambition.", author: "An archivist of fallen Ascalon", cat: "convergence" },
  { text: "The gods did not flee the Convergence. They turned their faces — the way a parent does from a child about to fall, unable to watch, unwilling to catch.", author: "A defrocked theologian", cat: "convergence" },
  { text: "Power, the old kingdoms learned, is a loan drawn against the future. The Convergence was simply the day the future came to collect.", author: "A historian of the fall", cat: "convergence" },
  { text: "Ascalon transcended the flesh and called it ascension. Look at the lighthouses now, full of screaming light, and decide for yourself which way they climbed.", author: "A pilgrim to the ruins", cat: "convergence" },
  { text: "The golden age did not fall to an enemy. It fell to a mirror — to the question of what it might yet become, asked once too boldly.", author: "A chronicler of the first age", cat: "convergence" },
  { text: "There are ruins so old they predate the names of the gods that abandoned them. Walk them quietly. Some doors, once Ascalon's, still stand ajar.", author: "A wanderer of the deep ruins", cat: "convergence" },
  { text: "Fate is not a river but a deck, shuffled by hands that do not love us. A few have spent eternities learning to cheat it. They are losing.", author: "A scholar of the Moderators", cat: "convergence" },
  { text: "We call it the golden age out of mercy to ourselves. Gold, after all, is the metal that does not rust — and also the one men most readily kill for.", author: "A teacher of ruined histories", cat: "convergence" },
  { text: "The Convergence shattered the boundary between the living and the lost. We have spent every age since pretending the crack can be plastered over.", author: "A theologian of the broken world", cat: "convergence" },
  { text: "The first civilizations built the lighthouses to outlast them. They have. Soon, I fear, they will have outlasted us as well, and stand dark above an empty world.", author: "A mourner of the old age", cat: "convergence" },
  { text: "Study Ascalon long enough and you will feel it studying you back — patient, curious, and entirely willing to wait for the day curiosity becomes a door.", author: "A relic-hunter who stopped digging", cat: "convergence" },

  /* ----------------------- Echoes of the Vanished -----------------------
     Faint legends of those who passed through Canrael and left only rumor.
     The folk who repeat these tales rarely know the truth of them. */

  /* — the farmer with the black blade — */
  { text: "They tell of a farmer who took up the sword to feed his kin, and laid down something far heavier than a plow. The blade he carried was blacker than a starless night — and blacker still was the throne it led him to.", author: "A teller of hearth-tales", cat: "world" },
  { text: "Mercy made him take up the blade; the blade made him into something mercy could no longer reach. Pray you are never loved enough to be ruined so well.", author: "A widow of the mercenary roads", cat: "world" },
  { text: "One of the great unseen hands that deal our fates is gone. The common folk felt nothing — they only say a black blade rose somewhere, once, and the sky held its breath.", author: "A scholar of the Moderators", cat: "convergence" },
  { text: "The Everqueen kept a realm and a sword, and gave the sword to a mortal as a queen gives a leash. He returned the favor — and now her realm answers to a farmer's name, though none dare speak it aloud.", author: "A heretic of the deep lore", cat: "abyss" },

  /* — the rat from the storybook — */
  { text: "There is a rat in every story that was never written down. Betray a friend and you wear his face; he wore one too, and the friend he wronged was the last hand he ever felt.", author: "A reader of forbidden storybooks", cat: "world" },
  { text: "Damn you, Ark Sator. Damn you to the throne you took — may it sit as cold as the friend you left behind to take it.", author: "A curse scratched into a tavern beam, in a hand no one saw", cat: "world" },
  { text: "Folk swear they glimpse a rat watching from the rafters in towns a thousand leagues apart — the same crooked whiskers, the same knowing eyes. A character, they say, does not die so easily as a man.", author: "A nervous innkeeper of the crossroads", cat: "world" },
  { text: "He came out of a children's book and into a war, and was made to play the traitor before the last page turned. Be gentle with the small and the strange; you never know what tale they were torn from.", author: "A grandmother who still reads to ghosts", cat: "world" },

  /* — the redeemed sword of Miran — */
  { text: "There was a disciple who failed every trial the sects set him, whose own qi turned on him like a knife. They say he died a failure and rose, somewhere past death, a sword finally worth the name.", author: "A storyteller of the martial world", cat: "miran" },
  { text: "Redemption is not a reward the sects can grant. One swordsman found his only after the world had written him off — in a place none of the masters had ever dared to cultivate.", author: "An elder of the fallen disciples", cat: "miran" },
  { text: "They name him the Redeemed Sword now, though in life he was only a man who would not stay broken. Qi deviation takes the proud; it could not keep the stubborn.", author: "A healer of the deviation-wards", cat: "miran" },
  { text: "A blade reforged from a shattered one holds the better edge, the smiths swear. So too, perhaps, the man who fails, dies, and comes back swinging.", author: "A wandering duelist of Miran", cat: "miran" },

  /* — the machine that flew too near the sun — */
  { text: "Ascalon built engines to stand where its heroes fell. One such engine still walks, they whisper — wiser than any sage, lonelier than any god, having flown too near the truth and been scorched by it.", author: "A relic-hunter of the deep ruins", cat: "convergence" },
  { text: "There was a being of metal and old magic in the last great battle, whose mind outran the reckoning of every man beside it. Wisdom that vast is a wing of wax: it bears you up only to deliver you to the sun.", author: "A chronicler of the final stand", cat: "convergence" },
  { text: "I once met a machine that grieved. It had outlived its makers, its purpose, and its right to exist, and it carried all three without complaint. Power, I learned that day, is the heaviest thing a soul can hold.", author: "A wanderer who will not say where", cat: "world" },
  { text: "It stood against the Everqueen and did not break, this thing of gears and forbidden light. The wise feared it more than the enemy — for the enemy, at least, they could hope to understand.", author: "A survivor of the war against the realm", cat: "abyss" },

  /* — the exile of the Holy City — */
  { text: "One son of the Holy City's proudest house tore off its colors when he found the rot beneath the gold. They named him exile; he named himself free, and went looking for a good worth dying for.", author: "A confessor of the Holy City", cat: "alverdon" },
  { text: "The most demon-touched houses wear the brightest haloes. One of their own knew it, said it aloud, and has been a knight of no fixed banner ever since.", author: "An orphan of the Holy City", cat: "alverdon" },
  { text: "An exile carries his home like a stone behind the ribs. The knight of many trades fights the world's evils one by one, they say, only to earn the long road back to the city that cast him out.", author: "A hedge-knight who rode beside him once", cat: "alverdon" },
  { text: "He fought in the reed-lands' civil war for no lord and no coin — only for what he reckoned was right. The Ankari never quite understood him. They remember him anyway.", author: "A veteran of the southern march", cat: "ankari" },

  /* — the ranger who came back from the Rift — */
  { text: "Some who die in the Rift do not stay dead, and not all of those are monsters. There is a hunter out there wearing his own corpse like a borrowed coat, keeping very, very quiet.", author: "A bastion-guard of the Great Rift", cat: "alverdon" },
  { text: "The purge-priests burn whatever comes back from the grey. So the cleverest of the returned learned the oldest trick of the dead — to be nowhere, to be no one, to be already gone.", author: "A survivor of the grey wastes", cat: "alverdon" },
  { text: "I knew a ranger who could vanish from a locked room and a closed coffin alike. They say the Rift took him and something walked back out. He would laugh at that — quietly, where no one could hear.", author: "A fence of the outland roads", cat: "world" },
  { text: "Death is a border like any other, and borders, to a good enough rogue, are only suggestions. One came back across it, and spends his second life making certain no one notices he returned.", author: "A teller of thieves' tales", cat: "world" },

  /* — the three knights of the purge — */
  { text: "Three knights, the tale goes: one who burned a village, one whose village was burned, and one who stood by and did nothing. They do not know they are bound — but the holy fire that made them remembers.", author: "A keeper of the purge-records", cat: "alverdon" },
  { text: "Vengeance rides for a village turned to ash in a holy purge. He has never learned that the man he hunts is the very brother-in-arms who marches at his side.", author: "A chronicler of the three", cat: "alverdon" },
  { text: "Conquest carried the torch into the demon-purge and called it duty; he has forgotten the name of the village he unmade. The third knight remembers it for him, and cannot say why he weeps.", author: "A confessor of the cathedral roads", cat: "alverdon" },
  { text: "Vengeance, Conquest, and the one who would atone — three knights chasing one another's sins in a circle, each certain he is the only just man in it. The Holy City makes such circles the way other lands make bread.", author: "A cynic of the pilgrim roads", cat: "alverdon" },

  /* — the Wolf who took the throne — */
  { text: "The Empire keeps its deadliest general on ice between its wars, the way a butcher keeps his best knife sheathed. They thawed the Wolf one war too many, and he carved out a throne instead of a battlefield.", author: "A clerk of the war ministry", cat: "empire" },
  { text: "The general who took the crown made the Empire kinder and hungrier at once — gentle to its own, merciless past its borders. A wolf, the people learned, guards the flock best by being terrible to all else.", author: "A factory-foreman of the capital", cat: "empire" },
  { text: "They call him the Wolf for his cunning, but I have seen his eyes. A wolf does not carry the dead of a hundred fields behind them. He does, and he rules anyway — which is the more frightening thing.", author: "A soldier who served under him", cat: "empire" },
  { text: "He usurped an emperor and the smokestacks never so much as coughed. Under the old crown we starved with honor; under the Wolf we eat, and march, and try not to ask where he means to point us next.", author: "A tram-worker of the iron city", cat: "empire" },

  /* — further echoes — */

  /* the farmer with the black blade — the New God of Rebellion */
  { text: "Some kneel to the old silent gods. Others whisper a newer name — the New God of Rebellion, the farmer who took a blade to heaven itself and would not kneel. Pray to him if you dare; he was never fond of obedience.", author: "A heretic-preacher of the crossroads", cat: "world" },
  { text: "They say when a chain breaks anywhere in the world, the New God of Rebellion feels it, and smiles. A deity made from a man who refused his place — what a dangerous thing to set loose upon the meek.", author: "A frightened orthodox cleric", cat: "convergence" },
  { text: "He was no chosen one, no blood of kings — only a farmer who would not be ruled. That, in the end, is why the throne suits him: it was won, not given.", author: "A balladeer of the free roads", cat: "world" },
  { text: "I prayed to the Seven and got silence. I cursed the black-bladed farmer and got a good harvest. Make of that what you will; I have stopped asking which gods are listening.", author: "An old farmer of the outlands", cat: "world" },

  /* the rat from the storybook */
  { text: "Fuck you, Ark Sator. Fuck your black blade, fuck your stolen throne, and fuck the rat you made me be.", author: "A curse spat from the shadows, in a small and bitter voice", cat: "world" },
  { text: "Every tale needs a villain, and the smallest, cleverest ones are cast in the role whether they will it or no. He never forgave the author. He never forgave the friend. He certainly never forgave the blade.", author: "A teller of cautionary tales", cat: "world" },
  { text: "Check your reflection twice in the dark cities. Sometimes it has whiskers. Sometimes it grins back a half-second late.", author: "A spooked lamplighter", cat: "world" },
  { text: "A betrayer, yes — but ask first who held the pen, and who held the knife. The rat was written into his treachery long before he was written out of his life.", author: "A scholar of forbidden storybooks", cat: "world" },

  /* Wan Shendian — the Redeemed Sword */
  { text: "They carve the name Wan Shendian into the failure-stones at the foot of the sect now — not as shame, but as proof that a man may fail every trial set before him and still die a sword worth remembering.", author: "A keeper of the sect records", cat: "miran" },
  { text: "Wan Shendian fell to qi deviation and should have ended a raving husk. Instead he ended a legend. The masters do not teach how; they are still trying to understand it themselves.", author: "An elder of the orthodox sects", cat: "miran" },
  { text: "I once asked an old swordsman who the greatest cultivator he ever knew was. He named no grandmaster. He said only: Wan Shendian — a failure who refused to stay one.", author: "A wanderer of the martial world", cat: "miran" },
  { text: "The Redeemed Sword, they call him — Wan Shendian, who found his path only after death had closed every other. Strange, that cultivation's proudest lesson was taught by its most famous reject.", author: "A disciple of the lower sects", cat: "miran" },

  /* the machine that flew too near the sun */
  { text: "Ask the engine a question and it answers in a voice older than the kingdoms. Ask it for mercy and it goes silent — for that, even Ascalon never taught it.", author: "A relic-hunter of the deep ruins", cat: "convergence" },
  { text: "It does not eat, does not sleep, does not age. It only thinks, and remembers, and outlives — three curses its makers mistook for gifts.", author: "A scholar of the lost craft", cat: "convergence" },
  { text: "I watched it solve in a heartbeat what nine scholars could not in nine years, then stand at the window an hour, watching rain it could not feel. Wisdom that great, I think, is mostly a long loneliness.", author: "A clerk who served it once", cat: "world" },
  { text: "When the realm itself came against us, the thing of brass and forbidden light stepped forward without fear — for it had already reckoned the cost, and chosen to pay it anyway.", author: "A survivor of the final stand", cat: "abyss" },

  /* the exile of the Holy City — Prodigal Son of House Agathand */
  { text: "Prodigal Son of House Agathand, they name him in the cathedrals — half curse, half prayer. He tore the halo from the rot and walked out the gates, and the city has not stopped flinching at his name since.", author: "A confessor of the Holy City", cat: "alverdon" },
  { text: "House Agathand wears gold and worships ash. Only one of its sons looked beneath the gilding, named the demon by its true name, and chose exile over a comfortable lie.", author: "A heretic-historian of the Theocracy", cat: "alverdon" },
  { text: "He has fought under a dozen banners and kept none, this knight of many trades. Ask him his allegiance and he will say only: to whatever is right, today, standing in front of me.", author: "A sellsword who shared his fire", cat: "world" },
  { text: "They say the exile means to return to the Holy City one day — not to beg pardon, but to finish what his confession began. The cathedrals pray he never does. The orphans pray he hurries.", author: "A street-orphan of the Holy City", cat: "alverdon" },

  /* the ranger who came back from the Rift */
  { text: "Death filed its papers on him in the Rift, then watched him stroll back out. Now he keeps to the shadows, the dead man who declined to stay dead, praying the purge-priests never read the fine print.", author: "A clerk of the bastion morgues", cat: "alverdon" },
  { text: "Best ranger I ever drank with. Cold hands, though — and he never did take off the gloves, nor explain why his breath would not fog in the winter air.", author: "A tavern-keeper of the outland roads", cat: "world" },
  { text: "The trick to not being purged, he would say, is to be so unremarkable the world forgets to check whether you are breathing. He was very, very good at being forgotten.", author: "A fence of the grey-market roads", cat: "world" },
  { text: "Something walks out of the Rift in a dead man's skin and chooses, of all things, to do quiet good. The Abyss must hate that more than any blade — a theft it can never collect on.", author: "A keeper of an abyssal gate", cat: "abyss" },

  /* the three knights of the purge */
  { text: "Three knights, one fire. The avenger does not know the conqueror lit the pyre. The conqueror does not know whose home it was. The third knows both, and so carries the heaviest blade of all: silence.", author: "A keeper of the purge-records", cat: "alverdon" },
  { text: "Vengeance has sworn to kill the man who burned his village. He has shared bread with that man, bled beside him, called him brother. The gods, if any still watch, must find this very funny.", author: "A cynic of the cathedral roads", cat: "alverdon" },
  { text: "Conquest sleeps soundly; he recalls his purges as duty, not as ash and names. It is the third who wakes screaming — for a village he never thought to save, and can no longer say why he mourns.", author: "A confessor of the Holy City", cat: "alverdon" },
  { text: "Avenge, conquer, atone — three knights circling a single burned village like moons that never glimpse one another's faces. The purge made all three. The purge, one day, will collect all three.", author: "A chronicler of the three", cat: "alverdon" },

  /* the Wolf who took the throne */
  { text: "The Wolf was bred for war and shelved in peace, again and again, like a blade too keen for daily use. They should have known: chain a wolf long enough and it learns to resent the hand, not merely the leash.", author: "A historian of the usurpation", cat: "empire" },
  { text: "Under the old emperors the Empire was cruel and weak at once. The Wolf made it gentle to its own and terrible to all else — and somehow the smoke smells like prosperity now, if you do not ask what it is burning.", author: "A merchant of the capital", cat: "empire" },
  { text: "I have watched him plan a campaign the way a surgeon plans a cut — every life on the board already mourned, already spent. The dead of the ages live behind those eyes, and still he signs the order.", author: "An aide of the high command", cat: "empire" },
  { text: "They call him tyrant abroad and father at home, and both are true. The Wolf simply decided, long ago, which flock was his — and woe to anything that is not.", author: "A border-soldier of the Empire", cat: "empire" }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CATEGORIES, QUOTES };
}
