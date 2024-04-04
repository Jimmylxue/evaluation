export type LaunchInfoType = {
  memberSource: "VX" | "ALI" | "TIK_TOK";
};

const launch: {
  info: LaunchInfoType | null;
} = {
  info: null,
};

function getDefaultMemberSource() {
  switch (process.env.TARO_ENV) {
    case "alipay":
      return "ALI";
    case "tt":
      return "TIK_TOK";
    default:
      return "VX";
  }
}

function getDefaultMemberSourceChannel() {
  switch (process.env.TARO_ENV) {
    case "alipay":
      return "ALI";
    case "tt":
      return "TIK_TOK";
    default:
      return "WX";
  }
}

export function getLaunchInfo() {
  const info = launch.info || {
    memberSource: getDefaultMemberSource(),
    memberSourceChannel: getDefaultMemberSourceChannel(),
  };
  return info as LaunchInfoType;
}
