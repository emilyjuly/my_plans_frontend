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
        <Image src="/logo.png" alt="logo" width="35" class="logo" />
        <p class="text-base font-bold" style="color: #08d9d6">My plans</p>
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
        <div
          @click="navigationSelected = true"
          class="flex p-2 justify-content-between cursor-pointer"
          :style="{
            backgroundColor: navigationSelected
              ? 'var(--accent-color)'
              : 'var(--secondary-color)',
          }"
        >
          <div class="flex align-items-center">
            <i
              :style="{
                color: navigationSelected
                  ? 'var(--base-color)'
                  : 'var(--accent-color)',
              }"
              class="pi pi-list pr-2 font-bold"
            />
            <p
              class="text-base font-bold"
              :style="{
                color: navigationSelected
                  ? 'var(--base-color)'
                  : 'var(--accent-color)',
              }"
            >
              Tarefas
            </p>
          </div>
          <div>
            <p
              class="font-bold"
              :style="{
                color: navigationSelected
                  ? 'var(--base-color)'
                  : 'var(--accent-color)',
              }"
            >
              {{ tasks.length }}
            </p>
          </div>
        </div>
      </nav>
      <main style="background-color: var(--base-color)" class="w-9 p-3">
        <div class="flex flex-column">
          <p class="text-lg font-medium">Tarefas ({{ tasks.length }})</p>
        </div>
        <div class="flex justify-content-between">
          <InputText
            type="text"
            v-model="task"
            class="w-11 border-noround"
            placeholder="Digite aqui a sua tarefa"
            style="border: none"
          />
          <Button
            icon="pi pi-plus"
            style="background-color: #08d9d6; border: none"
            class="border-noround"
            @click="
              tasksStore.addTask(task);
              task = '';
            "
          />
        </div>
        <div
          class="flex justify-content-between mt-3 p-3 w-11"
          style="background-color: white"
          v-for="task in tasksStore.tasks"
          :key="task.id"
        >
          <div class="flex justify-content-between">
            <Checkbox v-model="checked" :binary="true" class="mr-3" />
            {{ task.name }}
          </div>
          <div class="flex">
            <i
              class="pi pi-flag-fill"
              :style="{ color: task.priority_color }"
              v-tooltip.bottom="{ value: `Prioridade ${task.priority}` }"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { TasksStore } from "~/store/tasks_store";
import { ref } from "vue";
import { UsersStore } from "~/store/users_store";

const users = UsersStore();
const tasksStore = TasksStore();
const tasks = await tasksStore.getTasks();
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

const navigationSelected = ref(false);

const task = ref(null);

const checked = ref(false);
</script>
