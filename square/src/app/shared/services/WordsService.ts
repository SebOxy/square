import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
})


export class WordsService {

    public async GetWordFromTheme(theme: any) : Promise<string>  {        
        var word;
        var content = await this.GetFile(theme).then(res => {
            word =  this.RandomizeWord(res);
        });
        return word;
    }

    constructor(protected httpClient: HttpClient){}

    public GetAllFiles(){
        var words = new Array<String>();
        var result;
        this.httpClient.get('../assets/files/easywords.txt')
                        .subscribe(text=> {
                            result = text;
                        });
    }

    public async GetFile(file:string): Promise<string>{
        var result;
        result = await this.httpClient.get('../assets/files/'+file+'words.txt')
                        .toPromise();
        return JSON.stringify(result);
    }

    public RandomizeWord(words: string){
        var arr = JSON.parse(words);
        var limit = Object.keys(arr).length;
        return arr[this.getRandomInt(limit-1)]
        debugger;
        return "toto";
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

} 