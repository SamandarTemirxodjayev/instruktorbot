require("dotenv").config();
const mongoose = require("mongoose");
const TelegramBot = require('node-telegram-bot-api');
const express = require("express");
let ejs = require('ejs');
var cors = require('cors');
let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch:', err));
require("./bot.js");
const Drivers = require("./models/Drivers.js");
const Users = require("./models/Users.js");

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/instruktorbot";

mongoose
	.connect(MONGO_URL)
	.then(() => console.log("MongoDB connection successful"))
	.catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.set('view engine', 'ejs');
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listen port: ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/drivers", async(req, res) => {
  try {
    const {type, category, male, staj, someDetails, fullName} = req.body;
    const newDriver = await Drivers.create({
      type, category, male, staj, someDetails, fullName
    })
    return res.json(newDriver)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

app.delete("/drivers/:id", async(req, res) => {
  try {
    await Drivers.findByIdAndDelete(req.params.id);
    return res.json({deleted: true});
  } catch (error) {
    return res.json(error).status(500);
  }
})

app.get("/drivers", async (req, res) => {
  const drivers = await Drivers.find();
  return res.json(drivers)
});
app.get("/", async (req, res) => {
  return res.render("dashboard")
})
app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  if(username != "admin"){
    return res.json({message: "Invalid username"})
  }
  if(password != "admin" ){
    return res.json({message: "Invalid password"})
  }
  return res.render("dashboard");
})
app.get("/login", async (req, res) => {
  return res.render("login");
})
app.post("/sendMessage", async (req, res) => {
  try {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const users = await Users.find();

    let startDate = new Date();

    for (const user of users) {
      await sleep(1000);

      const chatId = user.telegram_id;
      const msgText = req.body.message;
      const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: msgText
        })
      });
    }
    let endDate = new Date();
      const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: '6064433507',
          text: `Rassilka Tugadi\nBoshlangan Vaqti: ${startDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}\nTugagan Vaqti: ${endDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}`
        })
      });
    return res.json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Failed to send messages"});
  }
});
app.post("/sendPoll", async (req, res) => {
  try {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const users = await Users.find();

    let startDate = new Date();

    for (const user of users) {
      await sleep(1000);
      const chatId = user.telegram_id;


      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: req.body.photo_url,
        })
      });

      const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPoll`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          question: req.body.question,
          options: req.body.options,
          type: "quiz",
          correct_option_id: req.body.correct_option_id
        })
      });
    }
    let endDate = new Date();
      const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: '6064433507',
          text: `Rassilka Tugadi\nBoshlangan Vaqti: ${startDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}\nTugagan Vaqti: ${endDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}`
        })
      });
    return res.json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Failed to send messages"});
  }
});
app.post("/sendPhoto", async (req, res) => {
  try {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const users = await Users.find();

    let startDate = new Date();

    for (const user of users) {
      await sleep(1000);

      const chatId = user.telegram_id;
      const caption = req.body.caption; // Caption for the photo
      const photoUrl = req.body.photo_url; // URL of the photo to send
      const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photoUrl,
          caption: caption
        })
      });
    }
    let endDate = new Date();
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: '6064433507',
        text: `Photo sent to all users\nStart Time: ${startDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}\nEnd Time: ${endDate.toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' })}`
      })
    });
    return res.json({success: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Failed to send photos"});
  }
});
