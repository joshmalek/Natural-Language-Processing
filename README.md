# Natural Language Processing (NLP) Bot  |  Node.js

#### Description: ####
On Steam, automated trading card bot accounts are everywhere, and always follow the same formula.  A chat is opened with the bot, and the then you choose which items you want from a list and continue from there.  There is no incentive to trading with bot accounts and most people use them over other humans because they simply have more stock.  This bot asked a simple question: would people be more eager to trade with bot accounts if they couldn't immediately tell it was a bot account?  
#### In Depth: ####
This bot uses standard DialogFlow packages to provide a NLP interface on the popular gaming platform, Steam.  A user will open a chat with the bot account, and interact normally which is achieved through the extensive DialogFlow training.  The bot has the ability to trade items with the user if that is desired, with special interactions provided for the admin (taking whatever items they want).  The bot will trade using the same routine in my Steam Trading Bot repo, as this was an extension of that project.
#### NPM Packages: ####

    SteamUser
    SteamTotp
    SteamCommunity
    TradeOfferManager
    steamUserInfo
    colors
    steamInventory
  
