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
