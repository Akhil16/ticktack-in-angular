import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any = [];
  xIsnext: boolean;
  play: boolean;
  winner: string;
  boardCount: number;
  vsComputer = false;
  scores: { X: number; O: number; tie: number; };
  constructor() { }

  ngOnInit() {

    this.scores = {
      X: 1,
      O: -1,
      tie: 0
    };
    this.newGame();
  }

  public newGame(vsComp?: boolean) {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsnext = true;
    this.play = true;
    this.boardCount = 0;
    this.vsComputer = vsComp;
    if (Math.floor(Math.random() * 10) % 2 === 0 && vsComp) {
      this.compMove();
    }
  }

  get player() {
    return this.xIsnext ? 'X' : 'O';
  }

  public makeMove(boxId: number) {
    if (!this.squares[boxId] && this.play === true) {
      this.boardCount++;
      this.squares.splice(boxId, 1, this.player);
      this.xIsnext = !this.xIsnext;
      this.winner = this.calculateWinner();
      if (this.vsComputer) {
        this.play = false;
        if (this.winner === null) {
          this.compMove();
        }
      }

    }
  }

  compMove() {
    this.boardCount++;
    const num = this.bestMove();

    // do {
    //   num = Math.floor(Math.random() * this.squares.length);

    // } while (this.squares[num] !== null);
    // console.log(num);
    console.log(num);
    setTimeout(() => {
      this.squares.splice(num, 1, this.player);
      this.xIsnext = !this.xIsnext;
      this.winner = this.calculateWinner();
      this.play = true;
    }, 300);
  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const i of lines) {
      const [a, b, c] = i;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.play = false;
        return this.squares[a];
      }
    }
    return null;
  }


  bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < this.squares.length; i++) {
      // Is the spot available?
      if (this.squares[i] === null) {
        this.squares[i] = 'X';
        const score = this.minimax(this.squares, 0, false);
        this.squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }


  minimax(board, depth, isMaximizing) {
    // return 1;
    const winner = this.calculateWinner();
    if (winner !== null ) {
      return this.scores[winner];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        // Is the spot available?
        if (board[i] === null) {
          board[i] = 'O';
          const score = this.minimax(board, depth + 1, false);
          board[i] = null;
          // console.log(score, i, board);
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        // Is the spot available?
        if (board[i] === null) {
          board[i] = 'X';
          const score = this.minimax(board, depth + 1, true);
          board[i] = null;
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }
      return bestScore;
    }
  }

}
