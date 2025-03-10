import Taro from "@tarojs/taro";

export async function uploadFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: "https://api.jimmyxuexue.top/upload",
      filePath: file,
      name: "file",
      formData: {},
      success(res: any) {
        try {
          console.log("res", res);
          resolve(res.data);
        } catch (error) {
          reject(new Error("Upload failed"));
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}
