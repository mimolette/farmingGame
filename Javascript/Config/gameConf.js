var conf = {
  water : {
    speed : { initial: 1000, max : 500 },
    drink : 1,
    price : { initial : 1, current : 1 }
  },
  field : {
    growSpeed : 5,
    harvestPrice : 40,
    harvestScore : 1
  },
  game : {
    initial : {
      cash : 50,
      nbFields : 3,
      nbLiterWater : 1,
      supplyWater : 20
    },
    time : { max : 1000*60*15 },
    defeat : { nbField : 3 }
  }
};