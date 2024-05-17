const TelegramBot = require('node-telegram-bot-api');
const Drivers = require("./models/Drivers.js");
const Users = require('./models/Users');
require("dotenv").config();
const { mainKeyboardUz, mainKeyboardRu, langKeyboardUz, langKeyboardRu, choose1Uz, choose1Ru, choose2Uz, choose3Uz, choose3Ru } = require('./utils/keyboards');

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const msgText = msg.text;


  const member = await bot.getChatMember("-1002065877986", chatId);
  if (member.status != 'member' && member.status != 'administrator' && member.status != 'creator') {
    return bot.sendMessage(chatId, "<b>🇺🇿 Botdan Foydalanish uchun bizning guruhimizga a'zo boling\n\n🇷🇺 Перед использованием этого бота подпишитесь на группу</b>", {
      reply_markup: {
        inline_keyboard: [
          [{text: "Guruhimiz/Gruppa", url: "https://t.me/+79Tv0P3jbNo3NTAy"}],
          [{text: "Tekshirish/Проверить", callback_data: "check_subs"}]
        ],
        resize_keyboard: true
      },
      parse_mode: "HTML"
    });
  }

  const user = await Users.findOne({
    telegram_id: chatId,
  });
  if(!user){
    const newUser = await Users.create({
      telegram_id: chatId
    });
    await newUser.save();
    return bot.sendMessage(chatId, "<b>🇺🇿 Tilni Tanglang</b>", langKeyboardUz);
  }else if(!user.language) {
    return bot.sendMessage(chatId, "<b>🇺🇿 Tilni Tanglang</b>", langKeyboardUz);
  }
  if(msgText == '/start'){
    if(user.language == "uz"){
      bot.sendMessage(chatId, "<b>🏘 Asosiy Sahifa</b>", mainKeyboardUz);
    }else if(user.language == "ru"){
      bot.sendMessage(chatId, "<b>🏘 Главная Страница</b>", mainKeyboardRu);
    }
  }
  if(msgText == "🇷🇺 Смена Языка" || msgText == "🇺🇿 Tilni O'zgartirish") {
    if(user.language == "uz"){
      bot.sendMessage(chatId, "<b>🇺🇿 Tilni Tanglang</b>", langKeyboardUz);
    }else if(user.language == "ru"){
      bot.sendMessage(chatId, "<b>🇷🇺 Смена Языка</b>", langKeyboardRu);
    }
  }
  if(msgText == "🚗 Instruktor Tanlash" || msgText == "🚗 Выбор Инструктора"){
    if(user.language == "uz"){
      bot.sendMessage(chatId, "<b>🛣 Yo'nalishni Tanglang</b>", choose1Uz);
    }else if(user.language == "ru"){
      bot.sendMessage(chatId, "<b>🛣 Выберите Направление</b>", choose1Ru);
    }
  }
  if(msgText == "🤝 Savol va Taklif") {
    if(user.language == "uz"){
      bot.sendMessage(chatId, "<b>🛣 Yo'nalishni Tanglang</b>", choose1Uz);
    }else if(user.language == "ru"){
      bot.sendMessage(chatId, "<b>🛣 Выберите Направление</b>", choose1Ru);
    }
  }
  if(msgText == "test") {
    bot.sendPoll(chatId, "qaysi avtomobil ikkinchi bolib otadi", ["kok", "qizil", "yashil", "qora"], {
      type: "quiz",
      correct_option_id: 2,
    });
  }
});

bot.on("callback_query", async(msg) => {
  const chatId = msg.message.chat.id;
  const msgText = msg.data;
  const msgId = msg.message.message_id;
  const user = await Users.findOne({
    telegram_id: chatId,
  });
  if(!user){
    return bot.sendMessage(chatId, "/start");
  }
  if(msgText == "check_subs"){
    await bot.deleteMessage(chatId, msgId)
    const member = await bot.getChatMember("-1002065877986", chatId);
    if (member.status != 'member' && member.status != 'administrator' && member.status != 'creator') {
      return bot.sendMessage(chatId, "<b>🇺🇿 Botdan Foydalanish uchun bizning guruhimizga a'zo boling\n\n🇷🇺 Перед использованием этого бота подпишитесь на группу</b>", {
        reply_markup: {
          inline_keyboard: [
            [{text: "Guruhimiz/Gruppa", url: "https://t.me/+79Tv0P3jbNo3NTAy"}],
            [{text: "Tekshirish/Проверить", callback_data: "check_subs"}]
          ],
          resize_keyboard: true
        },
        parse_mode: "HTML"
      });
    }else {
      return bot.sendMessage(chatId, "<b>🇺🇿 Tilni Tanglang</b>", langKeyboardUz);
    }
  }
  if(msgText == "lang_uz"){
    user.language = "uz"
    await user.save();
    await bot.deleteMessage(chatId, msgId)
    return bot.sendMessage(chatId, "<b>🏘 Asosiy Sahifa</b>", mainKeyboardUz);
  }
  if(msgText == "lang_ru"){
    user.language = "ru"
    await user.save();
    bot.deleteMessage(chatId, msgId)
    return bot.sendMessage(chatId, "<b>🏘 Главная Страница</b>", mainKeyboardRu);
  }
  if(msgText.indexOf("choose1|") !== -1){
    await bot.deleteMessage(chatId, msgId);
    let text = msgText.split("|");
    user.type = text[1];
    await user.save();
    if(user.language == "uz"){
      return bot.sendMessage(chatId, "<b>📌 Kategoriyani Tanglang</b>", choose2Uz);
    }else if(user.language == "ru"){
      return bot.sendMessage(chatId, "<b>📌 Выберите Категорию</b>", choose2Uz);
    }
    
  }
  if(msgText.indexOf("choose2|") !== -1){
    await bot.deleteMessage(chatId, msgId);
    let text = msgText.split("|");
    user.category = text[1];
    await user.save();
    if(user.language == "uz"){
      return bot.sendMessage(chatId, "<b>👫 Instruktor Jinsini Tanglang</b>", choose3Uz);
    }else if(user.language == "ru"){
      return bot.sendMessage(chatId, "<b>👫 Выберите Пол Инструктора</b>", choose3Ru);
    }
  }
  if(msgText.indexOf("choose3|") !== -1){
    await bot.deleteMessage(chatId, msgId);
    let text = msgText.split("|");
    user.male = text[1];
    await user.save();
    const drivers = await Drivers.find({
      type: user.type,
      category: user.category,
      male: user.male
    })
    if(drivers.length == 0 && user.language == "uz"){
      return bot.sendMessage(chatId, "<b>Instruktorlar mavjud emas</b>", mainKeyboardUz)
    }else if (drivers.length == 0 && user.language == "ru"){
      return bot.sendMessage(chatId, "<b>Инструкторов нет</b>", mainKeyboardRu)
    }
    if(user.language == "uz"){
      const driversText = drivers.map(driver => {
        return `<b>Instruktor: ${driver.fullName}\nTajriba: ${driver.staj}yil\n${driver.someDetails}\n-----------------</b>`;
      }).join("\n");
      return bot.sendMessage(chatId, driversText, mainKeyboardUz)
    }else if(user.language == "ru"){
      const driversText = drivers.map(driver => {
        return `<b>Инструктор: ${driver.fullName}\Стаж: ${driver.staj}год\n${driver.someDetails}\n-----------------</b>`;
      }).join("\n");
      return bot.sendMessage(chatId, driversText, mainKeyboardRu)
    }
    
  }
});

console.log("Bot is connected", "done");
