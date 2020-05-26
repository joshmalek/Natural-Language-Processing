const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const steamUserInfo = require('steam-userinfo');
steamUserInfo.setup("A9E55CC3707BC099708237C42F1A669B");
const colors = require('colors');
const steamInventory = require('steam-inventories');
const Prices= require('./prices.json');
const config = require('./config.json');
const stats = require('./stats.json');
const people = require('./people.json')
const apiai = require('apiai')("3e2212afc8a545269c0c22da9392f5c6");
var fs = require('fs');
var fileName = './stats.json';
var peopleName = './people.json';
var file = require(fileName);
var peopleFile = require(peopleName)


const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'

});

var outcome = "";
var value = "";
client.logOn({
  accountName : config.username,
  password : config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
})

//LOGGING ON AND VERIFICATION
client.on('loggedOn', function(details) {
  console.log("Successfully Logged On!")
value = client.steamID.isValid();
  if(value = "true")
  {
    outcome = "VALID";
  }
  else{
    outcome = "INVALID";
  }
  console.log("Profile is " + outcome);
  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed(308040);

})
client.on('accountInfo', function(name){
  console.log("Tradebot logged into Steam as " + name);
  console.log("Total completed trades:",stats.completeTrades)
})
var info = ""
var obj = {}
var temp = ""
var alreadyKnown = false
var jsonArray = []
fs.readFile('./people.json', (err, file) => {
  jsonArray = JSON.parse(file);
});
//ADDING A FRIEND AND FIRST CHAT
client.on('friendRelationship', (steamid, relationship) => {
    if (relationship === 2) {

        var name = "";
        client.addFriend(steamid);
        client.chatMessage(steamid, "Hello there! Thanks for adding me! Talk to me like a normal person, and I'll talk back.");
        steamUserInfo.getUserInfo(steamid, function(error, data){
          if(error) throw error;
            for (i in Object.keys(jsonArray)){
              console.log(i)
            if (i == steamid){
              alreadyKnown = true
              info = peopleFile[i]
            }}

            if (alreadyKnown != true){
              info = data.response.players[0]
              obj[steamid] = info;
              peopleFile = obj;
              jsonArray.push(peopleFile);

            fs.writeFile('./people.json', JSON.stringify(jsonArray,null,4));

      }else{
        console.log("We already know" + info.personaname)
      }
         });

        console.log(">New Event: Friend added");
    }
});

//CHATTING WITH CUSTOMERS
client.on("friendMessage", function(steamID, message){
  var id = "";

  if(steamID == config.ownerID){
    id = "ADMIN";
  }
  else if(steamID == config.yangID){
    id = "YANG";
  }
  else{
    id = "CUSTOMER";
  }
  for (i in peopleFile){
    for (x in i){
    if (i == steamID){
      temp = peopleFile[i]
    }
  }
}

   let apiaiReq = apiai.textRequest(message, {
      sessionId: "1"
   });
      apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;

      client.chatMessage(steamID, aiText);
      console.log("[" + temp.personaname + "] says: " + message.bold);
      console.log(aiText.reset)
      if(aiText == ("Awesome, I'll make a trade offer and send it to you, and you can modify it if you want. It's all up to you.") || aiText == ("Amazing! I'll send you a trade offer real quick.")){
        console.log("TRADING MODE INITIATED")
        client.chatMessage(steamID,"TRADING MODE INITIATED")

      }
   });


   apiaiReq.on('error', (error) => {
     console.log(error);
   });

   apiaiReq.end();

 });
