<template>
  <div class="flex flex-col">
    <SearchForm @search="handleSearch" />

    <PreviewCard
      v-if="posts.length"
      title="Top posts"
      show-more-link="/trends/posts"
    >
      <PreviewCardItem
        v-for="post in posts"
        :key="post.id"
      >
        <NuxtLink
          :to="`/status/${post.id}`"
          class="block"
        >
          <h2
            class="font-bold text-gray-800 text-md dark:text-white max-w-xs text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {{ post.text }}
          </h2>
          <p class="text-xs text-gray-400">{{ post.likesCount }} likes</p>
        </NuxtLink>
      </PreviewCardItem>
    </PreviewCard>

    <PreviewCard
      v-if="usersList.length"
      title="Who to follow"
      show-more-link="/trends/users"
    >
      <UserListItem
        v-for="user in usersList"
        :key="user.id"
        :user="user"
      />
    </PreviewCard>
  </div>
</template>

<script setup lang="ts">
import PreviewCard from '~/components/PreviewCard/PreviewCard.vue';
import PreviewCardItem from '~/components/PreviewCard/PreviewCardItem.vue';
import SearchForm from '~/components/ui/SearchForm.vue';

const { posts, getTopPosts } = usePostsFeed();
const { usersList, getUsersList } = useUsersList();

const handleSearch = (search: string) => {
  const router = useRouter();
  router.push({
    path: '/search',
    query: {
      q: search
    }
  });
};

onMounted(async () => {
  const request = {
    isInitial: true,
    limit: 3
  };

  await getTopPosts(request);
  await getUsersList(request);
});
</script>
