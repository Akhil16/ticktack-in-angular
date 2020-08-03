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
  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  public newGame(vsComp?: boolean) {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsnext = true;
    this.play = true;
    this.boardCount = 0;
    this.vsComputer = vsComp;
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
    let num = 0;
    do {
      num = Math.floor(Math.random() * this.squares.length);

    } while (this.squares[num] !== null);
    console.log(num);

    setTimeout(() => {
      this.squares.splice(num, 1, this.player);
      this.xIsnext = !this.xIsnext;
      this.play = true;
      this.winner = this.calculateWinner();
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

}
