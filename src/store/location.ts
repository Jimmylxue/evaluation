import { post } from "@/api/client";
import { getLocation, openLocation } from "@/core/location";
import { makeAutoObservable } from "mobx";

type TAddressInfo = {
  country: string;
  province: string;
  city: string;
  district: string;
  /** 街道信息 */
  township: string;
  citycode: string;
  adcode: string;
  towncode: string;
  /**
   * 大致的地址信息
   */
  formatted_address: string;
};

class LocationInfo {
  /**
   * 纬度
   */
  private _latitude: number;
  /**
   * 经度
   */
  private _longitude: number;

  private _address: TAddressInfo;

  constructor() {
    makeAutoObservable(this);
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  get address() {
    return this._address;
  }

  /**
   * 更新当前定位
   */
  updateLocation() {
    getLocation(
      (res) => {
        this._latitude = res.latitude;
        this._longitude = res.longitude;
        this.transformIpToAddress();
      },
      () => {}
    );
  }

  /**
   * 逆地址解析 - 获取位置信息
   */
  async transformIpToAddress() {
    const res = await post("/location/getAddress", {
      latitude: this.latitude,
      longitude: this.longitude,
    });
    this._address = {
      country: res?.addressComponent?.country,
      province: res?.addressComponent?.province,
      city: res?.addressComponent?.city,
      district: res?.addressComponent?.district,
      township: res?.addressComponent?.township,
      citycode: res?.addressComponent?.citycode,
      adcode: res?.addressComponent?.adcode,
      towncode: res?.addressComponent?.towncode,
      formatted_address: res?.formatted_address,
    };
  }

  /**
   * 根据当前定位 - 打开地图
   */
  openNowLocationMap() {
    openLocation({
      longitude: this.longitude,
      latitude: this.latitude,
      scale: 16,
    });
  }
}

export const locationInfo = new LocationInfo();
