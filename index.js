const tmi = require("tmi.js");
const SaweriaClient = require("saweria");
const ConfigParser = require("configparser");
const { URL } = require("url");
const { parse } = require("querystring");
const readline = require("readline");

readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configParser = new ConfigParser();

try {
  configParser.read("config");
} catch (err) {
  console.log("Can't find config file. Press any key to exit");
}

const config = {
  BOT_USERNAME: configParser.get("Twitch", "BOT_USERNAME"),
  CHANNEL_NAME: configParser.get("Twitch", "CHANNEL_NAME"),
  OAUTH_TOKEN: configParser.get("Twitch", "OAUTH_TOKEN"),
  MESSAGE_TEMPLATE: configParser.get("Twitch", "MESSAGE_TEMPLATE"),
  ALERT_URL: configParser.get("Saweria", "ALERT_URL"),
};

const saweriaClient = new SaweriaClient();
const tmiClient = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: config.BOT_USERNAME,
    password: config.OAUTH_TOKEN,
  },
  channels: [config.CHANNEL_NAME],
});

saweriaClient.on("donations", (donations) => {
  for (const donation of donations) {
    let message = config.MESSAGE_TEMPLATE;
    message = message?.replace(/{donator}/g, donation.donator);
    message = message?.replace(
      /{amount}/g,
      "Rp " + numberWithCommas(donation.amount)
    );
    message = message?.replace(/{message}/g, donation.message);
    tmiClient.say(config.CHANNEL_NAME, message);
  }
});

tmiClient.on("connected", () => {
  const streamKey = parse(
    new URL(config.ALERT_URL, "https://saweria.co").search.substr(1)
  ).streamKey;
  saweriaClient.setStreamKey(streamKey);
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

tmiClient.connect();
