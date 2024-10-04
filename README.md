##

Create an auth0 application and fill in these env variables to have an online dice roller
NEXT_PUBLIC_TOKEN_PUBLIC_KEY
NEXT_PUBLIC_AUTH_CLIENT_ID
NEXT_PUBLIC_AUTH_CLIENT_SECRET

## Running

    Download the repo, run npm install from the source directory "world-tree-coding-challenge" (if you don't have npm downloaded it is here https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). After downloading it create a file named '.env' in the 'world-tree-coding-challenge' folder and copy/paste the env variables from your auth0 project. Run 'npm run dev' from the 'world-tree-coding-challenge' directory.

    After giving it a couple seconds to load, navigate to http://localhost:3000.

    To test some of the requirements, feel free to add in any number of dice and play around.

    To test more specific things, such as the authentication token you have two options. You can use a program like postman to create
    your own access token, then try to call the dice roll endpoint with that token after 3 minutes and see it fail.

    Authentication - "localhost:3000/api/authentication"

    Dice roll - "http://localhost:3000/api/roll?dice=<dice_value>:<dice_amount>"

    To see the token get refreshed after 3 minutes, you can go to to the dice roller, which will automatically spawn a token upon
    logging in and wait three minutes. If you look at your network tab when you try to make a roll after three minutes, you will
    see that the call fails, but immediately afterwards a new call is made to the authentication endpoint to grab a new token.

    To test the sockets working properly, just open the project on multiple browsers (i just used multiple private windows) and play
    around with it.
