import "./app.scss";
import { queryConfig } from "@/api/react-query";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/button.scss";

export default function App(props) {
  const { QueryClientProvider, queryClient } = queryConfig();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {props.children}
    </QueryClientProvider>
  );
}
