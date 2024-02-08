# Discord Role Assignment Bot

This is a Discord bot written in JavaScript that assigns a role to members based on a verification screenshot.

## Features

- **Role Assignment**: The bot checks if a member has submitted a verification screenshot and, if confirmed, assigns the corresponding role.

## Requirements

- Node.js
- discord.js

## Installation

1. Clone this repository:

git clone https://github.com/your-username/repository-name.git

2. Install dependencies:


3. Configure the bot:

- Create a `.env` file in the root of the project with the following variables:

  ```
  TOKEN=
  CHANNEL_ID=
  YOUTUBE_CHANNEL_NAME=perseu
  ROLE_NAME=Verified
  ```

4. Start the bot:

node index.js

## How to Use

1. Invite the bot to your Discord server.
2. Set up the roles and verification channels in your server.
3. Members should submit a verification screenshot in the designated channel.
4. The bot will check the screenshot and assign the corresponding role to the member.

## Screenshot Example:

![image](https://github.com/perseu444/discord-verify-screenshot-bot/assets/71997803/f2a54925-e7e5-453f-9df7-292295be0060)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).





