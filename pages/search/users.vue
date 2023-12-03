<template>
  <div>
    <div class="md:hidden">
      <SearchForm
        :initial-value="$route.query.q"
        placeholder="Search users"
        @search="onSearch"
      />
    </div>

    <UserList
      :users="usersList"
      :loading="loading"
      @feed-end="loadMoreUsers"
    />
  </div>
</template>

<script setup lang="ts">
import SearchForm from '~/components/ui/SearchForm.vue';

const { usersList, getUsersList } = useUsersList();
const loading = ref(false);

const getSearchUsers = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  loading.value = true;
  await getUsersList({
    search: searchQuery as string,
    isInitial: true
  });
  loading.value = false;
};

const loadMoreUsers = async () => {
  const route = useRoute();
  const searchQuery = route.query.q || '';
  await getUsersList({
    search: searchQuery as string,
    isInitial: false
  });
};

const onSearch = async (query: string) => {
  const router = useRouter();
  await router.push({
    path: '/search/users',
    query: { q: query }
  });
};

onBeforeMount(async () => {
  await getSearchUsers();
});

watch(
  () => useRoute().fullPath,
  () => getSearchUsers()
);
</script>
