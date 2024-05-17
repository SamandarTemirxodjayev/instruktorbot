const mainKeyboardUz = {
  parse_mode: "HTML",
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{text: "🚗 Instruktor Tanlash"}, {text: "🇺🇿 Tilni O'zgartirish"}],
      // [{text: "🤝 Savol va Taklif"}]
    ]
  }
};
const mainKeyboardRu = {
  parse_mode: "html",
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{text: "🚗 Выбор Инструктора"}, {text: "🇷🇺 Смена Языка"}]
    ]
  }
};
const langKeyboardUz = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "🇺🇿 O'zbek", callback_data: "lang_uz"}, {text: "🇷🇺 Rus", callback_data: "lang_ru"}]
    ]
  }
};
const langKeyboardRu = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "🇺🇿 O'zbek", callback_data: "lang_uz"}, {text: "🇷🇺 Rus", callback_data: "lang_ru"}]
    ]
  }
}

const choose1Uz = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "📚 Imtihonga Tayyorlanish", callback_data: "choose1|exam"}],
      [{text: "🛞 Haydashni O'rganish", callback_data: "choose1|learn"}]
    ]
  }
}
const choose1Ru = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "📚 Подготовка К Экзамену", callback_data: "choose1|exam"}],
      [{text: "🛞 Обучение Вождению", callback_data: "choose1|learn"}]
    ]
  }
}
const choose2Uz = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "A", callback_data: "choose2|A"}, {text: "B", callback_data: "choose2|B"}],
      [{text: "C", callback_data: "choose2|C"}, {text: "D", callback_data: "choose2|D"}],
      [{text: "E", callback_data: "choose2|E"}]
    ]
  }
}
const choose3Uz = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "🙍‍♀️ Ayol", callback_data: "choose3|Ayol"}, {text: "🙎‍♂️ Erkak", callback_data: "choose3|Erkak"}]
    ]
  }
}
const choose3Ru = {
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{text: "🙍‍♀️ Женщина", callback_data: "choose3|Ayol"}, {text: "🙎‍♂️ Мужчина", callback_data: "choose3|Erkak"}]
    ]
  }
}

module.exports = {mainKeyboardUz, mainKeyboardRu, langKeyboardUz, langKeyboardRu, choose1Uz, choose1Ru, choose2Uz, choose3Uz, choose3Ru}