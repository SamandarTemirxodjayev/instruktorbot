<template>
  <div v-if="!pageConfig.isLoading">
    <UModal v-model="handleAddInstruktor" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Instruktor Qo'shish
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="() => (handleAddInstruktor = false)"
            />
          </div>
        </template>

        <UForm @submit="handleAddInstruktorAPI">
          <UFormGroup label="Instruktor To'liq Ismi" required size="2xl">
            <UInput v-model="driver.fullName" size="xl" />
          </UFormGroup>
          <UFormGroup label="Yo'lanish" required size="2xl">
            <USelect
              v-model="driver.type"
              size="xl"
              :options="[
                {
                  name: '📚 Imtihonga Tayyorlanish',
                  value: 'exam',
                },
                {
                  name: '🛞 Haydashni O\'rganish',
                  value: 'learn',
                },
              ]"
              option-attribute="name"
            />
          </UFormGroup>
          <UFormGroup label="Kategoriya" required size="2xl">
            <USelect
              v-model="driver.category"
              size="xl"
              :options="['A', 'B', 'C', 'D', 'E']"
              option-attribute="name"
            />
          </UFormGroup>
          <UFormGroup label="Instruktor Jinsi" required size="2xl">
            <USelect
              v-model="driver.male"
              size="xl"
              :options="['Ayol', 'Erkak']"
              option-attribute="name"
            />
          </UFormGroup>
          <UFormGroup label="Instruktor Staji" required size="2xl">
            <UInput v-model="driver.staj" type="number" size="xl" min="0" />
          </UFormGroup>
          <UFormGroup label="Instruktor Haqida" required size="2xl">
            <UTextarea v-model="driver.someDetails" size="xl" />
          </UFormGroup>
          <UFormGroup class="my-2" required size="2xl">
            <UButton type="submit" size="xl" block> Tasdiqlash </UButton>
          </UFormGroup>
        </UForm>
      </UCard>
    </UModal>
    <div class="m-4 flex justify-end">
      <UButton @click="() => (handleAddInstruktor = true)">
        Instruktor Qo'shish
      </UButton>
    </div>
    <UTable :rows="drivers" :columns="columns">
      <template #_id-data="{ row }">
        <UButton @click="handleDelete(row._id)">O'chirish</UButton>
      </template>
    </UTable>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>
<script setup>
let handleAddInstruktor = ref(false);
let pageConfig = reactive({
  isLoading: true,
});

let drivers = ref(null);
let driver = reactive({
  fullName: "",
  type: "exam",
  category: "A",
  male: "Erkak",
  staj: 1,
  someDetails: "",
});
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
  drivers.value = await $fetch("http://79.133.181.82:3001/drivers", {
    method: "GET",
  });
  pageConfig.isLoading = false;
});

const handleAddInstruktorAPI = async () => {
  try {
    await $fetch("http://79.133.181.82:3001/drivers", {
      method: "POST",
      body: driver,
    });
    handleAddInstruktor.value = false;
    window.location.reload();
  } catch (error) {}
};
const handleDelete = async (id) => {
  try {
    await $fetch("http://79.133.181.82:3001/drivers/" + id, {
      method: "DELETE",
    });
    handleAddInstruktor.value = false;
    window.location.reload();
  } catch (error) {}
};
</script>