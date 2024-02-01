"use client";

import ArticleItem from "@/components/ArticleItem";
import { useArticles } from "@/hooks/useArticles";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react"; // Import Chakra UI components


export default function Home() {
  const { articles, getArticles } = useArticles()

 

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

  return (
    <>
    <Text fontSize={'4xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'} textAlign={'center'} marginTop={'10px'}>Mwangangi Articles</Text>
    <Flex gap={4} width={'85vw'} flexDir={'column'} align={'center'} margin={'auto'}>
      
        {articles.map((article: any, key: number) => (
          <ArticleItem key={key} article={article} />
        ))}
    </Flex>|
    </>
    
    
  )
}
