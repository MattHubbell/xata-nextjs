import { getXataClient } from '../xata';

const xata = getXataClient();

export default async function Home({ searchParams }: { searchParams: { q: string } }) {
  let posts = null;
  if (searchParams.q) {
    const { records } = await xata.db.Posts.search(searchParams.q, { fuzziness: 2 });
    posts = records;
  } else {
    posts = await xata.db.Posts.getAll();
  }

  return (
    <>
      <div className="w-full max-w-5xl mt-16">
        <form>
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Search..."
            className="w-full rounded-lg p-2 dark:text-purple-950"
          />
        </form>
      </div>
      <div className="w-full max-w-5xl mt-16">
        {posts.length === 0 && <p>No blog posts found</p>}
        {posts.map((post) => (
          <div key={post.id} className="mb-16">
            <p className="text-xs mb-2 text-purple-950 dark:text-purple-200">{post.pubDate?.toDateString()}</p>
            <h2 className="text-2xl mb-2">
              <a href={`posts/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="text-purple-950 dark:text-purple-200 mb-5">{post.description}</p>
            <a
              href={`posts/${post.slug}`}
              className="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
            >
              Read more &rarr;
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
