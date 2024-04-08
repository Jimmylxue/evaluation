/**
 * 这个暂时还没有使用 这个是支付宝小程序的上传工具
 */
const { minidev } = require("minidev");
const { get } = require("https");
const fs = require("fs");

const argv = require("minimist")(process.argv.slice(2));

async function preview() {
  if (!argv.appid) {
    throw new Error("请提供小程序appid");
  }

  const { qrcodeUrl } = await minidev.preview({
    appId: argv.appid,
    project: `./dist`,
  });

  get(qrcodeUrl, (r) => {
    const findLocation = (rawHeaders) => {
      for (let i = 0; i < rawHeaders.length; ++i) {
        if (rawHeaders[i].toLowerCase() === "location") {
          return rawHeaders[i + 1];
        }
      }
    };
    get(findLocation(r.rawHeaders), (res) => {
      let imgData = "";
      res.setEncoding("binary");
      res.on("data", (chunk) => {
        imgData += chunk;
      });
      res.on("end", () => {
        fs.writeFile(
          argv.imgPath,
          imgData,
          {
            encoding: "binary",
            flag: "a",
          },
          (err) => {
            if (err) {
              console.log(err);
              console.log("预览图片: ", qrcodeUrl, ",下载失败！");
            }
          }
        );
      });
    });
  });
}

preview();
