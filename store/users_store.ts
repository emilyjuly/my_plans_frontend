import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    // Outros cabeçalhos comuns, se necessário
  },
});

export const UsersStore = defineStore("users", {
  state: () => ({ usersData: "" }),
  actions: {
    async getUsersData() {
      try {
        const { data } = await api.get("/users/getAll");
        const result = await Promise.all(
          data.map(async (i) => {
            const avatar = await api.get(`/avatars/getOne/${i.avatar_id}`);
            return {
              avatarName: avatar.data.name,
              avatarStyle: avatar.data.style,
              email: i.email,
              name: i.name,
            };
          })
        );
        this.usersData = result;
        return result;
      } catch (error) {
        return error;
      }
    },
  },
});
