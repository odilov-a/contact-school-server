const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const jsonFilePath = "json/course.json";

const readTelegramCourseFile = () => {
  try {
    const filePath = path.join(__dirname, "..", jsonFilePath);
    const fileData = readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileData);
    if (!jsonData || !jsonData.data || !Array.isArray(jsonData.data)) {
      throw new Error("Invalid data structure in the JSON file");
    }
    return jsonData.data;
  } catch (error) {
    throw new Error("Error reading Telegram data file");
  }
};

const writeTelegramCourseFile = (data) => {
  try {
    const filePath = path.join(__dirname, "..", jsonFilePath);
    const jsonData = { data };
    writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
  } catch (error) {
    throw new Error("Error writing to Telegram data file");
  }
};

exports.getAllTelegramCoureInfo = (req, res) => {
  try {
    const telegramData = readTelegramCourseFile();
    return res.json({ data: telegramData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateTelegramCoureInfo = (req, res) => {
  try {
    const { telegramBotToken, telegramChannelChatId } = req.body;
    const telegramData = readTelegramCourseFile();
    const index = telegramData.findIndex((entry) => entry._id === req.params.telegramId);
    if (index !== -1) {
      telegramData[index] = { ...telegramData[index], telegramBotToken, telegramChannelChatId };
      writeTelegramCourseFile(telegramData);
      return res.json({ data: telegramData[index] });
    } else {
      return res.status(404).json({ error: "Telegram bot not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getTelegramCoureInfoById = (req, res) => {
  try {
    const telegramData = readTelegramCourseFile();
    const telegramInfo = telegramData.find((entry) => entry._id === req.params.telegramId);
    if (telegramInfo) {
      return res.json({ data: telegramInfo });
    } else {
      return res.status(404).json({ error: "Telegram bot not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};