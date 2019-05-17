import { Component } from '@angular/core';
import { Champion, FullChampion } from 'src/Interfaces';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){ }
  ngOnInit(){
    this.getChampions().then(info=>{

      for (let item in info.data){
        this.champions.push(info.data[item])
      }
      console.log(this.champions);
      this.ready = true;
      this.champions.sort()
    });
  }

  ready: boolean = false;
  champions: Champion[] = [];
  isInfoShown: boolean = false;
  SelectedChampion: string;
  SelectedChampionInfo: FullChampion;
  SelectedChampionSplash: string = "url('../assets/background.jpg')";
  SelectedChampionLoading: string;
  InfoIsReady(){
    console.log(this.SelectedChampionInfo);
    if(this.SelectedChampionInfo == undefined){
      return false;
    }
    return true;
  }

  async getChampions():Promise<any>{
    return await this.http.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json").toPromise();
  }

  async getChampion(champion):Promise<any>{
    return await this.http.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/" + champion + ".json").toPromise();
  }

  getPortraitImage(champion):string{
    return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/" + champion;
  }

  getSplashImage(){
    this.SelectedChampionSplash = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.SelectedChampionInfo.id + "_0.jpg";
  }

  getLoadingImage(){
    this.SelectedChampionLoading = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + this.SelectedChampionInfo.id + "_0.jpg";
  }
  getPassiveImage():string{
    return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/" + this.SelectedChampionInfo.passive.image.full;
  }
  getSpellImage(spell):string{
    return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + spell;
  }

  async ChampionSelected(event){
    this.SelectedChampion = event.target.title;
    if (this.isInfoShown){
      this.isInfoShown = false;
    }
    await this.getChampion(this.SelectedChampion).then((info)=>{
    for (let item in info.data){
      this.SelectedChampionInfo = info.data[item];
    }
    console.log(this.SelectedChampionInfo)
    })
    await this.getSplashImage();
    await this.getLoadingImage();
    if (!this.isInfoShown){
    this.isInfoShown = true;
    }
  }


}
