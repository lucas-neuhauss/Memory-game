I want to create a simple memory game in Svelte. It uses SvelteKit but this needs to be pre-rendered pages, no server. Everything on the client

What is a memory game:

A memory game consists of a grid of cards upside down. All cards have pairs, scrambled through the grid.
A player chooses 1 card, then chooses the second card. This turns the cards upside up.
If the cards match, are a pair, the cards are removed, the player gets a point, and gets to play again.
If the cards do not match, the next player gets to play.
The game ends when all the cards are removed from the grid.
The player with most cards win. Draws can happen.

MVP:

1. Home page should have:
   1. Start button
   2. Number of players. 1 - 4
      1. Should be able to input player names
   3. Grid size. Should be able to change both x and y values. Let's add a max of 6 on each direction, and by default it should be 3 x 5
   4. Theme selector. We must have 3 themes: Dinossaur, dogs and super heroes. Each theme should have enough cards to fill the max grid size. But the user can choose more than 1 theme. In this case, the themes are splitted evenly (or close enough) between the grid.
2. The game state should be persisted in the browser. If the user closes the browser with a game in the middle, he should be able to pick it up.
3. If a game is in progress, there must be a button to go stop the game and go back to the menu.
4. We should be able to see the score of each player during the game.
