import { MetaFunction } from "@remix-run/react/dist";
import { FeedPage } from "../../pages/feed/FeedPage";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
