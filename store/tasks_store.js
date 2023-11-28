import axios from "axios";

const api = axios.create({
  // baseURL: "https://my-plans-backend.onrender.com",
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const TasksStore = defineStore("tasks", {
  state: () => ({ tasks: "" }),
  actions: {
    async addTask(name) {
      try {
        const body = {
          name,
          status_id: 2,
          priority_id: 2,
        };

        const createdTask = await api.post("/tasks/create", body);

        await this.getTasks();

        return createdTask;
      } catch (error) {
        return error;
      }
    },

    async getTasks() {
      try {
        const { data } = await api.get("/tasks/getAll");
        const result = await Promise.all(
          data.map(async (i) => {
            const priority = await api.get(`/priority/getOne/${i.priority_id}`);
            const status = await api.get(`/status/getOne/${i.status_id}`);
            return {
              name: i.name,
              description: i.description,
              duration: i.duration,
              priority: priority.data.name,
              priority_color: priority.data.color,
              status: status.data.name,
            };
          })
        );
        this.tasks = result;
        return result;
      } catch (error) {
        return error;
      }
    },
  },
});
