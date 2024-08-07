export let tempImgFile: { [key in string]: string } = {};

export function updateTempImgFile(imgFileList: { [key in string]: string }) {
  tempImgFile = imgFileList;
}
