// Haiku Daily — a curated pool of real, public-domain haiku by the classical
// Japanese masters, chosen for philosophical depth.
//
// Each entry has:
//   jp     — the original Japanese (public domain)
//   lines  — a faithful English rendering (written for this project, so as not
//            to reproduce any modern translator's copyrighted wording)
//   author — the poet who wrote the original
//   dates  — the poet's lifespan
//   kanji  — a single character evoking the poem's theme (watermark)
//   theme  — a short English theme label
//
// All poets here died long ago; their originals are in the public domain.
// To add more, append objects in the same shape and push to GitHub.

const HAIKUS = [
  { jp: "古池や蛙飛び込む水の音", lines: ["The old pond—", "a frog leaps in:", "the sound of water"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "静", theme: "stillness · the eternal now" },
  { jp: "旅に病んで夢は枯野をかけ廻る", lines: ["Sick on my journey,", "my dreams roam on and on", "over withered fields"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "夢", theme: "impermanence (his death poem)" },
  { jp: "夏草や兵どもが夢の跡", lines: ["Summer grasses—", "all that now remains", "of warriors' dreams"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "跡", theme: "the ruins of ambition" },
  { jp: "やがて死ぬけしきは見えず蝉の声", lines: ["Nothing in the cry", "of the cicada reveals", "how soon it must die"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "命", theme: "mortality, unsuspected" },
  { jp: "此の道や行く人なしに秋の暮", lines: ["This road—", "with no one walking it,", "autumn nightfall"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "道", theme: "solitude · the Way" },
  { jp: "閑さや岩にしみ入る蝉の声", lines: ["Such deep stillness—", "piercing into the rock,", "the cicada's cry"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "閑", theme: "stillness" },
  { jp: "枯朶に烏のとまりけり秋の暮", lines: ["On a withered branch", "a crow has settled down—", "autumn evening"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "寂", theme: "sabi · austere beauty" },
  { jp: "荒海や佐渡によこたふ天の河", lines: ["A wild, rough sea—", "and stretched toward Sado Isle,", "the River of Heaven"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "天", theme: "the vast and the small" },
  { jp: "稲妻にさとらぬ人の貴さよ", lines: ["How admirable—", "he who, seeing lightning,", "thinks not 'life is brief'"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "悟", theme: "wisdom past words" },
  { jp: "年々や猿に着せたる猿の面", lines: ["Year upon year,", "upon the monkey's face,", "a monkey's mask"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "面", theme: "the unchanging self" },
  { jp: "海暮れて鴨の声ほのかに白し", lines: ["The sea grows dark—", "and the wild ducks' faint cries", "are faintly white"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "闇", theme: "the edges of perception" },
  { jp: "秋深き隣は何をする人ぞ", lines: ["Autumn deepening—", "and the man next door,", "how does he live?"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "思", theme: "wondering at another's life" },
  { jp: "雲折々人を休める月見かな", lines: ["Now and again", "the clouds grant us rest", "from gazing at the moon"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "月", theme: "relief in interruption" },
  { jp: "京にても京なつかしや時鳥", lines: ["Even in Kyoto,", "hearing the cuckoo's call,", "I long for Kyoto"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "郷", theme: "longing within presence" },
  { jp: "初雪や水仙の葉のたわむまで", lines: ["First snow—", "just enough to bend", "the daffodil leaves"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "雪", theme: "fragile balance" },
  { jp: "淋しさを問てくれぬか桐一葉", lines: ["Won't you come and ask", "after this loneliness?—", "one paulownia leaf"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "葉", theme: "loneliness, offered" },
  { jp: "物言へば唇寒し秋の風", lines: ["Say but a word", "and the lips go cold—", "the autumn wind"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "黙", theme: "the cost of speaking" },

  { jp: "露の世は露の世ながらさりながら", lines: ["This dewdrop world", "is but a world of dew—", "and yet… and yet…"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "露", theme: "grief and acceptance" },
  { jp: "蝸牛そろそろ登れ富士の山", lines: ["O snail,", "climb Mount Fuji—", "but slowly, slowly"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "歩", theme: "patience" },
  { jp: "世の中は地獄の上の花見かな", lines: ["In this our world", "we stroll the roof of hell", "and gaze at flowers"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "世", theme: "beauty over the abyss" },
  { jp: "やれ打つな蠅が手をすり足をする", lines: ["Do not strike the fly!—", "look, it wrings its hands,", "it wrings its feet"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "慈", theme: "compassion for the small" },
  { jp: "目出度さもちう位なりおらが春", lines: ["My New Year's fortune—", "only middling,", "for me and mine"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "足", theme: "humble contentment" },
  { jp: "我と来て遊べや親のない雀", lines: ["Come and play with me,", "little sparrow", "with no mother"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "孤", theme: "the orphan's kinship" },
  { jp: "ともかくもあなた任せの年の暮", lines: ["However it goes,", "I leave it all to you—", "the year's end"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "任", theme: "surrender · trust" },
  { jp: "雪とけて村いっぱいの子どもかな", lines: ["The snow melts away", "and the village overflows", "with children"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "童", theme: "renewal" },

  { jp: "涼しさや鐘をはなるるかねの声", lines: ["Coolness—", "the bell's low voice", "leaving the bell"], author: "Yosa Buson", dates: "1716–1784", kanji: "鐘", theme: "the sound and its source" },
  { jp: "斧入れて香におどろくや冬木立", lines: ["Sinking the axe in,", "I start at the sudden scent—", "winter woods"], author: "Yosa Buson", dates: "1716–1784", kanji: "香", theme: "the shock of the real" },
  { jp: "春の海終日のたりのたりかな", lines: ["The sea in springtime,", "all the long day rising,", "falling, gently"], author: "Yosa Buson", dates: "1716–1784", kanji: "海", theme: "the rhythm of time" },
  { jp: "月天心貧しき町を通りけり", lines: ["The moon at zenith—", "and I pass on through", "a poor little town"], author: "Yosa Buson", dates: "1716–1784", kanji: "心", theme: "solitude under the moon" },
  { jp: "釣鐘にとまりて眠る胡蝶かな", lines: ["On the temple bell,", "settled there, asleep—", "a butterfly"], author: "Yosa Buson", dates: "1716–1784", kanji: "儚", theme: "peace upon the edge" },
  { jp: "行く我にとどまる汝に秋二つ", lines: ["I, going;", "you, staying—", "two autumns now"], author: "Yosa Buson", dates: "1716–1784", kanji: "別", theme: "parting" },

  { jp: "朝顔に釣瓶とられてもらひ水", lines: ["The morning glory", "has seized my well-bucket—", "I go to borrow water"], author: "Chiyo-ni", dates: "1703–1775", kanji: "生", theme: "reverence for life" },
  { jp: "蜻蛉釣り今日はどこまで行ったやら", lines: ["My dragonfly-hunter—", "how far, I wonder,", "has he gone today?"], author: "Chiyo-ni", dates: "1703–1775", kanji: "哀", theme: "a mother's grief" },

  { jp: "糸瓜咲て痰のつまりし仏かな", lines: ["The sponge-gourd blooms—", "and choked with phlegm,", "a Buddha I become"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "仏", theme: "meeting death (his death poem)" },
  { jp: "柿くへば鐘が鳴るなり法隆寺", lines: ["I bite a persimmon—", "and a temple bell tolls:", "Hōryū-ji"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "今", theme: "the fullness of a moment" },
  { jp: "秋風や我に神なし仏なし", lines: ["The autumn wind—", "for me there is no god,", "there is no Buddha"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "風", theme: "facing the void alone" },
  { jp: "蜘蛛殺す後の淋しき夜寒かな", lines: ["Having killed a spider,", "how lonely the night turns,", "cold to the bone"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "独", theme: "the weight of a small cruelty" },

  { jp: "盗人に取り残されし窓の月", lines: ["The thief", "left it behind—", "the moon at my window"], author: "Ryōkan", dates: "1758–1831", kanji: "無", theme: "what cannot be stolen" },

  { jp: "落花枝に帰ると見れば胡蝶かな", lines: ["A fallen blossom", "returning to its branch, I thought—", "but no, a butterfly"], author: "Arakida Moritake", dates: "1473–1549", kanji: "幻", theme: "illusion and seeing" },

  { jp: "名月や畳の上に松の影", lines: ["The harvest moon—", "and on the tatami mats,", "a pine tree's shadow"], author: "Takarai Kikaku", dates: "1661–1707", kanji: "影", theme: "presence and its shadow" },

  { jp: "蛤のふたみにわかれ行く秋ぞ", lines: ["Like a clam", "wrenched from its shell, I go—", "autumn departing"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "別", theme: "parting" },
  { jp: "旅人と我が名呼ばれん初しぐれ", lines: ["Let them call me", "a wanderer—", "first winter rain"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "旅", theme: "the traveler's name" },
  { jp: "野ざらしを心に風のしむ身哉", lines: ["Bleached bones", "in my mind's eye—the wind", "cuts through my flesh"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "風", theme: "mortality on the road" },
  { jp: "名月や池をめぐりて夜もすがら", lines: ["The harvest moon—", "round and round the pond I walked", "the whole night through"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "月", theme: "absorption in beauty" },
  { jp: "山路来て何やらゆかしすみれ草", lines: ["Coming up the mountain path,", "somehow so moving—", "a wild violet"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "花", theme: "small things that touch us" },
  { jp: "花の雲鐘は上野か浅草か", lines: ["Clouds of blossom—", "is that bell from Ueno,", "or from Asakusa?"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "響", theme: "reverie" },
  { jp: "草の戸も住み替る代ぞ雛の家", lines: ["Even a grass-thatched hut,", "in its turn, changes hands—", "a house of dolls now"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "移", theme: "all things pass to others" },
  { jp: "五月雨をあつめて早し最上川", lines: ["Gathering the summer rains,", "swift and swollen—", "the Mogami River"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "流", theme: "the gathering of all things" },
  { jp: "あらたふと青葉若葉の日の光", lines: ["How sacred—", "green leaves, young leaves,", "and the light of the sun"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "光", theme: "reverence" },
  { jp: "道のべの木槿は馬に喰はれけり", lines: ["The rose of Sharon", "at the roadside—", "eaten by my horse"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "儚", theme: "beauty undone by chance" },
  { jp: "行く春や鳥啼き魚の目は泪", lines: ["Spring is leaving—", "the birds cry out, and the eyes", "of the fish are wet"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "涙", theme: "all things grieve to part" },
  { jp: "父母のしきりに恋し雉子の声", lines: ["How I ache", "for my mother and father—", "a pheasant's cry"], author: "Matsuo Bashō", dates: "1644–1694", kanji: "親", theme: "longing for the lost" },

  { jp: "名月を取つてくれろと泣く子哉", lines: ["'Fetch me down", "that harvest moon!'—", "the child wailing"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "望", theme: "innocent longing" },
  { jp: "雀の子そこのけそこのけお馬が通る", lines: ["Little sparrow,", "out of the way, out of the way!—", "the horse is coming"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "児", theme: "tenderness for the helpless" },
  { jp: "痩蛙まけるな一茶是に有", lines: ["Scrawny frog,", "don't you lose—", "Issa is here!"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "励", theme: "solidarity with the weak" },
  { jp: "是がまあつひの栖か雪五尺", lines: ["So this, at last,", "is my final home?—", "five feet of snow"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "終", theme: "resignation" },
  { jp: "春風や牛に引かれて善光寺", lines: ["Spring breeze—", "led along by a cow", "to Zenkō Temple"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "縁", theme: "grace in being led" },
  { jp: "秋の夜や旅の男の針仕事", lines: ["Autumn night—", "a man far from home,", "mending his clothes"], author: "Kobayashi Issa", dates: "1763–1828", kanji: "独", theme: "self-reliant solitude" },

  { jp: "菜の花や月は東に日は西に", lines: ["A field of mustard flowers—", "the moon in the east,", "the sun in the west"], author: "Yosa Buson", dates: "1716–1784", kanji: "宙", theme: "the turning cosmos" },
  { jp: "ゆく春や重たき琵琶の抱心", lines: ["Spring departing—", "how heavy the lute", "feels in my arms"], author: "Yosa Buson", dates: "1716–1784", kanji: "哀", theme: "the weight of beauty passing" },
  { jp: "五月雨や大河を前に家二軒", lines: ["The summer rains—", "and facing the swollen river,", "two small houses"], author: "Yosa Buson", dates: "1716–1784", kanji: "雨", theme: "fragility before nature" },
  { jp: "寒月や枯木の中の竹三竿", lines: ["The cold moon—", "among the bare trees,", "three stalks of bamboo"], author: "Yosa Buson", dates: "1716–1784", kanji: "寒", theme: "austere clarity" },
  { jp: "牡丹散て打かさなりぬ二三片", lines: ["The peony scattered,", "and they lie heaped together—", "two petals, three"], author: "Yosa Buson", dates: "1716–1784", kanji: "落", theme: "beauty in its falling" },
  { jp: "凧きのふの空の有りどころ", lines: ["The kite—", "in the very place in the sky", "it held yesterday"], author: "Yosa Buson", dates: "1716–1784", kanji: "空", theme: "constancy amid change" },
  { jp: "山は暮れて野は黄昏の薄哉", lines: ["The mountains have darkened,", "and in the dusk of the fields,", "pampas grass"], author: "Yosa Buson", dates: "1716–1784", kanji: "暮", theme: "the layered fall of evening" },

  { jp: "鶏頭の十四五本もありぬべし", lines: ["Cockscombs—", "there must be", "fourteen, or fifteen"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "有", theme: "the plain fact of being" },
  { jp: "いくたびも雪の深さを尋ねけり", lines: ["How many times", "I asked them", "how deep the snow had grown"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "問", theme: "the longing of the confined" },
  { jp: "春や昔十五万石の城下哉", lines: ["Spring as it was long ago—", "a castle town", "of a hundred-fifty thousand koku"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "昔", theme: "the glory that fades" },
  { jp: "赤蜻蛉筑波に雲もなかりけり", lines: ["Red dragonflies—", "and over Mount Tsukuba", "not a single cloud"], author: "Masaoka Shiki", dates: "1867–1902", kanji: "澄", theme: "perfect clarity" },

  { jp: "裏を見せ表を見せて散る紅葉", lines: ["Showing its back,", "then showing its face,", "a maple leaf falls"], author: "Ryōkan", dates: "1758–1831", kanji: "真", theme: "dying without concealment" },
  { jp: "焚くほどは風がもてくる落葉かな", lines: ["Just enough", "to feed the fire—", "leaves the wind brings"], author: "Ryōkan", dates: "1758–1831", kanji: "足", theme: "trusting in enough" },

  { jp: "行水の捨てどころなき虫の声", lines: ["Nowhere", "to pour out the bath water—", "insects singing all around"], author: "Uejima Onitsura", dates: "1661–1738", kanji: "慈", theme: "reverence for all life" },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = HAIKUS;
}
