import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsService } from 'src/app/shared/services/WordsService';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  val:any;
  limit:number;
  currentPlayerid:number;

  public word:string;
  public currentPlayer:string;
  public targetPlayer:string;
  public buttonText:string;

  constructor(private _route: ActivatedRoute, private _router : Router ,public wordsService : WordsService) {}

  ngOnInit() {
    this.buttonText = 'Suivant';

    this.val = JSON.parse(this._route.snapshot.queryParams.val);
    console.log(this.val);

    this.wordsService.GetWordFromTheme(this.val.theme).then(res => this.word = res);
    console.log(this.word);

    this.currentPlayer = this.val.players[0].name;
    this.targetPlayer = this.val.players[1].name;

    this.currentPlayerid = 0;
    this.limit = Object.keys(this.val.players).length;
  }

  Next(){
    console.log("Next Pressed");
    
    this.currentPlayerid++;

    
    if(this.currentPlayerid > this.limit -1){             
      this._router.navigate(['/devinetetemenu']);
    }

    this.currentPlayer = this.val.players[this.currentPlayerid].name;

    if(this.currentPlayerid < this.limit-1){      
      this.wordsService.GetWordFromTheme(this.val.theme).then(res => this.word = res);
      this.targetPlayer = this.val.players[this.currentPlayerid+1].name;
    }

    if(this.currentPlayerid == this.limit-1){      
      this.wordsService.GetWordFromTheme(this.val.theme).then(res => this.word = res);
      this.targetPlayer = this.val.players[0].name; 
      this.buttonText = 'Terminer';
    }

  }

  ToMenu(){
    this._router.navigate(['/devinetetemenu']);
  }
}
