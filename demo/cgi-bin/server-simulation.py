#!/usr/bin/env python3

import json

def main():
    response = get_response()
    print("Content-type: application/json")
    print()
    print(json.dumps(response))


def get_response(input=None):
    """
    This returns the same static value once and again!
    """
    score = 0
    if input and 'score' in input and input['score'] >= 0:
        score = input['score'] + 1

    return {
        'success': False,
        'score': score,

        'A': {
            'grammar': "MusteEng",
            'lin': ["she", "doesn't", "break", "the", "yellow", "stones", "."],
            'tree': ("(StartUtt (UttS (UseCl (Pres) (Neg) (PredVP (UsePron (she_Pron)) " 
                     "(UseVN (break_V) (DetCN (DetQuant (DefArt) (NumPl)) " 
                     "(ModCN (UseA (yellow_A)) (UseN (stone_N)))))))))"),
            'menu': {
                "5,6" : [
                    # she doesn't break the yellow {stones} .
                    [
                        {"cost":2,"lin":"[thing]s","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN default_N))))))))"},
                        {"cost":2,"lin":"animals","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN animal_N))))))))"},
                        {"cost":2,"lin":"apples","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN apple_N))))))))"},
                        {"cost":2,"lin":"beers","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN beer_N))))))))"},
                        {"cost":2,"lin":"bikes","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN bike_N))))))))"},
                        {"cost":2,"lin":"birds","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN bird_N))))))))"},
                        {"cost":2,"lin":"boats","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN boat_N))))))))"},
                        {"cost":2,"lin":"books","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN book_N))))))))"},
                        {"cost":2,"lin":"boys","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN boy_N))))))))"},
                        {"cost":2,"lin":"cars","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN car_N))))))))"},
                        {"cost":2,"lin":"cats","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN cat_N))))))))"},
                        {"cost":2,"lin":"chairs","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN chair_N))))))))"},
                        {"cost":2,"lin":"cows","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN cow_N))))))))"},
                        {"cost":2,"lin":"dogs","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN dog_N))))))))"},
                        {"cost":2,"lin":"feet","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN foot_N))))))))"},
                        {"cost":2,"lin":"fish","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN fish_N))))))))"},
                        {"cost":2,"lin":"forests","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN forest_N))))))))"},
                        {"cost":2,"lin":"fruit","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN fruit_N))))))))"},
                        {"cost":2,"lin":"girls","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN girl_N))))))))"},
                        {"cost":2,"lin":"hairs","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN hair_N))))))))"},
                        {"cost":2,"lin":"hands","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN hand_N))))))))"},
                        {"cost":2,"lin":"hats","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN hat_N))))))))"},
                        {"cost":2,"lin":"heads","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN head_N))))))))"},
                        {"cost":2,"lin":"horses","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN horse_N))))))))"},
                        {"cost":2,"lin":"houses","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN house_N))))))))"},
                        {"cost":2,"lin":"men","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN man_N))))))))"},
                        {"cost":2,"lin":"milks","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN milk_N))))))))"},
                        {"cost":2,"lin":"persons","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN person_N))))))))"},
                        {"cost":2,"lin":"shirts","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN shirt_N))))))))"},
                        {"cost":2,"lin":"shoes","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN shoe_N))))))))"},
                        {"cost":2,"lin":"tables","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN table_N))))))))"},
                        {"cost":2,"lin":"trees","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN tree_N))))))))"},
                        {"cost":2,"lin":"waters","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN water_N))))))))"},
                        {"cost":2,"lin":"wines","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN wine_N))))))))"},
                        {"cost":2,"lin":"women","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN woman_N))))))))"},
                    ],
                ],
                "4,5" : [
                    # she doesn't break the {yellow} stones .
                    [
                        {"cost":2,"lin":"[adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA default_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"big","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA big_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"black","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA black_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"blue","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA blue_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"green","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA green_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"heavy","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA heavy_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"long","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA long_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"red","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA red_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"short","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA short_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"small","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA small_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"thick","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA thick_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"thin","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA thin_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"white","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA white_A) (UseN stone_N))))))))"},
                    ],
                    [
                        {"cost":3,"lin":"","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (UseN stone_N)))))))"},
                    ],
                ],
                "3,4" : [
                    # she doesn't break {the} yellow stones .
                    [
                        {"cost":2,"lin":"","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant IndefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"these","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant this_Quant NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"those","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant that_Quant NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                    [
                        {"cost":4,"lin":"every","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN every_Det (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "4,4" : [
                    # she doesn't break the {} yellow stones .
                    [
                        {"cost":2,"lin":"so","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (AdAP so_AdA (UseA yellow_A)) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"too","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (AdAP too_AdA (UseA yellow_A)) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"very","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (AdAP very_AdA (UseA yellow_A)) (UseN stone_N))))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA default_A) (ModCN (UseA yellow_A) (UseN stone_N)))))))))"},
                    ],
                ],
                "5,5" : [
                    # she doesn't break the yellow {} stones .
                    [
                        {"cost":3,"lin":"[adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (ModCN (UseA default_A) (UseN stone_N)))))))))"},
                    ],
                ],
                "4,6" : [
                    # she doesn't break the {yellow stones} .
                    [
                        {"cost":7,"lin":"[thing]s","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (UseN default_N)))))))"},
                    ],
                    [
                        {"cost":9,"lin":"stone","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumSg) (UseN stone_N)))))))"},
                    ],
                ],
                "2,3" : [
                    # she doesn't {break} the yellow stones .
                    [
                        {"cost":2,"lin":"be/am/are","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN copula (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"buy","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN buy_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"drink","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN drink_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"eat","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN eat_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"fly","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN fly_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"hate","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN hate_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"hear","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN hear_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"hunt","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN hunt_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"like","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN like_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"listen","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN listen_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"run","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN run_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"see","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN see_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"sit","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN sit_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"sleep","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN sleep_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"swim","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN swim_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"throw","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN throw_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"walk","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN walk_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"watch","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN watch_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"hope","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN (VerbVS hope_VS) (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"know","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN (VerbVS know_VS) (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"say","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN (VerbVS say_VS) (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"want","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN (VerbVV want_VV) (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "0,1" : [
                    #  {she} doesn't break the yellow stones .
                    [
                        {"cost":2,"lin":"he","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron he_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"I","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron i_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"they","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron they_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":2,"lin":"we","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron we_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[something]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP default_NP (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":4,"lin":"[name]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePN default_PN) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "6,6" : [
                    # she doesn't break the yellow stones {} .
                    [
                        {"cost":3,"lin":"everywhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (AdvNP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseAdverb everywhere_Adverb)))))))"},
                        {"cost":3,"lin":"here","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (AdvNP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"somewhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (AdvNP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseAdverb somewhere_Adverb)))))))"},
                        {"cost":3,"lin":"there","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (AdvNP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseAdverb there_Adverb)))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[something]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVNN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) default_NP)))))"},
                        {"cost":3,"lin":"everywhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (AdvVP (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N)))) (UseAdverb everywhere_Adverb))))))"},
                        {"cost":3,"lin":"here","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (AdvVP (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N)))) (UseAdverb here_Adverb))))))"},
                        {"cost":3,"lin":"somewhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (AdvVP (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N)))) (UseAdverb somewhere_Adverb))))))"},
                        {"cost":3,"lin":"there","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (AdvVP (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N)))) (UseAdverb there_Adverb))))))"},
                        {"cost":4,"lin":"[adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVNA break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseA default_A))))))"},
                    ],
                ],
                "3,6" : [
                    # she doesn't break {the yellow stones} .
                    [
                        {"cost":9,"lin":"every stone","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN every_Det (UseN stone_N)))))))"},
                        {"cost":10,"lin":"[something]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V default_NP)))))"},
                        {"cost":11,"lin":"[name]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePN default_PN))))))"},
                        {"cost":11,"lin":"her","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePron she_Pron))))))"},
                        {"cost":11,"lin":"him","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePron he_Pron))))))"},
                        {"cost":11,"lin":"me","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePron i_Pron))))))"},
                        {"cost":11,"lin":"them","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePron they_Pron))))))"},
                        {"cost":11,"lin":"us","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (UsePron we_Pron))))))"},
                    ],
                    [
                        {"cost":11,"lin":"","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV break_V)))))"},
                        {"cost":13,"lin":"[adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVA break_V (UseA default_A))))))"},
                    ],
                ],
                "3,5" : [
                    # she doesn't break {the yellow} stones .
                    [
                        {"cost":9,"lin":"","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant IndefArt NumPl) (UseN stone_N)))))))"},
                        {"cost":9,"lin":"these","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant this_Quant NumPl) (UseN stone_N)))))))"},
                        {"cost":9,"lin":"those","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant that_Quant NumPl) (UseN stone_N)))))))"},
                    ],
                ],
                "2,2" : [
                    # she doesn't {} break the yellow stones .
                    [
                        {"cost":2,"lin":"want to","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (ComplVV want_VV (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N)))))))))"},
                    ],
                ],
                "3,3" : [
                    # she doesn't break {} the yellow stones .
                    [
                        {"cost":3,"lin":"[something]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseVNN break_V default_NP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "2,6" : [
                    # she doesn't {break the yellow stones} .
                    [
                        {"cost":13,"lin":"be/am/are","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV copula)))))"},
                        {"cost":13,"lin":"buy","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV buy_V)))))"},
                        {"cost":13,"lin":"drink","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV drink_V)))))"},
                        {"cost":13,"lin":"eat","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV eat_V)))))"},
                        {"cost":13,"lin":"fly","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV fly_V)))))"},
                        {"cost":13,"lin":"hate","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV hate_V)))))"},
                        {"cost":13,"lin":"hear","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV hear_V)))))"},
                        {"cost":13,"lin":"hunt","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV hunt_V)))))"},
                        {"cost":13,"lin":"like","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV like_V)))))"},
                        {"cost":13,"lin":"listen","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV listen_V)))))"},
                        {"cost":13,"lin":"run","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV run_V)))))"},
                        {"cost":13,"lin":"see","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV see_V)))))"},
                        {"cost":13,"lin":"sit","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV sit_V)))))"},
                        {"cost":13,"lin":"sleep","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV sleep_V)))))"},
                        {"cost":13,"lin":"swim","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV swim_V)))))"},
                        {"cost":13,"lin":"throw","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV throw_V)))))"},
                        {"cost":13,"lin":"walk","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV walk_V)))))"},
                        {"cost":13,"lin":"watch","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV watch_V)))))"},
                        {"cost":14,"lin":"hope","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV (VerbVS hope_VS))))))"},
                        {"cost":14,"lin":"know","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV (VerbVS know_VS))))))"},
                        {"cost":14,"lin":"say","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV (VerbVS say_VS))))))"},
                        {"cost":14,"lin":"want","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (UsePron she_Pron) (UseV (VerbVV want_VV))))))"},
                    ],
                ],
                "1,1" : [
                    # she {} doesn't break the yellow stones .
                    [
                        {"cost":3,"lin":"everywhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (AdvNP (UsePron she_Pron) (UseAdverb everywhere_Adverb)) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"here","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (AdvNP (UsePron she_Pron) (UseAdverb here_Adverb)) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"somewhere","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (AdvNP (UsePron she_Pron) (UseAdverb somewhere_Adverb)) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":3,"lin":"there","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (AdvNP (UsePron she_Pron) (UseAdverb there_Adverb)) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "0,6" : [
                    #  {she doesn't break the yellow stones} .
                    [
                        {"cost":6,"lin":"the yellow stones don't break","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV break_V)))))"},
                        {"cost":7,"lin":"the yellow stones don't break [something]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseVN break_V default_NP)))))"},
                        {"cost":8,"lin":"the yellow stones don't be/am/are","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV copula)))))"},
                        {"cost":8,"lin":"the yellow stones don't buy","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV buy_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't drink","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV drink_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't eat","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV eat_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't fly","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV fly_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't hate","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV hate_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't hear","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV hear_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't hunt","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV hunt_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't like","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV like_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't listen","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV listen_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't run","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV run_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't see","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV see_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't sit","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV sit_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't sleep","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV sleep_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't swim","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV swim_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't throw","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV throw_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't walk","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV walk_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't watch","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV watch_V)))))"},
                        {"cost":8,"lin":"the yellow stones don't break [adjective]","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseVA break_V (UseA default_A))))))"},
                        {"cost":9,"lin":"the yellow stones don't hope","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV (VerbVS hope_VS))))))"},
                        {"cost":9,"lin":"the yellow stones don't know","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV (VerbVS know_VS))))))"},
                        {"cost":9,"lin":"the yellow stones don't say","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV (VerbVS say_VS))))))"},
                        {"cost":9,"lin":"the yellow stones don't want","tree":"(StartUtt (UttS (UseCl Pres Neg (PredVP (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))) (UseV (VerbVV want_VV))))))"},
                    ],
                ],
                "1,2" : [
                    # she {doesn't} break the yellow stones .
                    [
                        {"cost":4,"lin":"didn't","tree":"(StartUtt (UttS (UseCl Past Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
                "1,3" : [
                    # she {doesn't break} the yellow stones .
                    [
                        {"cost":4,"lin":"breaks","tree":"(StartUtt (UttS (UseCl Pres Pos (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                        {"cost":4,"lin":"hasn't broken","tree":"(StartUtt (UttS (UseCl Perf Neg (PredVP (UsePron she_Pron) (UseVN break_V (DetCN (DetQuant DefArt NumPl) (ModCN (UseA yellow_A) (UseN stone_N))))))))"},
                    ],
                ],
            },
        },

        'B': {
            'grammar': "MusteGer",
            'lin': ["Maria", "hat", "Fische", "hier", "gegessen", "."],
            'tree': ("(StartUtt (UttS (UseCl (Perf) (Pos) (PredVP (UsePN (mary_PN)) " 
                     "(UseVN (eat_V) (AdvNP (DetCN (DetQuant (IndefArt) (NumPl)) "
                     "(UseN (fish_N))) (UseAdverb (here_Adverb))))))))"),
            'menu': {
                "2,3" : [
                    # Maria hat {Fische} hier gegessen .
                    [
                        {"cost":2,"lin":"[Ding]e","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN default_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Äpfel","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN apple_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Bäume","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN tree_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Biere","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN beer_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Boote","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN boat_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Bücher","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN book_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Fahrräder","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN bike_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Frauen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN woman_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Früchte","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fruit_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Füße","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN foot_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Haare","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN hair_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Hände","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN hand_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Häuser","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN house_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Hemden","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN shirt_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Hunde","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN dog_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Hüte","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN hat_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Jungen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN boy_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Katzen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN cat_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Köpfe","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN head_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Kühe","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN cow_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Mädchen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN girl_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Männer","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN man_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Milche","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN milk_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Personen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN person_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Pferde","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN horse_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Schuhe","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN shoe_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Steine","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN stone_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Stühle","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN chair_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Tiere","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN animal_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Tische","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN table_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Vögel","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN bird_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Wagen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN car_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Wälder","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN forest_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Wasser","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN water_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Weine","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN wine_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":6,"lin":"einen Fisch","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumSg) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":6,"lin":"jeden Fisch","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN every_Det (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":7,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP default_NP (UseAdverb here_Adverb)))))))"},
                        {"cost":8,"lin":"[Nahme]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (UsePN default_PN) (UseAdverb here_Adverb)))))))"},
                        {"cost":8,"lin":"ihn","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (UsePron he_Pron) (UseAdverb here_Adverb)))))))"},
                        {"cost":8,"lin":"mich","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (UsePron i_Pron) (UseAdverb here_Adverb)))))))"},
                        {"cost":8,"lin":"sie","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (UsePron she_Pron) (UseAdverb here_Adverb)))))))"},
                        {"cost":8,"lin":"uns","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (UsePron we_Pron) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
                "2,2" : [
                    # Maria hat {} Fische hier gegessen .
                    [
                        {"cost":3,"lin":"[adjektiv]e","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (ModCN (UseA default_A) (UseN fish_N))) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":6,"lin":"die","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant DefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":6,"lin":"diese","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant this_Quant NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":6,"lin":"jene","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant that_Quant NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNN eat_V default_NP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":4,"lin":"nicht","tree":"(StartUtt (UttS (UseCl Perf Neg (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
                "3,4" : [
                    # Maria hat Fische {hier} gegessen .
                    [
                        {"cost":2,"lin":"da","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb there_Adverb)))))))"},
                        {"cost":2,"lin":"irgendwo","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb somewhere_Adverb)))))))"},
                        {"cost":2,"lin":"überall","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb everywhere_Adverb)))))))"},
                    ],
                    [
                        {"cost":3,"lin":"","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                    ],
                    [
                        {"cost":6,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNN eat_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) default_NP)))))"},
                        {"cost":7,"lin":"[adjektiv]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNA eat_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseA default_A))))))"},
                    ],
                ],
                "3,3" : [
                    # Maria hat Fische {} hier gegessen .
                    [
                        {"cost":3,"lin":"da","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb there_Adverb)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"hier","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"irgendwo","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb somewhere_Adverb)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"überall","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb everywhere_Adverb)) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
                "4,5" : [
                    # Maria hat Fische hier {gegessen} .
                    [
                        {"cost":2,"lin":"angeschaut","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN watch_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gefliegt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN fly_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gegangen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN walk_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gehasst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hate_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hear_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gejagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hunt_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gekauft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN buy_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gelaufen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN run_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gemocht","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN like_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"geschlafen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN sleep_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"geschwimmt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN swim_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gesehen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN see_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gesessen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN sit_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"getrunken","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN drink_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"gewesen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN copula (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"geworfen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN throw_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"zerschlagen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN break_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"zugehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN listen_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"gehofft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS hope_VS) (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"gesagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS say_VS) (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"gewollt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVV want_VV) (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"gewusst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS know_VS) (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":2,"lin":"essen wollen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (ComplVV want_VV (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb))))))))"},
                    ],
                ],
                "0,1" : [
                    #  {Maria} hat Fische hier gegessen .
                    [
                        {"cost":2,"lin":"[Nahme]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN default_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Berlin","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN berlin_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Deutschland","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN germany_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"England","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN britain_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Göteburg","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN gothenburg_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Johann","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN john_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"London","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN london_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":2,"lin":"Schweden","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN sweden_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP default_NP (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":4,"lin":"er","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePron he_Pron) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":4,"lin":"ich","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePron i_Pron) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":4,"lin":"sie","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePron she_Pron) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":4,"lin":"wir","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePron we_Pron) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
                "4,4" : [
                    # Maria hat Fische hier {} gegessen .
                    [
                        {"cost":3,"lin":"da","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseAdverb there_Adverb)))))))"},
                        {"cost":3,"lin":"irgendwo","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseAdverb somewhere_Adverb)))))))"},
                        {"cost":3,"lin":"überall","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseAdverb everywhere_Adverb)))))))"},
                    ],
                    [
                        {"cost":3,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) default_NP)))))"},
                        {"cost":3,"lin":"da","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (AdvVP (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb))) (UseAdverb there_Adverb))))))"},
                        {"cost":3,"lin":"hier","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (AdvVP (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb))) (UseAdverb here_Adverb))))))"},
                        {"cost":3,"lin":"irgendwo","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (AdvVP (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb))) (UseAdverb somewhere_Adverb))))))"},
                        {"cost":3,"lin":"überall","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (AdvVP (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb))) (UseAdverb everywhere_Adverb))))))"},
                        {"cost":4,"lin":"[adjektiv]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNA eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseA default_A))))))"},
                    ],
                ],
                "2,4" : [
                    # Maria hat {Fische hier} gegessen .
                    [
                        {"cost":8,"lin":"[adjektiv]e Fische","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (DetCN (DetQuant IndefArt NumPl) (ModCN (UseA default_A) (UseN fish_N))))))))"},
                        {"cost":9,"lin":"[Ding]e","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (DetCN (DetQuant IndefArt NumPl) (UseN default_N)))))))"},
                        {"cost":9,"lin":"jeden Fisch","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (DetCN every_Det (UseN fish_N)))))))"},
                        {"cost":10,"lin":"[irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V default_NP)))))"},
                        {"cost":11,"lin":"[Nahme]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (UsePN default_PN))))))"},
                        {"cost":11,"lin":"ihn","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (UsePron he_Pron))))))"},
                        {"cost":11,"lin":"mich","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (UsePron i_Pron))))))"},
                        {"cost":11,"lin":"sie","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (UsePron she_Pron))))))"},
                        {"cost":11,"lin":"uns","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN eat_V (UsePron we_Pron))))))"},
                    ],
                    [
                        {"cost":6,"lin":"[irgendwas] Fische","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVNN eat_V default_NP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":11,"lin":"","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV eat_V)))))"},
                        {"cost":13,"lin":"[adjektiv]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVA eat_V (UseA default_A))))))"},
                    ],
                ],
                "3,5" : [
                    # Maria hat Fische {hier gegessen} .
                    [
                        {"cost":7,"lin":"angeschaut","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN watch_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gefliegt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN fly_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gegangen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN walk_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gehasst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hate_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hear_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gejagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN hunt_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gekauft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN buy_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gelaufen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN run_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gemocht","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN like_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"geschlafen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN sleep_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"geschwimmt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN swim_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gesehen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN see_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gesessen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN sit_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"getrunken","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN drink_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"gewesen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN copula (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"geworfen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN throw_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"zerschlagen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN break_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":7,"lin":"zugehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN listen_V (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":8,"lin":"gehofft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS hope_VS) (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":8,"lin":"gesagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS say_VS) (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":8,"lin":"gewollt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVV want_VV) (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                        {"cost":8,"lin":"gewusst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseVN (VerbVS know_VS) (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)))))))"},
                    ],
                ],
                "2,5" : [
                    # Maria hat {Fische hier gegessen} .
                    [
                        {"cost":13,"lin":"angeschaut","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV watch_V)))))"},
                        {"cost":13,"lin":"gefliegt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV fly_V)))))"},
                        {"cost":13,"lin":"gegangen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV walk_V)))))"},
                        {"cost":13,"lin":"gehasst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV hate_V)))))"},
                        {"cost":13,"lin":"gehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV hear_V)))))"},
                        {"cost":13,"lin":"gejagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV hunt_V)))))"},
                        {"cost":13,"lin":"gekauft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV buy_V)))))"},
                        {"cost":13,"lin":"gelaufen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV run_V)))))"},
                        {"cost":13,"lin":"gemocht","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV like_V)))))"},
                        {"cost":13,"lin":"geschlafen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV sleep_V)))))"},
                        {"cost":13,"lin":"geschwimmt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV swim_V)))))"},
                        {"cost":13,"lin":"gesehen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV see_V)))))"},
                        {"cost":13,"lin":"gesessen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV sit_V)))))"},
                        {"cost":13,"lin":"getrunken","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV drink_V)))))"},
                        {"cost":13,"lin":"gewesen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV copula)))))"},
                        {"cost":13,"lin":"geworfen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV throw_V)))))"},
                        {"cost":13,"lin":"zerschlagen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV break_V)))))"},
                        {"cost":13,"lin":"zugehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV listen_V)))))"},
                        {"cost":14,"lin":"gehofft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV (VerbVS hope_VS))))))"},
                        {"cost":14,"lin":"gesagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV (VerbVS say_VS))))))"},
                        {"cost":14,"lin":"gewollt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV (VerbVV want_VV))))))"},
                        {"cost":14,"lin":"gewusst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (UsePN mary_PN) (UseV (VerbVS know_VS))))))"},
                    ],
                ],
                "1,1" : [
                    # Maria {} hat Fische hier gegessen .
                    [
                        {"cost":3,"lin":"da","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (UsePN mary_PN) (UseAdverb there_Adverb)) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"hier","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (UsePN mary_PN) (UseAdverb here_Adverb)) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"irgendwo","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (UsePN mary_PN) (UseAdverb somewhere_Adverb)) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":3,"lin":"überall","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (UsePN mary_PN) (UseAdverb everywhere_Adverb)) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
                "0,4" : [
                    #  {Maria hat Fische hier} gegessen .
                    [
                        {"cost":6,"lin":"Fische hier haben","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV eat_V)))))"},
                        {"cost":7,"lin":"Fische hier haben [irgendwas]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseVN eat_V default_NP)))))"},
                        {"cost":8,"lin":"Fische hier haben [adjektiv]","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseVA eat_V (UseA default_A))))))"},
                    ],
                ],
                "0,5" : [
                    #  {Maria hat Fische hier gegessen} .
                    [
                        {"cost":8,"lin":"Fische hier haben angeschaut","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV watch_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gefliegt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV fly_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gehasst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV hate_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV hear_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gejagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV hunt_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gekauft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV buy_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gemocht","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV like_V)))))"},
                        {"cost":8,"lin":"Fische hier haben geschlafen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV sleep_V)))))"},
                        {"cost":8,"lin":"Fische hier haben geschwimmt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV swim_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gesehen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV see_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gesessen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV sit_V)))))"},
                        {"cost":8,"lin":"Fische hier haben getrunken","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV drink_V)))))"},
                        {"cost":8,"lin":"Fische hier haben gewesen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV copula)))))"},
                        {"cost":8,"lin":"Fische hier haben geworfen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV throw_V)))))"},
                        {"cost":8,"lin":"Fische hier haben zerschlagen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV break_V)))))"},
                        {"cost":8,"lin":"Fische hier haben zugehört","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV listen_V)))))"},
                        {"cost":8,"lin":"Fische hier sind gegangen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV walk_V)))))"},
                        {"cost":8,"lin":"Fische hier sind gelaufen","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV run_V)))))"},
                        {"cost":9,"lin":"Fische hier haben gehofft","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV (VerbVS hope_VS))))))"},
                        {"cost":9,"lin":"Fische hier haben gesagt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV (VerbVS say_VS))))))"},
                        {"cost":9,"lin":"Fische hier haben gewollt","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV (VerbVV want_VV))))))"},
                        {"cost":9,"lin":"Fische hier haben gewusst","tree":"(StartUtt (UttS (UseCl Perf Pos (PredVP (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)) (UseV (VerbVS know_VS))))))"},
                    ],
                ],
                "1,5" : [
                    # Maria {hat Fische hier gegessen} .
                    [
                        {"cost":4,"lin":"aß Fische hier","tree":"(StartUtt (UttS (UseCl Past Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                        {"cost":4,"lin":"ißt Fische hier","tree":"(StartUtt (UttS (UseCl Pres Pos (PredVP (UsePN mary_PN) (UseVN eat_V (AdvNP (DetCN (DetQuant IndefArt NumPl) (UseN fish_N)) (UseAdverb here_Adverb)))))))"},
                    ],
                ],
            },
        },

    }


if __name__ == '__main__':
    main()
