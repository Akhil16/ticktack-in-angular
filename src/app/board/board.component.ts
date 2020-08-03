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
  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  public newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsnext = true;
    this.play = true;
    this.boardCount = 0;
  }

  get player() {
    return this.xIsnext ? 'X' : 'O';
  }

  public makeMove(boxId: number) {
    this.boardCount++;
    if (!this.squares[boxId] && this.play === true) {
      this.squares.splice(boxId, 1, this.player);
      this.xIsnext = !this.xIsnext;
    }
    this.winner = this.calculateWinner();
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
    // lines.forEach(line => {
    //   const [a, b, c] = line;
    //   if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
    //     return this.squares[a];
    //   }
    // });
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
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
