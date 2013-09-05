--# -path=.:alltenses

concrete PhrasesLexBliss of PhrasesLex = CatBliss ** {

flags coding = utf8 ;

oper img : Str -> Str = \f -> f + ".png";

lin

--NOUNS

	afternoon_N = {s = img "afternoon"} ;
	apartment_N = {s = img "apartment,flat,unit"} ;
	autumn_N = {s = img "autumn,fall"} ;
	ball_N = {s = img "ball"} ;
	bank_N = {s = img "bank"} ;
	battery_N = {s = img "battery"} ;
	birthday_N = {s = img "birthday"} ;
	blissymbol_N = {s = img "blissymbol"} ;
	book_N = {s = img "book"} ;
	bottle_N = {s = img "bottle,flask"} ;
	bread_N = {s = img "bread,loaf_of_bread,loaf"} ;
	camera_N = {s = img "camera"} ;
	chair_N = {s = img "chair,seat"} ;
	cheese_N = {s = img "cheese"} ;
	chest7of7drawers_N = {s = img "chest_of_drawers,bureau,dresser"} ;
	Christmas_N = {s = img "Christmas"} ;
	day_N = {s = img "day"} ;
	drink_N = {s = img "drink,beverage"} ;
	easter_N = {s = img "easter"} ;
	lamp_N = {s = img "electric_light,lamp"} ;
	evening_N = {s = img "evening"} ;
	fruit_N = {s = img "fruit"} ;
	future_N = {s = img "future"} ;
	garden_N = {s = img "garden"} ;
	glass_N = {s = img "glass,drinking_glass"} ;
	hobby_N = {s = img "hobby,pastime"} ;
	holiday_N = {s = img "holiday,festival"} ;
	ice7cream_N = {s = img "ice_cream_(cone)"} | {s = img "ice_cream,sherbet,sorbet"} ;
	key_N = {s = img "key"} ;
	kitchen_N = {s = img "kitchen"} ;
	minute_N = {s = img "minute"} ;
	month_N = {s = img "month"} ;
	museum_N = {s = img "museum"} ;
	night_N = {s = img "night"} ;
	parcel_N = {s = img "parcel,package"} ;
	pie_N = {s = img "pie,tart"} ;
	pizza_N = {s = img "pizza"} ;
	problem_N = {s = img "problem"} ;
	rain_N = {s = img "rain"} ;
	room_N = {s = img "room"} ;
	salad_N = {s = img "salad"} ;
	sausage_N = {s = img "sausage,frankfurter,hotdog,hot_dog"} ;
	school_N = {s = img "school"} ;
	scissors_N = {s = img "scissors"} ;
	secret_N = {s = img "secret"} ;
	shelf_N = {s = img "shelf"} ;
	spoon_N = {s = img "spoon"} ;
	spread_N = {s = img "spread,paste"} ;
	spring_N = {s = img "spring"} ;
	stairs_N = {s = img "stairs,steps"} ;
	straw_N = {s = img "straw,drinking_straw"} ;
	summer_N = {s = img "summer"} ;
	table_N = {s = img "table"} ;
	tape7recorder_N = {s = img "tape_recorder"} ;
	tea_N = {s = img "tea"} ;
	telephone_N = {s = img "telephone"} ;
	time_N = {s = img "time"} ;
	toilet_N = {s = img "toilet"} ;
	toy_N = {s = img "toy"} ;
	vegetable_N = {s = img "vegetable_(above_ground)"} ;
	video7recorder_N = {s = img "video_recorder"} ;
	weather_N = {s = img "weather"} ;
	week_N = {s = img "week"} ;
	window_N = {s = img "window"} ;
	winter_N = {s = img "winter_(snow)"} ;
	word_N = {s = img "word"} ;
	year_N = {s = img "year"} ;
	sport_N = {s = img "sport"} ;
	mirror_N = {s = img "mirror"} ;
	hamburger_N = {s = img "hamburger"} ;
	pasta_N = {s = img "pasta"} ;
	sandwich_N = {s = img "sandwich_(open_face)"} ;
	workplace_N = {s = img "workplace"} ;
	computer_N = {s = img "computer"} ;
	shellfish_N = {s = img "shellfish"} ;
	grandfather_N = {s = img "grandfather,granddad,grandpa"} ;
	grandmother_N = {s = img "grandmother,grandma,granny"} ;
	uncle_N = {s = img "uncle"} ;
	aunt_N = {s = img "aunt"} ;
	baby_N = {s = img "baby,infant"} ;
	shirt_N = {s = img "shirt,blouse"} ;
	glove_N = {s = img "glove(s),mitt(s),mitten(s)"} ;
	hat_N = {s = img "hat,cap,hood"} ;
	coat_N = {s = img "coat,jacket,jumper,sweater"} ;
	dessert_N = {s = img "dessert"} ;
	roll_N = {s = img "roll,bun"} ;
	cookie_N = {s = img "cookie,biscuit"} ;
	sauce_N = {s = img "sauce,gravy,relish,dressing"} ;
	jam_N = {s = img "jam,jelly,marmalade,preserves"} ;
	soup_N = {s = img "soup,broth"} ;
	flavouring_N = {s = img "flavouring,condiment,seasoning"} ;
	dish_N = {s = img "dish,plate,platter"} ;
	knife_N = {s = img "knife,sword"} ;
	thing_N = {s = img "thing,object"} ;
	paper_N = {s = img "paper,card,page"} ;
	magazine_N = {s = img "magazine,journal"} ;
	calendar_N = {s = img "calendar"} ;
	container_N = {s = img "container,bowl,holder,pouch"} ;
	tool_N = {s = img "tool,instrument"} ;
	machine_N = {s = img "machine,appliance,engine,motor"} ;
	place_N = {s = img "place,area,location,space"} ;
	house_N = {s = img "house,building,dwelling,residence"} ;
	home_N = {s = img "home"} ;
	residential_institution_N = {s = img "residential_institution,group_home,hostel,residential_home"} ;
	street_N = {s = img "street"} ;
	hospital_N = {s = img "hospital,clinic"} ;
	store_N = {s = img "store,shop"} | {s = img "store_(OLD)"} ;
	restaurant_N = {s = img "restaurant,cafeteria"} ;
	farm_N = {s = img "farm"} ;
	countryside_N = {s = img "countryside,country"} ;
	idea_N = {s = img "idea,thought"} ;
	gathering_N = {s = img "gathering,assembly,meeting,conference"} ;
	party_N = {s = img "party,festival"} | {s = img "revelry"} ;
	club_N = {s = img "club"} ;
	gift_N = {s = img "gift,offering,present"} ;
	play_N = {s = img "play_(in_combinations)"} ;
	picture_N = {s = img "picture,image,icon,painting"} ;
	race_N = {s = img "race,competition,contest"} ;
	bed_N = {s = img "bed"} ;
	cupboard_N = {s = img "cupboard,closet,wardrobe"} ;
	stove_N = {s = img "stove,furnace,heater,oven"} ;
	needle_N = {s = img "needle"} ;
	strap_N = {s = img "strap,string,velcro,rope,cord"} ;
	hour_N = {s = img "hour,o'clock"} ;
	vacation_N = {s = img "vacation,holiday"} ;
	wind_N = {s = img "wind"} ;
	rest_period_N = {s = img "rest_period,break"} ;
	egg_N = {s = img "egg_(boiled),boiled_egg"} | {s = img "egg_(fried),fried_egg"} | {s = img "egg_(poached),poached_egg"} ;
	soda_N = {s = img "soda_pop,pop,soft_drink"} ;
	alcoholic_drink_N = {s = img "alcoholic_drink,alcoholic_beverage,liquor"} ;
	CD_N = {s = img "CD,record"} ;
	cassette_N = {s = img "cassette,audiocassette,videocassette"} ;
	activity_centre_N = {s = img "activity_centre_(leisure_time),after_school_club,youth_club"} ;
	day_centre_N = {s = img "day_centre"} ;
	post_N = {s = img "letter,mail,post"} ;
	Internet_N = {s = img "internet_(1)"} | {s = img "internet_(2)"} ;
	past_N = {s = img "past"} ;
	weekend_N = {s = img "weekend_(6-7)"} | {s = img "weekend_(7-1)"} ;
	back_N = {s = img "back_(body)"} ;
	dress_N = {s = img "dress"} ;
	movie_theatre_N = {s = img "movie_theatre,cinema"} ;
	neck_N = {s = img "neck_(body)"} ;
	skirt_N = {s = img "skirt"} ;
	snake_N = {s = img "snake"} ;
	worm_N = {s = img "worm"} ;
	theatre_N = {s = img "theatre"} | {s = img "exhibition_hall,showplace"} ;
	blanket_N = {s = img "blanket,duvet,quilt"} ;
	environment_N = {s = img "environment"} ;
	adult_N = {s = img "adult,grownup"} ;
	airplane_N = {s = img "airplane,aeroplane,plane"} ;
	animal_N = {s = img "animal,beast"} ;
	arm_N = {s = img "arm"} ;
	bib_N = {s = img "bib"} ;
	bike_N = {s = img "bicycle"} ;
	bird_N = {s = img "bird"} ;
	body_N = {s = img "body,trunk"} ;
	boy_N = {s = img "boy,lad"} ;
	brother_N = {s = img "brother"} ;
	bus_N = {s = img "bus,coach"} ;
	butt_N = {s = img "buttocks,bottom,bum,rear,ass"} ;
	car_N = {s = img "car,automobile,motor_vehicle"} ;
	child_N = {s = img "child,kid,youngster"} ;
	city_N = {s = img "town,city_(small)"} ;
	watch_N = {s = img "clock,timepiece"} ;
	ear_N = {s = img "ear"} ;
	electric7wheelchair_N = {s = img "electric_wheelchair"} ;
	eye_N = {s = img "eye"} ;
	family_N = {s = img "family_(traditional)"} | {s = img "family_(cohabiting)"} | {s = img "family"} ;
	fire_N = {s = img "fire"} ;
	fish_N = {s = img "fish_(animal)"} ;
	flower_N = {s = img "flower"} ;
	foot_N = {s = img "foot"} ;
	forest_N = {s = img "forest,bush,wood,woods"} ;
	girl_N = {s = img "girl"} ;
	group_N = {s = img "group"} ;
	hair_N = {s = img "hair"} ;
	hand_N = {s = img "hand"} ;
	head_N = {s = img "head"} ;
	ice_N = {s = img "ice"} ;
	bug_N = {s = img "insect,bug"} ;
	island_N = {s = img "island"} ;
	lake_N = {s = img "lake,pond"} ;
	leg_N = {s = img "leg"} ;
	makeup_N = {s = img "makeup"} ;
	material_N = {s = img "material,raw_material,stuff"} ;
	medicine_N = {s = img "medicine,medication"} ;
	metal_N = {s = img "metal"} ;
	mouth_N = {s = img "mouth"} ;
	napkin_N = {s = img "napkin,serviette"} ;
	throat_N = {s = img "neck_(head)"} ;
	pillow_N = {s = img "pillow,cushion"} ;
	police_N = {s = img "police_officer,policeman,policewoman"} ;
	seed_N = {s = img "seed"} ;
	sister_N = {s = img "sister"} ;
	sky_N = {s = img "sky"} ;
	star_N = {s = img "star"} ;
	stomach_N = {s = img "stomach,abdomen,belly"} ;
	sun_N = {s = img "sun"} ;
	ticket_N = {s = img "ticket,pass"} ;
	train_N = {s = img "train"} ;
	tree_N = {s = img "tree"} ;
	trip_N = {s = img "trip,journey,travel,voyage"} ;
	wheelchair_N = {s = img "wheelchair"} ;
	therapist_N = {s = img "therapist"} ;
	massage_N = {s = img "massage"} ;
	helmet_N = {s = img "helmet"} ;
	jewellery_N = {s = img "jewelry,jewellery"} ;
	hug_N = {s = img "hug,squeeze,embrace"} ;
	assistant_N = {s = img "helper,aide,assistant,personal_assistant"} ;
	doctor_N = {s = img "doctor,physician"} ;
	boss_N = {s = img "boss,supervisor_(2)"} | {s = img "boss,supervisor_(1)"} | {s = img "manager,secretary"} ;
	ground_N = {s = img "earth,ground,land"} ;
	person_N = {s = img "person,human_being,individual,human"} ;
	taxi_N = {s = img "taxi,cab"} ;
	mountain_N = {s = img "mountain"} ;
	teacher_N = {s = img "teacher,instructor"} | {s = img "teacher,pedagogue,educator"} | {s = img "teacher,pedagogue,educator_(in_combinations)"} ;
	friend_N = {s = img "friend"} ;
	bag_N = {s = img "baggage,bag,luggage,suitcase"} ;
	man_N = {s = img "man,male"} ;
	relative_N = {s = img "relative,relation"} ;
	nose_N = {s = img "nose"} ;
	water_N = {s = img "water,fluid,liquid"} ;
	teenager_N = {s = img "teenager,adolescent,youth"} ;
	woman_N = {s = img "woman,female"} ;
	brush_N = {s = img "brush"} ;
	vehicle_N = {s = img "vehicle,carriage,railway_car"} ;
	field7trip_N = {s = img "outing,excursion"} ;
	hotel_N = {s = img "hotel,motel"} ;
	boat_N = {s = img "boat,ship"} ;
	dad_N = {s = img "father,dad,daddy,papa,pa,pop"} ;
	mom_N = {s = img "mother,mom,mommy,mum"} ;
	country_N = {s = img "country,state"} ;
	guest_N = {s = img "visitor,guest"} ;
	tooth_N = {s = img "teeth"} ;
	sock_N = {s = img "stocking(s),sock(s),pantyhose,tights"} ;
	nurse_N = {s = img "nurse"} ;
	shoe_N = {s = img "shoe"} ;

	--Mass nouns (only used in their singular form)

	candy_N = {s = img "candy,sweets"} ;
	gymnastics_N = {s = img "gymnastics"} ;
	television_N = {s = img "television"} ;
	radio_N = {s = img "radio_(1)"} ;
	music_N = {s = img "music"} ;
	morning_N = {s = img "morning_(before_noon)"} | {s = img "morning_(early)"} ;
	electricity_N = {s = img "electricity"} ;
	coffee_N = {s = img "coffee"} ;
	air_N = {s = img "air,atmosphere"} ;
	meat_N = {s = img "meat"} ;
	milk_N = {s = img "milk"} ;
	snow_N = {s = img "snow"} ; 
	salt_N = {s = img "salt"} ;
	food_N = {s = img "food"} ;
	fruit_juice_N = {s = img "fruit_juice,juice"} ;
	sugar_N = {s = img "sugar,sweetener"} ;
	yogurt_N = {s = img "yogurt,yoghurt"} ;
	letter_N = {s = img "letter,mail,post"} ;
	email_N = {s = img "e-mail,email"} ;
	clothing_N = {s = img "clothing,clothes,garment"} ;
	glasses_N = {s = img "glasses,eyeglasses"} ;
	money_N = {s = img "money,cash"} ;
	plastic_N = {s = img "plastic"} ;
	underwear_N = {s = img "underwear,underclothes"} ;
	pants_N = {s = img "pants,jeans,slacks,trousers"} ;

	--Added nouns outside the standard bliss chart to complement the vocabulary
	discussion_N = {s = img "discussion,conversation,debate,chat"} ;
	lunch_N = {s = img "lunch,dinner"} ;
	cook_N = {s = img "cook,chef"} ;
	Swedish_N = {s = img "Swedish_(language)"} ;
	address_N = {s = img "address"} ;
	information_N = {s = img "information"} ;
	student_N = {s = img "student,pupil"} ;
	discount_N = {s = img "discount"} ;
	wallet_N = {s = img "purse,pocketbook,wallet"} ;
	dinner_N = {s = img "supper,dinner"} ;



--PERSONAL NOUNS
	God_PN = {s = img "God"} ; --PN

	Anna_PN = {s = "Anna"} ; --PN
	Maria_PN = {s = "Maria"} ; --PN
	Sara_PN = {s = "Sara"} ; --PN
	Johan_PN = {s = "Johan"} ; --PN
	Peter_PN = {s = "Peter"} ; --PN
	David_PN = {s = "David"} ; --PN
	Stockholm_PN = {s = "Stockholm"} ; --PN
	Malmo_PN = {s = "Malmö"} ; --PN
	Goteborg_PN = {s = "Göteborg"} ; --PN
	Sweden_PN = {s = "Sverige"} ; --PN




--VERBS

	dance_V = {s = img "dance-(to)"} ;
	do_V2 = {s = img "do,act-(to)"} ;
	exchange_V2 = {s = img "exchange,substitute,trade-(to)"} ;
	feel_V2 = {s = img "feel-(to)"} ;
	forget_V = {s = img "forget-(to)"} ;
	need_V2 = {s = img "need-(to)"} ;
	want_VV = {s = img "want,desire-(to)"} ;
	be_V = {s = img "be,am,are,is,exist-(to)"} ;

	walk_V = {s = img "walk,go-(to)"} ;
	stand_V = {s = img "stand-(to)"} ;
	sit_V = {s = img "sit-(to)"} ;
	lie_V = {s = img "lie_down,lie-(to)"} ;
	sleep_V = {s = img "sleep-(to)"} ;
	cry_V = {s = img "cry,weep-(to)"} ;
	shower_V = {s = img "shower-(to)"} ;
	eat_V = {s = img "eat-(to)"} ;
	eat_V2 = {s = img "eat-(to)"} ;
	drink_V = {s = img "drink-(to)"} ;
	drink_V2 = {s = img "drink-(to)"} ;
	love_V2 = {s = img "love-(to)"} ;
	tease_V2 = {s = img "tease-(to)"} ;
	borrow_V2 = {s = img "borrow-(to)"} ;
	close_V = {s = img "close,enclose,shut-(to)"} ;
	count_V = {s = img "count-(to)"} ;
	give_V3 = {s = img "give,offer,provide-(to)"} ;
	guess_VS = {s = img "guess,estimate-(to)"} ;
	know_VS = {s = img "know-(to)"} ;
	live_V = {s = img "live,dwell,reside-(to)"} ;
	move_V = {s = img "move-(to)"} ;
	must_VV = {s = img "must,have_to,be_forced_to-(to)"} ;
	promise_V = {s = img "promise,pledge-(to)"} ;
	read_V = {s = img "read-(to)"} ;
	ride_V = {s = img "ride-(to)"} ;
	ride_V2 = {s = img "ride-(to)"} ;
	sing_V = {s = img "sing-(to)"} ;
	swim_V = {s = img "swim-(to)"} ;
	taste_V = {s = img "taste-(to)"} ;
	understand_V = {s = img "understand,see-(to)"} ;
	wait_V = {s = img "wait-(to)"} ;
	wish_VS = {s = img "wish,desire-(to)"} ;
	write_V = {s = img "write-(to)"} ;
	write_V2 = {s = img "write-(to)"} ;
	nag_V = {s = img "nag-(to)"} ;
	ride_horse_V = {s = img "ride_(horse)-(to)"} ;
	cost_V = {s = img "cost-(to)"} ;
	be_named_V2 = {s = img "be_named,be_called-(to)"} ;
	begin_V = {s = img "begin,start-(to)"} ;
	come_V = {s = img "come,approach-(to)"} ;
	continue_V = {s = img "continue,pass-(to)"} ;
	try_V = {s = img "try,attempt-(to)"} ;
	stop_VS = {s = img "stop,arrive,end-(to)"} ;
	get_V2 = {s = img "get,acquire,receive-(to)"} ;
	say_V = {s = img "say,speak,talk,tell,express-(to)"} ;
	say_V2 = {s = img "say,speak,talk,tell,express-(to)"} ;
	see_V = {s = img "see,look,watch-(to)"} ;
	see_V2 = {s = img "see,look,watch-(to)"} ;
	hear_V = {s = img "hear,listen-(to)"} ;
	wash_V = {s = img "wash,bathe,bath-(to)"} ;
	work_V = {s = img "work-(to)"} ;
	bake_V2 = {s = img "bake,cook,roast-(to)"} ;
	buy_V2 = {s = img "buy,purchase-(to)"} ;
	meet_V2 = {s = img "meet,encounter,see-(to)"} ;
	help_V2 = {s = img "help,aid,assist,serve,support-(to)"} ;
	keep_V2 = {s = img "keep,preserve,save-(to)"} ;
	find_V2 = {s = img "find-(to)"} ;
	put_V = {s = img "put,locate,place-(to)"} ;
	call_V = {s = img "call,telephone,ring-(to)"} ;
	call_V2 = {s = img "call,telephone,ring-(to)"} ;
	become_V2 = {s = img "become-(to)"} ;
	can_VV = {s = img "can,be_able-(to)"} ;
	have_V2 = {s = img "have-(to)"} ;
	like_V2 = {s = img "like-(to)"} ;
	marry_V = {s = img "marry-(to)"} ;
	play_V = {s = img "play-(to)"} ;
	take_away_V2 = {s = img "take_away,remove-(to)"} ;
	draw_V = {s = img "draw,sketch-(to)"} ;
	paint_V = {s = img "paint,dye-(to)"} ;
	fall_V = {s = img "fall-(to)"} ;
	think_VS = {s = img "think,reason-(to)"} ;
	fight_V = {s = img "fight,combat-(to)"} ;
	dress_V = {s = img "dress,wear-(to)"} ;
	turn_V = {s = img "turn-(to)"} ;
	decide_VS = {s = img "decide-(to)"} ;

	--Added verbs outside the standard bliss chart to complement the vocabulary
	mean_V = {s = img "mean,signify-(to)"} ;
	rain_V = {s = img "rain-(to)"} ;
	steal_V2 = {s = img "steal-(to)"} ;
	search_V = {s = img "search-(to)"} ;
	lose_V = {s = img "lose_(fail_to_keep)-(to)"} ;
	repeat_V = {s = img "repeat,copy,duplicate,reproduce-(to)"} ;
	meet_V = {s = img "meet,encounter,see-(to)"} | {s= img "see_you_again"} ;
	feel_V = {s = img "hurt,pain_(feel),suffer-(to)"} ;


--ADJECTIVE-ADVERBS

	afraid_AA = {s = img "afraid,frightened,scared"} ;
	bad_AA = {s = img "bad,wrong"} ;
	big_AA = {s = img "big,large"} ;
	dangerous_AA = {s = img "dangerous"} ;
	dead_AA = {s = img "dead,deceased"} ;

	salty_AA = {s = img "salty"} ;
	difficult_AA = {s = img "difficult,hard"} ;
	early_AA = {s = img "early"} ;
	full_AA = {s = img "full"} ;
	funny_AA = {s = img "funny,humorous"} ;
	heavy_AA = {s = img "heavy"} ;
	high_AA = {s = img "high,tall"} ;
	hungry_AA = {s = img "hungry"} ;
	important_AA = {s = img "important,significant"} ;
	left_AA = {s = img "left"} ;
	light_AA = {s = img "light"} ;
	linear_AA = {s = img "linear,straight"} ;
	little_AA = {s = img "little,small"} ;
	lonely_AA = {s = img "lonely,lonesome"} ;
	long_AA = {s = img "long"} ;
	new_AA = {s = img "new"} ;
	next_AA = {s = img "next"} ;
	nice_AA = {s = img "nice,pleasant"} ;
	old_AA = {s = img "old,elderly"} ;
	open_AA = {s = img "open"} ;
	right_AA = {s = img "right"} ;
	sick_AA = {s = img "sick,ill"} ;
	soft_AA = {s = img "soft"} ;
	strong_AA = {s = img "strong,powerful"} ;
	suddenly_AA = {s = img "suddenly,abrupt,sudden"} ;
	thirsty_AA = {s = img "thirsty"} ;
	tired_AA = {s = img "tired,exhausted,weary"} ;
	upset_AA = {s = img "upset"} ;
	wet_AA = {s = img "wet,damp,moist"} ;
	expensive_AA = {s = img "expensive"} ;
	troublesome_AA = {s = img "troublesome"} ;
	boring_AA = {s = img "boring,dull,depressing"} ;
	good_AA = {s = img "good,well,fine,ok,okay,all_right"} ;
	intimate_AA = {s = img "intimate,close"} ;
	different_AA = {s = img "different,other,difference"} ;
	happy_AA = {s = img "happy,glad,gladly,happily"} ;
	sad_AA = {s = img "sad,sadly,unhappily,unhappy"} ;
	anxious_AA = {s = img "anxious,anxiously"} ;
	tasty_AA = {s = img "tasty,good,appetizing"} ;
	delicious_AA = {s = img "delicious,scrumptious,yummy"} ;
	beautiful_AA = {s = img "beautiful,attractive,good-looking,handsome,pretty"} ;
	uncomfortable_AA = {s = img "uncomfortable"} ;
	comfortable_AA = {s = img "comfortable,restful"} ;
	in_love_AA = {s = img "in_love"} ;
	angry_AA = {s = img "angry,angrily,mad"} ;
	frustrated_AA = {s = img "frustrated"} ;
	mean_AA = {s = img "mean,cruel"} ;
	painful_AA = {s = img "painful,painfully,sore"} ;
	strange_AA = {s = img "strange"} ;
	incorrect_AA = {s = img "incorrect,bad,inaccurate,wrong"} ;
	smart_AA = {s = img "smart,bright,clever,intelligent"} ;
	stupid_AA = {s = img "stupid,dumb"} ;
	interesting_AA = {s = img "interesting,interested"} ;
	safe_AA = {s = img "safe,safely,secure,securely"} ;
	uncertain_AA = {s = img "uncertain,unsure"} ;
	certain_AA = {s = img "certain,sure"} ;
	careful_AA = {s = img "careful"} ;
	dirty_AA = {s = img "dirty,soiled"} ;
	broken_AA = {s = img "broken"} ;
	disgusting_AA = {s = img "disgusting_(taste)"} ;
	hot_AA = {s = img "hot_(temperature)"} ;
	fat_AA = {s = img "fat,thick"} ;
	round_AA = {s = img "round,circular"} ;
	square_AA = {s = img "square_(description)"} ;
	quick_AA = {s = img "quick,fast,quickly,rapid,rapidly"} ;
	finished_AA = {s = img "finished,complete,completed"} ;
	quiet_AA = {s = img "quiet,quietly"} ;
	silent_AA = {s = img "silent"} ;

	--Added adjectives outside the standard bliss chart to complement the vocabulary
	cheap_AA = {s = img "cheap,inexpensive"} ;
	slow_AA = {s = img "slow,slowly"} ;


--DETERMINERS

	somebody_NP = {s = img "anyone,anybody,somebody,someone"} ;
	that_Quant = {s = img "that_(there)"} ;
	
	nobody_NP = {s = img "no_one,nobody"} ;
	this_Quant = {s = img "this"} ;
	no_Quant = {s = img "none,nothing_(OLD)"} ;
	all_Predet = {s = img "all,every,everything,total,whole"} ;
	not_Predet = {s = img "not,negative,no,don't,doesn't"} ;
	someSg_Det = {s = img "anything,something"} ;	
	much_Det = {s = img "much,many,very"} | {s = img "much,many,very"} ;


--INTERROGATIVES

	when_IAdv = {s = img "when"} ;
	where_IAdv = {s = img "where"} ;
	how_IAdv = {s = img "how"} ;
	why_IAdv = {s = img "why-(question)"} ;

	who_IP = {s = img "who,whom,that-(relative)"} ;
	what_IP = {s = img "what"} ;

	which_IQuant = {s = img "which,that-(relative)"} ;


--UTTERANCES

	no_Utt = {s = img "no-(exclamatory)"} ;
	yes_Utt = {s = img "yes-(exclamatory)"} ;
	hour_Utt = {s = img "hour,o'clock"} ;


--INTERJECTIONS

	thanks_Interj = {s = img "thanks,thank_you"} ;
	welcome_Interj = {s = img "welcome"} ;
	hello_Interj = {s = img "hello,greetings"} ;
	bye_Interj = {s = img "goodbye,farewell"} ;
	sorry_Interj = {s = img "sorry"} ;


--ADJECTIVES
--COLORS

	black_A = {s = img "black_(bci)"} ;
	blue_A = {s = img "blue_(bci)"} ;
	brown_A = {s = img "brown_(bci)"} ;
	grey_A = {s = img "gray,grey"} ;
	green_A = {s = img "green_(bci)"} ;
	pink_A = {s = img "pink_(bci)"} ;
	purple_A = {s = img "purple,violet_(bci)"} ;
	red_A = {s = img "red_(bci)"} ;
	white_A = {s = img "white"} ;
	yellow_A = {s = img "yellow_(bci)"} ;


--ADVERB

	again_Adv = {s = img "again"} ;
	maybe_Adv = {s = img "maybe,perhaps"} ;
	now_Adv = {s = img "now"} ;
	always_Adv = {s = img "always,ever,forever"} ;
	often_Adv = {s = img "often,frequent,frequently"} ;
	sometimes_Adv = {s = img "sometimes"} ;
	soon_Adv = {s = img "soon"} ;
	self_Adv = {s = img "self,oneself,ego_(person)"} ;
	today_Adv = {s = img "today"} ;
	tomorrow_Adv = {s = img "tomorrow"} ;
	yesterday_Adv = {s = img "yesterday"} ;
	before_Adv = {s = img "ago,then_(past)"} ;
	later_Adv = {s = img "then,so,later"} ;
	recent_Adv = {s = img "recent,recently"} ;
	only_Adv = {s = img "alone,just,only,solitary"} ;
	together_Adv = {s = img "together,attached,appended,fastened,joined"} ;
	as_Adv = {s = img "who,that,which-(relative)"} ;

	--Added adverbs outside the standard bliss chart to complement the vocabulary
	out_Adv = {s = img "out,exterior,external,outside"} ;


--PRONOUNS

	she_Pron = {s = img "she,her,herself"} | {s = img "he,she,him,her,one"} | {s = img "her,hers"} ;
	he_Pron = {s = img "he,him,himself"} | {s = img "he,she,him,her,one"} | {s = img "his"} ;
	itNeutr_Pron = {s = img "it"} ;
	itUtr_Pron = {s = img "its"} ;
	i_Pron = {s = img "I,me,myself"} | {s = img "I,me,myself-(feminine)"} | {s = img "I,me,myself-(masculine)"} | {s = img "my,mine"} | {s = img "my,mine-(feminine)"} | {s = img "my,mine-(masculine)"} ;
	they_Pron = {s = img "they,them,themselves-(indefinite)"} | {s = img "they,them,themselves-(persons)"} | {s = img "they,them,themselves-(feminine_plural)"} | {s = img "they,them,themselves-(masculine_plural)"} | {s = img "their,theirs-(persons)"} | {s = img "their,theirs-(indefinite)"} | {s = img "their,theirs-(feminine_plural)"} | {s = img "their,theirs-(masculine_plural)"} ;
	we_Pron = {s = img "we,us,ourselves"} | {s = img "we,us,ourselves-(masculine)"} | {s = img "we,us,ourselves-(feminine)"} | {s = img "our,ours-(feminine)"} | {s = img "our,ours-(masculine)"} | {s = img "our,ours"} ;
	youSg_Pron = {s = img "you,yourself"} | {s = img "you,yourself-(feminine_singular)"} | {s = img "you,yourself-(masculine_singular)"} | {s = img "your,yours-(feminine_singular)"} | {s = img "your,yours-(masculine_singular)"} | {s = img "your,yours-(singular)"} ;
	youPl_Pron = {s = img "you,yourselves-(plural)"} | {s = img "you,yourselves-(feminine_plural)"} | {s = img "you,yourselves-(masculine_plural)"} | {s = img "your,yours-(feminine_plural)"} | {s = img "your,yours-(masculine_plural)"} | {s = img "your,yours-(plural)"} ;


--PREPOSITIONS

	between_Prep = {s = img "between"} ;
	from_Prep = {s = img "from"} ;
	with_Prep = {s = img "with"} ;
	forward_Prep = {s = img "forward"} ;
	to_Prep = {s = img "to,toward,towards"} ;
	of_Prep = {s = img "by,by_means_of,of"} ;
	for_Prep = {s = img "for_(the_purpose_of),in_order_to"} | {s = img "for_(in_exchange_for)"} ;
	up_Prep = {s = img "up,upward"} ;
	on_Prep = {s = img "on"} ;
	in_Prep = {s = img "in,inside,interior,internal"} ;
	before_Prep = {s = img "before,in_front_of,prior_to"} ;
	over_Prep = {s = img "over,above,superior"} ;
	out_Prep = {s = img "out_of,exit_(forward)"} | {s = img "out_of,exit_(downward)"} ;


-- CONJUNCTIONS
	
	when_Subj = {s = img "when"} ;
	if_Subj = {s = img "if"} ;
	and_Conj = {s = img "and,also,plus,too"} ;

}
