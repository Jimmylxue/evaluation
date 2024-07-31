import { action, makeAutoObservable, observable } from "mobx";

class ZanShang {
  @observable showZanShang: boolean = false;
  @observable imgSrc: string =
    "https://image.jimmyxuexue.top/upload/1722324549712zanshang.jpg";

  constructor() {
    makeAutoObservable(this);
  }

  @action setZanShang = (status: boolean) => {
    this.showZanShang = status;
  };

  @action setZanShangImg = (imgSrc: string) => {
    this.imgSrc = imgSrc;
  };
}

export const zanShang = new ZanShang();
