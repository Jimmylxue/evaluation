import "./app.scss";
import { queryConfig } from "@/api/react-query";

export default function App(props) {
  const { QueryClientProvider, queryClient } = queryConfig();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {props.children}
    </QueryClientProvider>
  );
}
