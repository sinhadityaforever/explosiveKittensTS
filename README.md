# Exploding Kittens

# Description:

Exploding Kittens game built using Node.js, React.js, Express.js, Redis, and Typescript.
The design in minimal, and more effort is given to the functionality of the game.

# Rules:

After a user successfully logs-in/ signs-up, they will be given 5 random cards from which they can select any one card at a time.

-> If the card drawn from the deck is a cat card, then the user can go for the next card.<br />
-> If the card is exploding kitten (bomb) then the player loses the game.<br />
-> If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.<br />
-> If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.<br />

The user will win if all the 5 cards have been drawn.

# Initial Setup and Prerequisite:

1. Redis should be up and running on default PORT (6379).
2. ts-node should be installed globally.
3. Clone the repo/Extract the code, and install all the dependencies inside the server and client folder. (Use "npm i" or "yarn install" depending on your package manager)

# Running the game

1. Open a terminal, go inside the server folder.
2. Run the server using "npm start". This will start the server on PORT 3001
3. Open another terminal and navigate inside client folder.
4. Run "npm start".
5. Open any browser and hit http://localhost:3000
