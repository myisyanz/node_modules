//@๐๐๐๐_๐๐๐
/**
         [ CREDITS ]
         * Coding by @๐๐๐๐_๐๐๐
         * @ YT : https://youtube.com/channel/YANZGTZ
         * @ YT CHANNEL : ๊ชถ๊ซYANZ๊ช๊ซ ๐ฅ 
         * @ WhatsAp
*/
let { loading } = require('./starting')

const Connecting = async ({update, client, Boom, DisconnectReason, sleep, operate}) => {

      const { connection, lastDisconnect } = update
      if (connection === 'connecting'){
             console.log('INFO', update) 
             }  
       //response if there is a failure/error in connection                       	             
       if (connection === 'close') {
         let messageconnect = new Boom(lastDisconnect?.error)?.output.statusCode
            if (messageconnect === DisconnectReason.badSession) { 
               console.log(`Sorry, it looks like the session file is disabled. Please re-scan๐`)
               client.logout();
               console.log('Mengkoneksikan ulang dalam 10 detik....')
               setTimeout( () => {
                 operate();
               }, 10000)
              } else if (messageconnect === DisconnectReason.connectionClosed) { 
               console.log("Connection lost, trying to reconnect๐"); 
               operate(); 
              } else if (messageconnect === DisconnectReason.connectionReplaced) { 
               console.log("Another connection is replaced, please close this connection first");    
              process.exit(); 
              } else if (messageconnect === DisconnectReason.restartRequired) { 
               console.log("An error occurred, reconnecting๐"); 
               setTimeout( () => {
                 operate();
               }, 10000)
              } else if (messageconnect === DisconnectReason.connectionLost) { 
               console.log("Connection lost from the web, trying to reconnect๐"); 
               setTimeout( () => {
                 operate();
               }, 10000)             
              } else if (messageconnect === DisconnectReason.loggedOut) { 
              console.log(`Device is out, please re-scan๐`);    
              process.exit();               
              } else if (messageconnect === DisconnectReason.timedOut) { 
               console.log("Connection reached the limit, please reload๐"); 
               operate(); 
             } else client.end(`Reason : ${messageconnect}|${connection}`)
        }  
       if (connection === 'open'){         
         //clearing logs in terminal
          console.clear()          
           //start progress
            loading()
             //silent for 5.5 seconds
              await sleep(5500)
               //displays information that it is connected
                console.log('connectedโ๏ธ') 
         }
   }
   
   module.exports = { Connecting }       