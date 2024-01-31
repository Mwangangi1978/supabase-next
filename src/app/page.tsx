"use client";

import ArticleItem from "@/components/ArticleItem";
import { useArticles } from "@/hooks/useArticles";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Grid, Container } from "@chakra-ui/react"; // Import Chakra UI components


export default function Home() {
  /* const { articles, getArticles } = useArticles()

 

  const subscribedChannel = supabase
    .channel('articles-follow-up')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes'
    }, async (payload: any) => {
      await getArticles()
    })
    .subscribe();

  useEffect(() => {
    getArticles()
  }, []);
 */
  return (
    <>
    {/* <Container maxW="container.xl" mt={8}>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {articles.map((article: any, key: number) => (
          <ArticleItem key={key} article={article} />
        ))}
      </Grid>
    </Container> */}
    <div>Logged in</div>
    </>
  )
}
