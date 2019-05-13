import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  currency : any;
  dataCurrency = "USD"
  allCurrency: any;
  nation: any;
  show = [];
  name: string;

  constructor(private _httpService: HttpService) { }

  ngOnInit(){
    this.getUSD()
  }

  getUSD(){
    let tempObservable = this._httpService.getPriceUSD();
    tempObservable.subscribe(data => {
      console.log(data);
      this.currency = data;
    })
  }

  getData(){
    console.log(this.dataCurrency);
    if(this.dataCurrency != "USD"){
      if(this.dataCurrency == "Others"){
        let tempObservable = this._httpService.getAllCurrency();
        tempObservable.subscribe(data => {
          this.allCurrency = data["currencies"];
        })
      }
      else{
        this.name = "";
        let tempObservable = this._httpService.getPrice(this.dataCurrency);
        tempObservable.subscribe(data => {
          this.currency = data;
          console.log(this.currency);
        })
      }
    }
    if(this.dataCurrency == "USD"){
      this.name = "";
      this.getUSD();
    }
  }

  find(){
    console.log("-".repeat(50));
    this.show = [];
    for(let x =0; x < this.allCurrency.data.length; x++){
      if(this.nation != ""){
        if(this.allCurrency.data[x].id.substr(0, this.nation.length) == this.nation.toUpperCase() ){
          console.log(this.allCurrency.data[x])
          this.show.push(this.allCurrency.data[x])
        }
      }
    }
  }

  findCurrency(id, name){
    console.log(id);
    this.nation = id;
    this.dataCurrency = this.nation;
    this.allCurrency = "";
    this.getData();
    this.name = name;
  }
}
