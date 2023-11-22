export const usersStore = defineStore("users", {
  state: () => ({
    isLogged: false,
  }),
  actions: {
    async checkLogin() {
      //Lógica para buscar o token no local storage
      const hasToken = true;
      if (hasToken) {
        this.isLogged = true;
      }
    },
  },
});
