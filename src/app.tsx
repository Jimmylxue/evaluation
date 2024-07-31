import "./app.scss";
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/float-layout.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/progress.scss";
import "taro-ui/dist/style/components/countdown.scss";
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/range.scss";
import "taro-ui/dist/style/components/curtain.scss";
import "taro-ui/dist/style/components/divider.scss";
import { ComposeProviders } from "./core/ComposeProviders";
import { ApiProvider } from "./api/ApiProvider";
import { useError } from "@tarojs/taro";

export default function App(props) {
  useError((error) => console.log("error~~", error));
  return (
    <ComposeProviders components={[ApiProvider]}>
      {props.children}
    </ComposeProviders>
  );
}
