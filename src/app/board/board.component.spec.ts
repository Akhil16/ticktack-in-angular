import { TestBed } from '@angular/core/testing';
import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BoardComponent } from './board.component';


describe('BoardComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(BoardComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #player', async () => {

    const player = component.player;

  });

  it('should run #ngOnInit()', async () => {
    component.newGame = jest.fn();
    component.ngOnInit();
    expect(component.newGame).toHaveBeenCalled();
  });

  it('should run #newGame()', async () => {
    component.compMove = jest.fn();
    component.newGame(true);
    expect(component.compMove).toHaveBeenCalled();
  });

  it('should run #makeMove()', async () => {
    component.squares = component.squares || Array(9).fill(null);
    component.play = component.play || true;
    component.squares.splice = jest.fn();
    component.calculateWinner = jest.fn();
    component.compMove = jest.fn();
    component.makeMove(1);
    expect(component.squares.splice).toHaveBeenCalled();
  });

  it('should run #compMove()', async () => {
    component.bestMove = jest.fn();
    component.squares = component.squares || {};
    component.squares.splice = jest.fn();
    component.calculateWinner = jest.fn();
    component.compMove();
    expect(component.bestMove).toHaveBeenCalled();
  });


});
