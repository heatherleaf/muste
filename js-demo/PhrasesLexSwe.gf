--# -path=.:alltenses

concrete PhrasesLexSwe of PhrasesLex = CatSwe **
  open ParadigmsSwe, Prelude, (M=MorphoSwe), (G=GrammarSwe), (L=LexiconSwe), (S=StructuralSwe) in {

flags coding = utf8 ;

lincat

	AdjAdv = {adj: A; adv: Adv};


lin

--NOUNS
-- neutrum = ett, utrum = en

	body_N = mkN "kropp" ;
	head_N = mkN "huvud" neutrum ;
	hair_N = mkN "hår" neutrum ;
	eye_N = mkN "öga" "ögat" "ögon" "ögonen" ;
	ear_N = mkN "öra" "örat" "öron" "öronen" ;
	nose_N = mkN "näsa" ;
	mouth_N = mkN "mun" "munnen" "munnar" "munnarna" ;
	throat_N = mkN "hals" ;
	hand_N = mkN "hand" "händer" ;
	stomach_N = mkN "mage" "magar" ;
	butt_N = mkN "stjärt" ;
	leg_N = mkN "ben" neutrum ;
	foot_N = mkN "fot" "fötter" ;
	arm_N = mkN "arm" ;
	hug_N = mkN "kram" ;
	massage_N = mkN "massage" "massager" ;
	medicine_N = mkN "medicin" "mediciner" ;
	makeup_N = mkN "smink" neutrum ;
	helmet_N = mkN "hjälm" ;
	pillow_N = mkN "kudde" "kuddar" ;
	napkin_N = mkN "servett" "servetter" ;
	bib_N = mkN "haklapp" ;
	watch_N = mkN "klocka" ;
	brush_N = mkN "borste" "borstar" ;
	jewellery_N = mkN "smycke" ;
	shoe_N = mkN "sko" "skor" ;
	sock_N = mkN "strumpa" ;
	tooth_N = mkN "tand" "tänder" ;
	wheelchair_N = mkN "rullstol" ;
	electric7wheelchair_N = mkN "elrullstol" ;
	bike_N = mkN "cykel" ;
	car_N = mkN "bil" ;
	taxi_N = mkN "taxi" "taxin" "taxibilar" "taxibilarna" ;
	bus_N = mkN "buss" ;
	train_N = mkN "tåg" "tåg" ;
	airplane_N = mkN "flygplan" "flygplan" ;
	boat_N = mkN "båt" ;
	hotel_N = mkN "hotell" neutrum ;
	trip_N = mkN "resa" ;
	field7trip_N = mkN "utflykt" "utflykter" ;
	ticket_N = mkN "biljett" "biljetter" ;
	bag_N = mkN "väska" ;
	city_N = mkN "stad" "städer" ;
	country_N = mkN "land" "landet" "länder" "länderna" ;
	material_N = mkN "material" "materialet" "material" "materialen" ;
	metal_N = mkN "metall" "metaller" ;
	animal_N = mkN "djur" "djur" ;
	bird_N = mkN "fågel" ;
	fish_N = mkN "fisk" ;
	bug_N = mkN "insekt" "insekter" ;
	tree_N = mkN "träd" "träd" ;
	flower_N = mkN "blomma" ;
	seed_N = mkN "frö" "fröet" "frön" "fröna" ;
	forest_N = mkN "skog" ;
	lake_N = mkN "sjö" ;
	island_N = mkN "ö" ;
	ice_N = mkN "is" ;
	water_N = mkN "vatten" "vattnet" "vatten" "vattnen" ;
	fire_N = mkN "eld" ;
	mountain_N = mkN "berg" "berg" ;
	ground_N = mkN "mark" "marker" ;
	sky_N = mkN "himmel" ;
	sun_N = mkN "sol" ;
	star_N = mkN "stjärna" ;
	person_N = mkN "person" "personer" ;
	family_N = mkN "familj" "familjer" ;
	dad_N = mkN "pappa" ;
	mom_N = mkN "mamma" ;
	brother_N = mkN "bror" "brodern" "bröder" "bröderna" ;
	sister_N = mkN "syster" ;
	relative_N = mkN "släkting" ;
	man_N = mkN "man" "mannen" "män" "männen" ;
	woman_N = mkN "kvinna" ;
	girl_N = mkN "flicka" ;
	boy_N = mkN "pojke" "pojkar" ;
	child_N = mkN "barn" "barn" ;
	teenager_N = mkN "tonåring" ;
	adult_N = mkN "vuxen" "vuxna" "vuxna" "vuxna" ;
	group_N = mkN "grupp" "grupper" ;
	friend_N = mkN "vän" "vännen" "vänner" "vännerna" ;
	guest_N = mkN "gäst" "gäster" ;
	boss_N = mkN "chef" "chefer" ;
	teacher_N = mkN "lärare" "lärare" ;
	assistant_N = mkN "assistent" "assistenter" ;
	therapist_N = mkN "terapeut" "terapeuter" ;
	doctor_N = mkN "läkare" "läkare" ;
	nurse_N = mkN "sköterska" ;
	police_N = mkN "polis" "poliser" ;	
	afternoon_N = mkN "eftermiddag" ;
	apartment_N = mkN "lägenhet" "lägenheter" ;
	autumn_N = mkN "höst" ;
	ball_N = mkN "boll" ;
	bank_N = mkN "bank" "banker" ;
	battery_N = mkN "batteri" "batteriet" "batterier" "batterierna" ;
	birthday_N = mkN "födelsedag" ;
	blissymbol_N = mkN "blissymbol" "blissymboler" ;
	book_N = mkN "bok" "böcker" ;
	bottle_N = mkN "flaska" ;
	bread_N = mkN "bröd" neutrum ;
	camera_N = mkN "kamera" ;
	chair_N = mkN "stol" ;
	cheese_N = mkN "ost" ;
	chest7of7drawers_N = mkN "byrå" ;
	Christmas_N = mkN "jul" ;
	day_N = mkN "dag" ;
	drink_N = mkN "dryck" "drycker" ;
	easter_N = mkN "påsk" ;
	lamp_N = mkN "lampa" ;
	evening_N = mkN "kväll" ;
	fruit_N = mkN "frukt" "frukter" ;
	future_N = mkN "framtid" "framtider" ;
	garden_N = mkN "trädgård" ;
	glass_N = mkN "glas" "glas";
	hobby_N = mkN "hobby" "hobbyer";
	holiday_N = mkN "helgdag" ;
	ice7cream_N = mkN "glass" ;
	key_N = mkN "nyckel" ;
	kitchen_N = mkN "kök" "kök" ;
	minute_N = mkN "minut" "minuter" ;
	month_N = mkN "månad" "månader" ;
	museum_N = mkN "museum" "museet" "museer" "museerna" ;
	night_N = mkN "natt" "nätter" ;
	parcel_N = mkN "paket" "paket" ;
	pie_N = mkN "paj" "pajer" ;
	pizza_N = mkN "pizza" ;
	problem_N = mkN "problem" "problem" ;
	rain_N = mkN "regn" "regn" ;
	room_N = mkN "rum" "rummet" "rum" "rummen" ;
	salad_N = mkN "sallad" "sallader" ;
	sausage_N = mkN "korv" ;
	school_N = mkN "skola" ;
	scissors_N = mkN "sax" ;
	secret_N = mkN "hemlighet" "hemligheter" ;
	shelf_N = mkN "hylla" ;
	spoon_N = mkN "sked" ;
	spread_N = mkN "pålägg" neutrum ;
	spring_N = mkN "vår" ;
	stairs_N = mkN "trappa" ;
	straw_N = mkN "sugrör" neutrum ;
	summer_N = mkN "sommar" "sommaren" "somrar" "somrarna" ;
	table_N = mkN "bord" "bord" ;
	tape7recorder_N = mkN "bandspelare" "bandspelare" ;
	tea_N = mkN "te" "teet" "teer" "teerna" ;
	telephone_N = mkN "telefon" "telefoner" ;
	time_N = mkN "tid" "tider" ;
	toilet_N = mkN "toalett" "toaletter" ;
	toy_N = mkN "leksak" "leksaker" ;
	vegetable_N = mkN "grönsak" "grönsaker" ;
	video7recorder_N = mkN "video" "videor" ;
	weather_N = mkN "väder" "väder" ;
	week_N = mkN "vecka" ;
	window_N = mkN "fönster" "fönster" ;
	winter_N = mkN "vinter" ;
	word_N = mkN "ord" neutrum ;
	year_N = mkN "år" "år" ;
	sport_N = mkN "sport" "sporter" ;
	mirror_N = mkN "spegel" ;
	hamburger_N = mkN "hamburgare" "hamburgare" ;
	pasta_N = mkN "pasta" ;
	sandwich_N = mkN "smörgås" ;
	workplace_N = mkN "arbetsplats" "arbetsplatser" ;
	computer_N = mkN "dator" "datorer" ;
	shellfish_N = mkN "skaldjur" "skaldjur" ;
	baby_N = mkN "bebis" ;
	shirt_N =  mkN "blus" | mkN "skjorta" | mkN "tröja" ;
	glove_N =  mkN "handske" "handskar" | mkN "vante" "vantar" ;
	hat_N =  mkN "hatt" | mkN "mössa" ;
	coat_N =  mkN "ytterkläder" | mkN "jacka" | mkN "kappa" | mkN "rock" ; --ytterkläder funkar inte
	vehicle_N =  mkN "fordon" neutrum | mkN "vagn" ;
	grandfather_N =  mkN "farfar" "farfadern" "farfäder" "farfäderna" | mkN "morfar" "morfadern" "morfäder" "morfäderna" ;
	grandmother_N =  mkN "farmor" "farmodern" "farmödrar" "farmödrarna" | mkN "mormor" "mormodern" "mormödrar" "mormödrarna" ;
	uncle_N =  mkN "farbror" "farbrodern" "farbröder" "farbröderna" | mkN "morbror" "morbrodern" "morbröder" "morbröderna" ;
	aunt_N =  mkN "faster" | mkN "moster" ;
	dessert_N =  mkN "efterrätt" "efterrätter" | mkN "dessert" "desserter" ;
	roll_N =  mkN "bulle" "bullar" | mkN "småfranska" ;
	cookie_N =  mkN "kaka" | mkN "kex" neutrum ;
	sauce_N =  mkN "sås" "såser" | mkN "dressing" ;
	jam_N =  mkN "marmelad" "marmelader" | mkN "sylt" "sylter" ;
	soup_N =  mkN "soppa" | mkN "buljong" "buljonger" ;
	flavouring_N =  mkN "krydda" | mkN "smaktillsats" "smaktillsatser" ;
	dish_N =  mkN "tallrik" | mkN "fat" "fat" ;
	knife_N =  mkN "kniv" | mkN "svärd" neutrum ;
	thing_N =  mkN "sak" "saker" | mkN "föremål" neutrum ;
	paper_N =  mkN "papper" "papperet" "papper" "papperen" | mkN "sida" ;
	magazine_N =  mkN "tidning" | mkN "tidskrift" "tidskrifter" ;
	calendar_N =  mkN "almanacka" | mkN "kalender" ;
	container_N =  mkN "behållare" "behållare" | mkN "skål" ;
	tool_N =  mkN "verktyg" "verktyg" | mkN "redskap" "redskap" ;
	machine_N =  mkN "maskin" "maskiner" | mkN "apparat" "apparater" | mkN "motor" "motorer";
	place_N =  mkN "plats" "platser" | mkN "ställe" ;
	house_N =  mkN "hus" "hus" | mkN "byggnad" "byggnader" ;
	residential_institution_N =  mkN "gruppbostad" | mkN "elevhem" | mkN "internat" ;
	street_N =  mkN "gata" | mkN "väg" ;
	hospital_N =  mkN "sjukhus" | mkN "vårdcentral" ;
	store_N =  mkN "affär" | mkN " butik" ;
	restaurant_N =  mkN "restaurang" | mkN "matställe" ;
	party_N =  mkN "fest" "fester" | mkN "kalas" neutrum ;
	farm_N =  mkN "bondgård" | mkN "lantbruk" neutrum ;
	countryside_N =  mkN "landsbygd" "landsbygder" | mkN "land" neutrum ;
	idea_N =  mkN "idé" "idéer" | mkN "tanke" "tankar" ;
	gathering_N =  mkN "samling" | mkN "möte" ;
	club_N =  mkN "förening" | mkN "klubb" ;
	gift_N =  mkN "present" "presenter" | mkN "gåva" ;
	play_N =  mkN "lek" | mkN "spel" neutrum ;
	picture_N =  mkN "bild" "bilder" | mkN "tavla" ;
	race_N =  mkN "tävling" | mkN "match" "matcher" ;
	bed_N =  mkN "säng" | mkN "bädd" ;
	cupboard_N =  mkN "skåp" neutrum | mkN "garderob" "garderober" ;
	stove_N =  mkN "spis" | mkN "ugn" ;
	needle_N =  mkN "nål" | mkN "synål" ;
	strap_N =  mkN "snöre" | mkN "tråd" ;
	vacation_N =  mkN "ledighet" "ledigheter" | mkN "lov" neutrum | mkN "semester" ;
	wind_N =  mkN "vind" | mkN "blåst" "blåster" ;
	rest_period_N =  mkN "rast" "raster" | mkN "paus" "pauser" ;
	egg_N =  mkN "ägg" neutrum ;
	soda_N =  mkN "läsk" "läsker" | mkN "läskedryck" "läskedrycker" ; --böjs läsk i plural?
	alcoholic_drink_N =  mkN "alkoholdryck" "alkoholdrycker" ;
	CD_N =  mkN "cd" "cd:n" "cd:ar" "cd:arna" | mkN "CD-skiva" ;
	cassette_N =  mkN "kassett" "kassetter" | mkN "kassettband" neutrum ;
	activity_centre_N =  mkN "fritids" neutrum ;
	day_centre_N =  mkN "dagcenter" neutrum ;
	post_N =  mkN "post" "posten" "post" "posten" ; -- böjs post i plural?
	Internet_N =  mkN "Internet" "Internet" ; --böjs i plural?
	past_N =  mkN "dåtid" "dåtider" ;
	weekend_N =  mkN "veckoslut" neutrum ;
	back_N = mkN "rygg" ;
	dress_N = mkN "klänning" ;
	movie_theatre_N = mkN "bio" "bion" "biografer" "biograferna" ;
	neck_N = mkN "nacke" "nackar" ;
	skirt_N = mkN "kjol" ;
	snake_N = mkN "orm" ;
	worm_N = mkN "mask" ;
	theatre_N = mkN "teater" ;
	blanket_N =  mkN "filt" | mkN "pläd" | mkN "täcke" ;
	environment_N =  mkN "miljö" "miljöer" | mkN "omvärld" | mkN "natur" "naturer" ; --böjs natur i plural? 
	hour_N =  mkN "timme" "timmar" ;
	home_N =  mkN "hem" "hemmet" "hem" "hemmen" | mkN "bostad" "bostäder" ;
	morning_N = mkN "morgon" "morgnar" | mkN "förmiddag" ;

	--Mass nouns (only used in their singular form)
	milk_N = mkN "mjölk" ;
	coffee_N = mkN "kaffe" ;
	meat_N = mkN "kött" ;
	snow_N = mkN "snö" ;
	salt_N = mkN "salt" ;
	food_N =  mkN "mat" | mkN "livsmedel" neutrum ;
	candy_N = mkN "godis" ;
	fruit_juice_N =  mkN "juice" | mkN "saft" ;
	sugar_N =  mkN "socker" | mkN "sötningsmedel" neutrum ;
	yogurt_N =  mkN "fil" | mkN "yoghurt" ; 
	gymnastics_N = mkN "gymnastik" ;
	television_N = mkN "tv" "tv:n" "tv-apparater" "tv-apparaterna" ;
	radio_N = mkN "radio" "radion" "radioapparater" "radioapparaterna" ;
	music_N = mkN "musik" ;
	clothing_N = mkN "klädesplagg" "kläder" ;
	glasses_N = mkN "glasögon" ;
	money_N = mkN "pengar" ;
	underwear_N = mkN "underkläder" ;
	pants_N =  mkN "byxor" | mkN "jeans" "jeans" ;
	letter_N =  mkN "brev" neutrum | mkN "post" ; --post mass noun
	email_N =  mkN "e-post" | mkN "e-brev" neutrum | mkN " mejl" neutrum ; --epost mass noun
	plastic_N = mkN "plast" ;
	electricity_N = mkN "elektricitet" ;
	air_N = mkN "luft" ;

	--Added nouns outside the standard bliss chart to complement the vocabulary
	discussion_N = mkN "samtal" neutrum ;
	lunch_N = mkN "lunch" ;
	cook_N = mkN "kock" ;
	Swedish_N = mkN "svenska" ;
	address_N = mkN "adress" ;
	information_N = mkN "information" ;
	student_N = mkN "student" | mkN "elev" ;
	discount_N = mkN "rabatt" ;
	wallet_N = mkN "plånbok" | mkN "portmonnä" ;
	dinner_N = mkN "middag" ;


--PERSONAL NOUNS

	God_PN = mkPN "Gud" ;
	Anna_PN = mkPN "Anna" ;
	Maria_PN = mkPN "Maria" ;
	Sara_PN = mkPN "Sara" ;
	Johan_PN = mkPN "Johan" ;
	Peter_PN = mkPN "Peter" ;
	David_PN = mkPN "David" ;
	Stockholm_PN = mkPN "Stockholm" ;
	Malmo_PN = mkPN "Malmö" ;
	Goteborg_PN = mkPN "Göteborg" ;
	Sweden_PN = mkPN "Sverige" ;


--VERBS
--Only three usual tenses is implemented this far (go, went, gone)
--Transitive verbs are called with its intransitive version as argument
--This far, mkV is used for every verb

  	walk_V = mkV "gå" "gick" "gått" ;
  	stand_V = mkV "stå" "stod" "stått" ;
	sit_V = mkV "sitta" "satt" "suttit" ;
	lie_V = mkV "ligga" "låg" "legat" ;
	sleep_V = mkV "sova" "sov" "sovit" ;
	cry_V = mkV "gråta" "grät" "gråtit" ;
	shower_V = mkV "duschar" ;
	eat_V = mkV "äta" "åt" "ätit" ;
	eat_V2 = mkV2 eat_V ;
	drink_V = mkV "dricka" "drack" "druckit" ;
	drink_V2 = mkV2 drink_V ;
	love_V2 = mkV2 "älskar" ;
	tease_V2 = mkV2 "retar" ;
	borrow_V2 = mkV2 "lånar" ;
	close_V = mkV "stänger" ;
	count_V = mkV "räknar" ;
	dance_V = mkV "dansar" ;
	do_V2 = mkV2 (mkV "göra" "gjorde" "gjort") ;
	exchange_V2 = mkV2 "byter" ;
	feel_V2 = mkV2 (mkV "känna" "kände" "känt") ;
	forget_V = mkV "glömmer" ;
	give_V3 = mkV3 (mkV "ge" "gav" "gett") ;
	guess_VS = mkVS (mkV "gissar") ;
	live_V = mkV "bor" ;
	need_V2 = mkV2 "behöver" ;
	promise_V = mkV "lovar" ;
	read_V = mkV "läser" ;
	ride_V = mkV "åker" ;
	ride_V2 = mkV2 ride_V ;
	sing_V = mkV "sjunga" "sjöng" "sjungit" ;
	swim_V = mkV "simmar" ;
	move_V = mkV "köra" "körde" "kört" ;
	taste_V = mkV "smakar" ;
	understand_V = mkV "förstå" "förstod" "förstått" ;
	wait_V = mkV "väntar" ;
	wish_VS = mkVS (mkV "önskar") ;
	write_V = mkV "skriva" "skrev" "skrivit" ;
	write_V2 = mkV2 write_V ;
	nag_V = mkV "tjatar" ;
	ride_horse_V = mkV "rida" "red" "ridit" ;
	cost_V = mkV "kostar" ;
	be_named_V2 = mkV2 (mkV "heta" "hette" "hetat") ;
	begin_V =  mkV "börjar" | mkV "startar" ;
	try_V =  mkV "försöker" | mkV "prövar" ;
	say_V =  mkV "säga" "sade" "sagt" | mkV "talar" | mkV "pratar" ;
	say_V2 =  mkV2 say_V ;
	see_V =  mkV "se" "såg" "sett" | mkV "tittar" ;
	see_V2 =  mkV2 see_V ;
	hear_V =  mkV "höra" "hörde" "hört" | mkV "lyssnar" ;
	wash_V =  mkV "badar" | mkV "tvättar" ;
	work_V =  mkV "arbetar" | mkV "jobbar" ;
	bake_V2 =  mkV2 "bakar" | mkV2 "gräddar" | mkV2 "steker" ;
	buy_V2 =  mkV2 "köper" | mkV2 "handlar" ;
	meet_V2 =  mkV2 "möter" | mkV2 "träffar" ;
	help_V2 =  mkV2 "hjälper" | mkV2 (mkV "stödja" "stödde" "stött") ;
	keep_V2 =  mkV2 (mkV "behålla" "behöll" "behållit") | mkV2 "sparar" ;
	find_V2 =  mkV2 "hittar" | mkV2 "upptäcker" ;
	put_V =  mkV "lägga" "lade" "lagt" | mkV "ställer" | mkV "sätta" "satte" "satt" ;
	call_V =  mkV "ringer" ;
	call_V2 =  mkV2 call_V ;
	become_V2 = mkV2 (mkV "bli" "blev" "blivit") ;
	play_V = mkV "leker" ;
	draw_V =  mkV "ritar" | mkV "tecknar" ;
	paint_V =  mkV "målar" | mkV "färgar" ;
	fall_V =  mkV "falla" "föll" "fallit" | mkV "ramlar" | mkV "tappar" ;
	think_VS =  mkVS (mkV "tänker") | mkV "tycker" | mkV "tror" ;
	turn_V = mkV "vänder" | mkV "svänger" ;
	decide_VS = mkVS (mkV "bestämmer") | mkV "beslutar" ;
	know_VS = mkVS (mkV "veta" "vet" "vet" "visste" "vetat" "visst") ;
	marry_V = reflV (mkV "gifta" "gifte" "gift") ;
	like_V2 = mkV2 (mk2V "tycka" "tyckte") (mkPrep "om") ;
	come_V =  mkV "komma" "kom" "kommit" | reflV (mkV "närmar") ; 
	stop_VS =  mkVS (mkV "slutar") | mkV "stoppar" | mkV (mkV "kommer" "kom" "kommit") "fram" ; --partikelverb?
	fight_V = mkV "slåss" "slåss" "slåss" "slogs" "slagits" "slagen" ;
	continue_V =  mkV "fortsätta" "fortsatte" "fortsatt" | mkV "passerar" ;
	have_V2 = mkV2 (mkV "ha" "har" "ha" "hade" "haft" "havd") ; 
	be_V =  mkV "vara" "är" "var" "var" "varit" "varande" | mkV "finnas" "finns" "finns" "fanns" "funnits" "funnen" ; --imperativ?
	get_V2 =  mkV2 (mkV "få" "fick" "fått") ; -- | mkV2 (mkV "ta" "tar" "ta" "tog" "tagit" "tagen") "emot" ; 
	take_away_V2 = mkV2 (mkV "ta" "tar" "ta" "tog" "tagit" "tagen") (mkPrep "bort") ; 
	dress_V =  mkV (mkV "klä") "på" | reflV (mkV (mkV "ha" "har" "ha" "hade" "haft" "havd") "på") ; 
	can_VV = G.can_VV ;
	want_VV = G.want_VV ;
	must_VV = G.must_VV ;

	--Added verbs outside the standard bliss chart to complement the vocabulary
	mean_V = mkV "betyda" ;
	rain_V = mkV "regna" ;
	steal_V2 = mkV2 (mkV "stjäla" "stjäl" "stjäl" "stal" "stulit" "stulen") ;
	search_V = mkV "leta" | mkV "söka" ;
	lose_V = mkV "tappa" | mkV "förlora" | mkV "tappa bort" ;
	repeat_V = mkV "upprepa" ;
	meet_V = mkV "träffas" | mkV "ses" ;
	feel_V = mkV "må" ;


--ADJECTIVE-ADVERBS

	salty_AA = {adj = mkA "salt" "salt" ; adv = mkAdv "salt"} ;
	afraid_AA = {adj = mkA "rädd" ; adv = mkAdv "rädd"} ; 
	bad_AA = {adj = mkA "dålig" "sämre" "sämst" ; adv = mkAdv "dåligt"} ;
	big_AA = {adj = mkA "stor" "större" "störst" ; adv = mkAdv "stort"} ;
	dangerous_AA = {adj = mkA "farlig" ; adv = mkAdv "farligt"} ;
	dead_AA = {adj = mkA "död" ; adv = mkAdv "dött"} ; 
	difficult_AA = {adj = mkA "svår" ; adv = mkAdv "svårt"} ;
	early_AA = {adj = mkA "tidig" ; adv = mkAdv "tidigt"} ;
	full_AA = {adj = mkA "full" ; adv = mkAdv "fullt"} ;
	funny_AA = {adj = mkA "rolig" ; adv = mkAdv "roligt"} ;
	heavy_AA = {adj = mkA "tung" "tyngre" "tyngst" ; adv = mkAdv "tungt"} ;
	high_AA = {adj = mkA "hög" "högre" "högst" ; adv = mkAdv "högt"} ;
	hungry_AA = {adj = mkA "hungrig" ; adv = mkAdv "hungrigt"} ;
	important_AA = {adj = mkA "viktig" ; adv = mkAdv "viktigt"} ;
	left_AA = {adj = mkA "vänster" ; adv = mkAdv "vänster"} ; 
	light_AA = {adj = mkA "ljus" ; adv = mkAdv "ljust"} ;	
	linear_AA = {adj = mkA "rak" ; adv = mkAdv "rakt"} ;
	little_AA = {adj = mkA "liten" "litet" "små" "mindre" "minst" ; adv = mkAdv "litet"} ;
	lonely_AA = {adj = mkA "ensam" "ensamt" "ensamma" "ensammare" "ensammast" ; adv = mkAdv "ensamt"} ; 
	long_AA = {adj = mkA "lång" "längre" "längst" ; adv = mkAdv "långt"} ;
	new_AA = {adj = mkA "ny" "nytt" ; adv = mkAdv "ny"} ;
	next_AA = {adj = mkA "nästa" ; adv = mkAdv "nästa"} ; 
	nice_AA = {adj = mkA "trevlig" ; adv = mkAdv "trevligt"} ;
	old_AA = {adj = mkA "gammal" "gammalt" "gamla" "äldre" "äldst" ; adv = mkAdv "gammalt"} ;
	open_AA = {adj = mkA "öppen" "öppet" ; adv = mkAdv "öppet"} ;
	right_AA = {adj = mkA "höger" ; adv = mkAdv "höger"} ; 
	sick_AA = {adj = mkA "sjuk" ; adv = mkAdv "sjukt"} ;
	soft_AA = {adj = mkA "mjuk" ; adv = mkAdv "mjukt"} ;
	strong_AA = {adj = mkA "stark" ; adv = mkAdv "starkt"} ;
	suddenly_AA = {adj = mkA "plötslig" ; adv = mkAdv "plötsligt"} ;  
	thirsty_AA = {adj = mkA "törstig" ; adv = mkAdv "törstigt"} ;
	tired_AA = {adj = mkA "trött" ; adv = mkAdv "trött"} ;
	upset_AA = {adj = compoundA (mkA "upprörd") ; adv = mkAdv "upprört"} ; 
	wet_AA = {adj = mkA "våt" ; adv = mkAdv "våt"} ;	
	expensive_AA = {adj = mkA "dyr" ; adv = mkAdv "dyrt"} ;
--	last_AA = {adj = mkA "sist" "sist" "sista" "XXX" "XXX" ; adv = mkAdv "sist"} ; --comparison?
	-- last_AA = {adj = mkA "sist" "sist" "sista" (variants{}) (variants{}) ; adv = mkAdv "sist"} ; --should work with (variants{}) but doesn't
	troublesome_AA = {adj = mkA "besvärlig" ; adv = mkAdv "besvärligt"} ; 
	boring_AA = {adj = mkA "tråkig" ; adv = mkAdv "tråkigt"} ;
	good_AA = {adj = mkA "bra" "bra" "bra" "bättre" "bäst" ; adv = mkAdv "bra"} ;
	intimate_AA = {adj = mkA "förtrolig" | mkA "intim" | mkA "nära" "nära" "nära" "närmare" "närmast" ; adv = mkAdv "förtroligt" | mkAdv "intimt" | mkAdv "nära"} ;
	happy_AA = {adj = mkA "glad" | mkA "lycklig" ; adv = mkAdv "glatt" | mkAdv "lyckligt"} ;
	sad_AA = {adj = mkA "ledsen" "ledset" | mkA "olycklig" ; adv = mkAdv "ledset" | mkAdv "olyckligt"} ;
	anxious_AA = {adj = mkA "nervös" | mkA "orolig" ; adv = mkAdv "nervöst" | mkAdv "oroligt"} ;
	delicious_AA = {adj = mkA "jättegod" | mkA "läcker" ; adv = mkAdv "jättegott" | mkAdv "läckert"} ;
	beautiful_AA = {adj = mkA "vacker" | mkA "snygg" | mkA "söt" ; adv = mkAdv "vackert" | mkAdv "snyggt" | mkAdv "sött"} ;
	uncomfortable_AA = {adj = mkA "obehaglig" | mkA "obekväm" ; adv = mkAdv "obehagligt" | mkAdv "obekvämt"} ;
	comfortable_AA = {adj = mkA "behaglig" | mkA "bekväm" | mkA "skön" ; adv = mkAdv "behagligt" | mkAdv "bekvämt" | mkAdv "skönt"} ;
	angry_AA = {adj = mkA "arg" | mkA "ilsken" "ilsket" ; adv = mkAdv "argt" | mkAdv "ilsket"} ;
	mean_AA = {adj = mkA "elak" | mkA "ond" ; adv = mkAdv "elakt" | mkAdv "ont"} ;
	strange_AA = {adj = mkA "konstig" | mkA "okänd" ; adv = mkAdv "konstigt" | mkAdv "okänt"} ;
	safe_AA = {adj = mkA "säker" | mkA "trygg" ; adv = mkAdv "säkert" | mkAdv "tryggt"} ;
	uncertain_AA = {adj = mkA "osäker" | mkA " obestämd" "obestämt" ; adv = mkAdv "osäkert" | mkAdv " obestämt"} ;
	certain_AA = {adj = mkA "säker" | compoundA(mkA "bestämd" "bestämt") | mkA "tillförlitlig" ; adv = mkAdv "säkert" | mkAdv " bestämt" | mkAdv " tillförlitligt"} ;
	careful_AA = {adj = mkA "försiktig" | mkA "noggrann" ; adv = mkAdv "försiktigt" | mkAdv "noggrannt"} ;
	dirty_AA = {adj = mkA "smutsig" | mkA "fläckig" ; adv = mkAdv "smutsigt" | mkAdv "fläckigt"} ;
	disgusting_AA = {adj = mkA "äcklig" | mkA "osmaklig" ; adv = mkAdv "äckligt" | mkAdv "osmakligt"} ;
	hot_AA = {adj = mkA "varm" | mkA "het" ; adv = mkAdv "varmt" | mkAdv "hett"} ;
	fat_AA = {adj = mkA "tjock" | mkA "fet" ; adv = mkAdv "tjockt" | mkAdv "fett"} ;
	square_AA = {adj = compoundA(mkA "kvadratisk") | mkA "fyrkantig" ; adv = mkAdv "kvadratiskt" | mkAdv "fyrkantigt"} ;
	quick_AA = {adj = mkA "snabb" ; adv = mkAdv "fort" | mkAdv "snabbt"} ;
	quiet_AA = {adj = mkA "tyst" "tyst" | mkA "ljudlös" ; adv = mkAdv "tyst" | mkAdv "ljudlöst"} ;
	silent_AA = {adj = mkA "tyst" "tyst" | mkA "låg" "lägre" "lägst" | mkA "lågmäld" "lågmält" ; adv = mkAdv "tyst" | mkAdv "lågt" | mkAdv "lågmält"} ;
	in_love_AA = {adj = mkA "kär" | compoundA(mkA "förälskad" "förälskat" "förälskade" "mer förälskad" "mest förälskad") ; adv = mkAdv " förälskat"} ; 
	frustrated_AA = {adj = mkA "besviken" "besviket" | compoundA(mkA "missräknad" "missräknat" "missräknade" "mer missräknad" "mest missräknad") ; adv = mkAdv "besviket" | mkAdv "missräknat"} ; 
	painful_AA = {adj = mkA "smärtsam" "smärtsamt" "smärtsamma" "smärtsammare" "smärtsammast" ; adv = mkAdv "ont" | mkAdv "smärtsamt"} ;
	smart_AA = {adj = mkA "klok" | compoundA(mkA "begåvad" "begåvat" "begåvade" "mer begåvad" "mest begåvad") | mkA "förståndig" ; adv = mkAdv "klokt" | mkAdv "begåvat" | mkAdv "förståndigt"} ; 
	interesting_AA = {adj = mkA "intressant" "intressant" | mkA "intresserad" "intresserat" "intresserade" "mer intresserad" "mest intresserad" ; adv = mkAdv "intressant" | mkAdv "intresserat"} ; 
	stupid_AA = {adj = mkA "dum" "dumt" "dumma" "dummare" "dummast" | mkA "obegåvad" "obegåvat" "obegåvade" "mer obegåvad" "mest obegåvad" ; adv = mkAdv "dumt" | mkAdv "obegåvat"} ; 
	incorrect_AA = {adj = compoundA(mkA "fel" "fel" "fel" "mer fel" "mest fel") | mkA "oriktig" ; adv = mkAdv "fel" | mkAdv "oriktigt"} ;
	different_AA = {adj = compoundA (mkA "olik") | compoundA (mkA "annorlunda" "annorlunda" "annorlunda" "mer annorlunda" "mest annorlunda") ; adv = mkAdv "olikt" | mkAdv "annorlunda"} ; 
	tasty_AA = {adj = mkA "god" | mkA "smaklig" | compoundA (mkA "välsmakande" "välsmakande" "välsmakande" "mer välsmakande" "mest välsmakande") ; adv = mkAdv "gott" | mkAdv "smakligt" | mkAdv "välsmakande"} ; 
	broken_AA = {adj = mkA "trasig" | mkA "sönder" "sönder" "sönder" "mer sönder" "mest sönder" | mkA "avbruten" "avbrutet" ; adv = mkAdv "trasigt" | mkAdv "sönder" | mkAdv "avbrutet"} ; 
	round_AA = {adj = mkA "cirkelformad" "cirkelformat" "cirkelformade" "mer cirkelformad" "mest cirkelformad" | mkA "rund" ; adv = mkAdv "cirkelformat" | mkAdv "runt"} ; 
	finished_AA = {adj = mkA "färdig" | mkA " klar" | mkA " avslutad" "avslutat" "avslutade" "mer avslutad" "mest avslutad" ; adv = mkAdv "färdigt" | mkAdv "klart"} ; 

	--Added adjectives outside the standard bliss chart to complement the vocabulary
	cheap_AA = {adj = mkA "billig" ; adv = mkAdv "billig"} ;
	slow_AA = {adj = mkA "långsam" "långsamt" "långsamma" "långsammare" "långsammast" ; adv = mkAdv "långsamt"} ;



--DETERMINERS

	nobody_NP = S.nobody_NP ;
	somebody_NP = S.somebody_NP ;
	that_Quant = S.that_Quant ;
	this_Quant = S.this_Quant ;
	no_Quant = S.no_Quant ;
	all_Predet = S.all_Predet ;
	not_Predet = S.not_Predet ;
	someSg_Det = S.someSg_Det ;
	much_Det = S.many_Det | S.much_Det ; -- | S.how8much_IAdv | S.how8many_IAdv ;


--INTERROGATIVES

	when_IAdv = S.when_IAdv ;
	where_IAdv = S.where_IAdv ;
	how_IAdv = S.how_IAdv ;
	why_IAdv = S.why_IAdv ;

	who_IP = S.whoSg_IP ;
	what_IP = S.whatSg_IP ;

	which_IQuant = S.which_IQuant ;

--UTTERANCES

	yes_Utt = S.yes_Utt ;
	no_Utt = S.no_Utt ;
	hour_Utt = {s = "klockan"} ;


--INTERJECTIONS

	welcome_Interj = {s = "välkommen"} ;
	hello_Interj = {s = "hej"} ;
	bye_Interj = {s = "hejdå"} ;
	sorry_Interj = {s = "förlåt"} ;
	thanks_Interj = {s = "tack"} ;

--ADJECTIVES
--COLORS

	red_A = L.red_A ;
	blue_A = L.blue_A ;
	yellow_A = L.yellow_A ;
	green_A = L.green_A ;
	pink_A = mkA "rosa" "rosa" "rosa" "rosare" "rosast" ;
	brown_A = L.brown_A ;
	grey_A = mkA "grå" "grått";
	white_A = L.white_A ;
	black_A = L.black_A ;
	purple_A = mkA "lila" "lila" "lila" "lilare" "lilast" ;


--ADVERB

	now_Adv = mkAdv "nu" ;
	maybe_Adv = mkAdv "kanske" ;
	before_Adv = mkAdv "förut"  | mkAdv "då" ;
	later_Adv = mkAdv "senare" | mkAdv "sedan"  ;
	again_Adv = mkAdv "igen" ;
	self_Adv = mkAdv "själv" ;
	as_Adv = S.as_CAdv ;
	often_Adv = mkAdv "ofta" ;
	sometimes_Adv = mkAdv "ibland" ;
	soon_Adv = mkAdv "snart" ;
	always_Adv = mkAdv "alltid" ;
	tomorrow_Adv = mkAdv "imorgon" ; 
	today_Adv = mkAdv "idag" ;
	yesterday_Adv = mkAdv "igår" ;
	recent_Adv = mkAdv "nyligen" | mkAdv "nyss" ;
	only_Adv = mkAdv "bara" | mkAdv "endast" ;
	together_Adv = mkAdv "tillsammans" | mkAdv "ihop" ;

	--Added adverbs outside the standard bliss chart to complement the vocabulary
	out_Adv = mkAdv "ute" | mkAdv "utomhus" ;


--PRONOUNS

	she_Pron = S.she_Pron ;
	he_Pron = S.he_Pron ;
	itNeutr_Pron = S.it_Pron ;
 	itUtr_Pron = M.regNP "den" "dess" M.Utr M.Sg ;
	i_Pron = S.i_Pron ;
	they_Pron = S.they_Pron ;
	we_Pron = S.we_Pron ;
	youSg_Pron = S.youSg_Pron ;
	youPl_Pron = S.youPl_Pron ;


--PREPOSITIONS

	forward_Prep = mkPrep "fram" | mkPrep "framåt" ;
	to_Prep = mkPrep "till" | mkPrep "mot" ;
	between_Prep = mkPrep "mellan" ;
	with_Prep = mkPrep "med" ;
	of_Prep = mkPrep "av" ;
	for_Prep = mkPrep "för" ;
	up_Prep = mkPrep "upp" | mkPrep "uppåt"  ;
	from_Prep = mkPrep "från" ;
	on_Prep = mkPrep "på" ;

	in_Prep = mkPrep "i" | mkPrep "inne" ;
	before_Prep = mkPrep "före" | mkPrep "framför" ;
	over_Prep = mkPrep "över" | mkPrep "ovanför" ;
	out_Prep = mkPrep "ut" | mkPrep "ur" ;


-- CONJUNCTIONS
	if_Subj = S.if_Subj ;
	when_Subj = S.when_Subj ;
	and_Conj = S.and_Conj ;
}
