<template>
  <div class="flex flex-column" style="height: 100vh">
    <header
      class="flex justify-content-between border-3-bottom p-1"
      style="
        background-color: var(--secondary-color);
        color: var(--base-color);
        border-bottom: 1px solid #08d9d6;
      "
    >
      <div class="flex align-items-center">
        <Image src="/logo.png" alt="logo" width="25" class="logo" />
        <p class="text-sm" style="color: #08d9d6">My plans</p>
      </div>
      <div class="flex align-items-center" v-if="users.usersData.length > 0">
        <Avatar
          :image="
            'https://api.dicebear.com/7.x/' +
            users.usersData[0].avatarStyle +
            '/svg?seed=' +
            users.usersData[0].avatarName
          "
          class="mr-2"
          shape="circle"
        />
        <p class="text-sm">
          {{ users.usersData.length > 0 ? users.usersData[0].name : "" }}
        </p>
        <Button
          style="color: var(--accent-color)"
          text
          icon="pi pi-cog"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
          <template #submenuheader="{ item }">
            <span class="font-bold" style="color: #08d9d6">{{
              item.label
            }}</span>
            <hr />
          </template>
          <template #item="{ item, props }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
              <span :class="item.icon" style="color: var(--accent-color)" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </header>
    <div class="flex" style="flex: 1">
      <nav
        class="w-3"
        style="
          background-color: var(--secondary-color);
          color: var(--base-color);
        "
      >
        teste
      </nav>
      <main style="background-color: var(--base-color)" class="w-9">teste</main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UsersStore } from "~/store/users_store";

const users = UsersStore();
await users.getUsersData();

const menu = ref();
const items = ref([
  {
    label: "Configurações",
    items: [
      {
        label: "Editar",
        icon: "pi pi-pencil",
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style></style>
