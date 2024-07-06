import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const token = ref(null);

  const count = ref(0);
  const defoult = ref(true);
  const bgcolor = ref(false);
  const open = ref(false);
  const brandopen = ref(false);
  const navbar = ref(false);
  const over = ref(false);
  const modalsearch = ref(false);
  const contactopen = ref(false);
  const contactopen2 = ref(false);
  const contactopen3 = ref(false);
  const contactopen4 = ref(false);
  const namechange = ref(false);
  const language = ref(false);
  const phone = ref("");
  const code = ref("");

  const cart =
    typeof window == "undefined"
      ? []
      : localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  const save =
    typeof window == "undefined"
      ? []
      : localStorage.getItem("save")
      ? JSON.parse(localStorage.getItem("save"))
      : [];
  return {
    cart,
    count,
    defoult,
    bgcolor,
    save,
    open,
    brandopen,
    navbar,
    over,
    modalsearch,
    contactopen,
    contactopen2,
    contactopen3,
    contactopen4,
    namechange,
    language,
    phone,
    code,
    token
  };
});
