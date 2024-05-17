<script setup>
const route = useRoute();

const links = [
  [
    {
      label: "Asosiy Sahifa",
      icon: "i-heroicons-home",
      to: "/",
    },
  ],
  [
    {
      label: "Instruktor",
      icon: "i-heroicons-chart-bar",
      to: "/instruktor",
    },
  ],
  [
    {
      label: "Xabar Yuborish",
      icon: "i-heroicons-command-line",
      to: "/all",
    },
  ],
];
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <slot />
  </div>
</template>

