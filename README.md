## Assumptions:

    Instead of just having a 'DM', I allowed all users to add dice and roll whenever and it will just show that. If for some reason we wanted to have just one person who can roll, I'd just add a checkbox to indicate that user is the DM. If they were playing with annoying people, I'd add a value to the JWT saying they are DM so only they can roll.

    Because of the time limit, the UI is subpar, but I assumed this was more about the back end work anyways, so i think what is there for the front end is okay.

    I wasn't sure what "It should be able to roll many types on the same request." meant exactly. The endpoint can take any amount with any number, but I'm not sure if the option to add in an any sided dice was necessary.

## Discussion:

    Socket package - I looked through 3 popular socket packages for node (websocket, ws, and socket.io). I ultimately chose socket.io because I tried to build this like I would for world tree and socket.io is able to not only have sockets for data but can also add voice/video, which could maybe be helpful in the future.

    Authentication - I chose to use Auth0. I used auth0 at my last job and while I just used it to create a token here, I again wanted to show kind of what tools i would use to build world tree. Auth0 is the best authentication software in the world and has things that world tree would probably want at some point, such as easy SSO set ups.

    CSS - I just used tailwind because it's light weight. If this was a more front end heavy project, I would consider using a component library, but again, this was mostly back end so i didn't spend a ton of time on the front end.

    Using Next JS - Since this was a small project I wanted to take a more monolithic approach to it, so since Next already has the API bundled together, it seemed smarter to do then set up an entire express backend. If this was anything bigger I would separate them because I'm not incredibly comfortable having the front end and back end coupled together so closely.

## Packages:

    "dotenv": "^16.4.5" - env variables for api calls
    "jsonwebtoken": "^9.0.2" - verifying auth0 token
    "next": "^14.2.11", - nextjs
    "react": "^18", - react
    "react-dom": "^18", -react dom
    "socket.io": "^4.7.5", - chose to use this for my socket manager. found it easy to use, with a lot of extra features.
    "socket.io-client": "^4.7.5" - ^^^
    "eslint": "^8", -formatting
    "eslint-config-next": "14.2.11", -formatting
    "tailwindcss": "^3.4.1" - minor styling

## Testing

    Didn't have enough time to write jest or cypress tests like I normally would. Just tested by manually running it.

## Running

    I will email Jason the env variables to run this once I test downloading it from scratch on my laptop and making sure it easily runs after getting downloaded.

    Download the repo, run npm install from the source directory "world-tree-coding-challenge" (if you don't have npm downloaded it is here https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). After downloading it create a file named '.env' in the 'world-tree-coding-challenge' folder and copy/paste the env variables I sent over on email in that file. Run 'npm run dev' from the 'world-tree-coding-challenge' directory.

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

    The app is also set up to pull the most recent dice selected if they weren't cleared and the app is still running. I'm not sure
    what you guys prefered.

Okay that's it, this was really fun to do and reminded me a lot of when I used to make video games :) let me know if there is any questions you guys need me to answer.
