'use client';

import { useArticles } from '@/hooks/useArticles';
import { useSupabase } from '@/hooks/useSupabase';
import { useEffect, useState } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

export type Article = {
  id: number;
  created_at?: string;
  title: string;
  votes?: any[];
}

export default function ArticleItem({
  article: {
    id,
    title,
    votes
  }
}: {
  article: Article
}) {
  const { user, getCurrentUser } = useSupabase();
  const { newVote } = useArticles()

  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser();
  }, [])

  useEffect(() => {
    if (user) {
      const { id } = user;
      const findVote = votes?.find(v => v.user_id === id);
      if (findVote) setHasVoted(true)
    }
  }, [user])

  return (
    <Flex
      borderWidth="1px"
      borderRadius="md"
      p={3}
      align="center"
      justify="space-between"
      cursor="pointer"
      width={'100%'}
    >
      <Text>{title}</Text>
      <Flex gridGap={1} color={hasVoted ? 'rose.700' : 'white'}>
        <IconButton
          icon={<ArrowUpIcon />}
          aria-label="Upvote"
          onClick={() => newVote(id)}
        />
        <Text>{votes?.length} votes</Text>
        <IconButton
          icon={<ArrowUpIcon transform="rotate(180deg)" />}
          aria-label="Downvote"
          onClick={() => newVote(id, true)}
        />
      </Flex>
    </Flex>
  );
}