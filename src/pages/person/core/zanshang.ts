import { makeAutoObservable } from "mobx";

class ZanShang {
  showZanShang: boolean = false;
  imgSrc: string =
    "https://image.jimmyxuexue.top/upload/1722324549712zanshang.jpg";

  constructor() {
    makeAutoObservable(this);
  }

  setZanShang = (status: boolean) => {
    this.showZanShang = status;
  };

  setZanShangImg = (imgSrc: string) => {
    this.imgSrc = imgSrc;
  };
}

export const zanShang = new ZanShang();
