/*
  Run from the command line with: node <filename>.js
*/
const readline = require('readline');

class Blackjack {
  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.possibleCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    this.cardValueDict = {
      A: 11,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      J: 10,
      Q: 10,
      K: 10,
    }

    this.initGame();
  }

  initGame() {
    this.dealer = {
      cards: [],
      score: 0,
    };

    this.player = {
      cards: [],
      score: 0,
    };

    this.draw(this.player);

    const faceUpCard = this.draw(this.dealer);
    console.log(`The dealer has a ${faceUpCard} showing`);

    this.draw(this.player);

    this.draw(this.dealer);

    if (this.checkForBlackjack()) {
      console.log(`Blackjack! ${this.player.cards.join(' ')}`);
      this.endGame();
      return;
    }

    this.initPlayerTurn();
  }

  checkForBlackjack() {
    return this.player.score === 21;
  }

  initPlayerTurn() {
    console.log(`Your cards: ${this.player.cards.join(' ')}`);
    console.log(`Your score: ${this.player.score}`);

    if (this.player.score === 21) {
      console.log('21!\n');
      this.initDealerTurn();
      return;
    }

    if (this.player.score > 21) {
      console.log('You bust!\n');
      this.endGame();
      return;
    }

    this.hitOrStand();
  }

  hitOrStand() {
    this.readline.question('Would you like to hit or stand? h for hit, s for stand\n', (answer) => {
      const trimmedLowerCaseAnswer = answer.trim().toLowerCase();
      if (trimmedLowerCaseAnswer === 'h') {
        this.draw(this.player);
        this.initPlayerTurn();
      }
      else if (trimmedLowerCaseAnswer === 's')
        this.initDealerTurn();
      else {
        console.log('sorry, invalid input!');
        this.hitOrStand();
      }
    });
  }

  initDealerTurn() {
    console.log(`Dealer\'s hand: ${this.dealer.cards.join(' ')}`);
    console.log(`Dealer\'s score: ${this.dealer.score}`);

    if (this.dealer.score > 21) {
      console.log('Dealer busts!\n');
      this.endGame();
    }
    else if (this.dealer.score >= 17) {
      console.log('Dealer stands!\n');
      this.endGame();
    }
    else {
      console.log('Dealer hits!\n');
      this.draw(this.dealer);
      this.initDealerTurn();
    }
  }

  draw(person) {
    const card = this.possibleCards[Math.floor(Math.random() * 13)];
    person.cards.push(card);
    person.score += this.cardValueDict[card];

    if (person.score > 21 && card === 'A')
      person.score -= 10;

    return card;
  }

  endGame() {
    console.log(`Your final hand: ${this.player.cards.join(' ')}`);
    console.log(`Your final score: ${this.player.score}`);
    console.log(`Dealer\'s final hand: ${this.dealer.cards.join(' ')}`);
    console.log(`Dealer\'s final score: ${this.dealer.score}\n`);
    if (this.player.score <= 21 && this.player.score === this.dealer.score)
      console.log('It\'s a draw.');
    if (this.player.score > 21 ||
        this.dealer.score <= 21 && this.player.score < this.dealer.score)
      console.log('Dealer wins!');
    else
      console.log('You win!');
    this.playAgain();
  }

  playAgain() {
    this.readline.question('\nWould you like to play again? yes or no\n', (answer) => {
      const trimmedLowerCaseAnswer = answer.trim().toLowerCase();
      if (trimmedLowerCaseAnswer === 'yes')
        this.initGame();
      else if (trimmedLowerCaseAnswer === 'no')
        this.endProgram();
      else {
        console.log('sorry, invalid input!');
        this.playAgain();
      }
    });
  }

  endProgram() {
    console.log('Thanks for playing!\n');
    this.readline.close();
  }
}

new Blackjack;