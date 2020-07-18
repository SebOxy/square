import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  public form : FormGroup;

  constructor(private _formBuilder: FormBuilder, private _router: Router, public alertController: AlertController) { 
    this.form = this._formBuilder.group({
      theme: ['', Validators.required],
      players: this._formBuilder.array([
        this.initPlayerFields()
      ])
    });
  }

  ngOnInit() {
  }

  initPlayerFields(): FormGroup{
    return this._formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addNewInputField(){
    const control = <FormArray>this.form.controls.players;
    control.push(this.initPlayerFields());
  }

  removeInputField(i: number){
    const control = <FormArray>this.form.controls.players;
    control.removeAt(i);
  }

  manage(val : any){
    console.dir(val);
    
    var success = true;

    if(val.players.length == 1){
      success = false;
      this.presentAlert("Nombre de joueur insuffisant !");
    }

    if(val.theme == ""){
      success = false;
      this.presentAlert("Choisir un thème !");
    }

    var i = 0;
    val.players.forEach(player => {
      i++;
      if(player.name == ""){        
        success = false;
        this.presentAlert("Le nom du joueur "+i+" est vide");
      }
    });

    if(success){
      let navigationExtras: NavigationExtras = {
        queryParams: {
            val : JSON.stringify(val)
        }
      };
      this._router.navigate(['/devinetetegame'], navigationExtras);
    }

   }

   async presentAlert(errorMessage: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      message: errorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
}
