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
  CurrentTab: string = "Abilities";
  ready: boolean = false;
  champions: Champion[] = [];
  isInfoShown: boolean = false;
  SelectedChampion: string;
  SelectedChampionInfo: FullChampion;
  SelectedChampionSplash: string = "url('../assets/background.jpg')";
  SelectedChampionLoading: string;
  Level: number = 1;
  LoreShown: boolean;
  StatNames: string[] =["Hp","Mp","Armor","Spellblock","HpRegen","MpRegen","AtkDamage","AtkSpeed"];
  Stats: number[];
  Skins: string[];
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
  getSplashImage(index = 0){
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.SelectedChampionInfo.id + "_" + index  +".jpg";
  }
  getLoadingImage(index = 0){
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + this.SelectedChampionInfo.id + "_" + index  +".jpg";
  }
  getPassiveImage():string{
    return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/" + this.SelectedChampionInfo.passive.image.full;
  }
  getSpellImage(spell):string{
    return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + spell;
  }
  setLoadingImage(index = 0){
    this.SelectedChampionLoading = this.getLoadingImage(index);
  }
  setSplashImage(index = 0){
    this.SelectedChampionSplash = this.getSplashImage(index);
  }
  setSkin(index = 0){
    this.setSplashImage(index);
    this.setLoadingImage(index);
  }
  async ChampionSelected(event){
    this.Level = 1;
    this.CurrentTab = "Abilities";
    this.LoreShown = false;
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
    this.SetStats();
    await this.setSplashImage();
    await this.setLoadingImage();
    if (!this.isInfoShown){
    this.isInfoShown = true;
    }
  }
  SetStats(){
    this.Stats = Object.values(this.SelectedChampionInfo.stats);
    this.Stats.splice(4,1);
    this.Stats.splice(8,1);
    this.Stats.splice(12,2);
  }
  async ChangeTab(event){
    this.CurrentTab = event.target.innerHTML;
  }


}
