# TWI Saweria Bot

Self host your Twitch Bot and send a message to your Twitch live stream when you receive a donation in [Saweria](https://saweria.co)!

## How to use

1. Download and extract the `zip` file [here](https://github.com/SuspiciousLookingOwl/tmi-saweria/releases)
2. Open the `config` file with Notepad or other text / code editor
3. Enter your `BOT_USERNAME`, this can be your own channel name or you can create a new Twitch account dedicated for bot
4. Enter your `CHANNEL_NAME`, this is your Twitch channel name
5. Enter your `OAUTH_TOKEN`, you can get your OAuth Token from [twitchapps.com/tmi](https://twitchapps.com/tmi/)
6. Enter your `ALERT_URL`, this is your Saweria overlay URL. You can get the URL from [saweria.co/overlays](https://saweria.co/overlays)

At the end, your config file will look like this:
```cfg
[Twitch]
BOT_USERNAME=yourbotorchannelname
CHANNEL_NAME=yourchannelname
OAUTH_TOKEN=oauth:...
MESSAGE_TEMPLATE={donator} donated {amount}. {message}

[Saweria]
ALERT_URL=https://saweria.co/overlays/alert...
```

You can also customize the message by editing the `MESSAGE_TEMPLATE` value, and the template can contain these placeholders:
- `{donator}` will be replaced with the donator name (e.g. `Someguy`)
- `{amount}` will be replaced with the donation amount (e.g. `Rp 69.420`)
- `{message}` will be replaced with the donation message (e.g. `THIS IS A FAKE MESSAGE!`)

Finally you can run the `tmi-saweria.exe` file.

To make sure that everything is working properly, go to https://saweria.co/overlays and click `Munculkan notifikasi` and check your stream chat.

![Example](https://cdn.discordapp.com/attachments/770681027428352042/814162660736237608/unknown.png)