import type { loader } from "../../shared/api/loader";
import { ArticlePreview } from "./ui/ArticlePreview";
import { useLoaderData } from "@remix-run/react/dist";
import { Tabs } from "shared/ui/Tabs";
import { PopularTags } from "shared/ui/PopularTags";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs />
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
