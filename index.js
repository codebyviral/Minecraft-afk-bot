const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('Welcome to PDEU Minecraft Bot')
})

const mineflayer = require('mineflayer');

const botArgs = {
    host:"PDEU_OfficialSmp.aternos.me",
    port:'55222',
    username: 'pdeu_bot',
    version:'1.20.3'
};

const initBot = () => {

    let bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', () => {
        console.log(`Disconnected`);

        setTimeout(initBot, 5000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`)
        }
        else {
            console.log(`Unhandled error: ${err}`);
        }
    });
};

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initBot();
});
