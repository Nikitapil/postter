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
      title="Who to follow"
      show-more-link="/trends/users"
    >
      <UserListItem
        v-for="item in whoToFollowItems"
        :key="item.id"
        :user="item"
      />
    </PreviewCard>
  </div>
</template>

<script setup lang="ts">
import PreviewCard from '~/components/PreviewCard/PreviewCard.vue';
import PreviewCardItem from '~/components/PreviewCard/PreviewCardItem.vue';
import SearchForm from '~/components/ui/SearchForm.vue';
import { IUser } from '~/types/auth-types';

const { posts, getTopPosts } = usePostsFeed();

// TODO get real data
const whoToFollowItems = ref<IUser[]>([
  {
    id: '1234',
    name: 'Joe',
    email: 'Joe@Joe.Joe',
    profileImage: 'https://loremflickr.com/200/200',
    username: 'Joe',
    about: '',
    createdAt: ''
  },
  {
    id: '2345',
    name: 'Joe',
    email: 'Joe@Joe.Joe',
    profileImage: 'https://loremflickr.com/200/200',
    username: 'Joe',
    about: '',
    createdAt: ''
  }
]);

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
  await getTopPosts({
    isInitial: true,
    limit: 3
  });
});
</script>
