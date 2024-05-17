<template>
  <div v-if="!pageConfig.isLoading">
    <UTable :rows="drivers" :columns="columns" />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>
<script setup>
let pageConfig = reactive({
  isLoading: true,
});

let drivers = ref(null);

const columns = [
  {
    key: "type",
    label: "Type",
  },
  {
    key: "category",
    label: "Kategoriya",
  },
  {
    key: "male",
    label: "Jinsi",
  },
  {
    key: "staj",
    label: "Staj",
  },
  {
    key: "fullName",
    label: "To'liq Ismi",
  },
  {
    key: "someDetails",
    label: "Batafsil",
  },
  {
    label: "Ma'lumotlar",
    key: "_id",
  },
];

onMounted(async () => {
  drivers.value = await $fetch("http://172.17.77.253:3001/drivers", {
    method: "GET",
  });
  pageConfig.isLoading = false;
});
</script>