import React from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import SearchPage from "../../components/SearchPage";
import styles from "../../styles/Home.module.css";

function Search(props) {
  const page = 1;

  return (
    <div className="bg-zinc-800">
      <MainLayout>
        <div className={styles.search_items}>
          <SearchPage query={props.query} apiKey={props.apiKey} page={page} />
          <SearchPage
            query={props.query}
            apiKey={props.apiKey}
            page={page + 1}
          />
        </div>
      </MainLayout>
    </div>
  );
}

export default Search;

export async function getStaticProps(context) {
  const query = context.params.query;
  const api_key = process.env.TMDB_API_KEY;
  return {
    props: {
      apiKey: api_key,
      query: query.slice(6, query.length),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
