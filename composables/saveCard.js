import { useStore } from "~/store/store";
export function saveCard(item) {
  const store = useStore();
  const product = store.save.find((el) => el == item);
  if (product) {
    if (product.length < 1) {
      product.length += 1;
    } else {
      alert("you can only save 1 product ");
    }
  } else {
    store.save.push(item);
  }
  localStorage.setItem("save", JSON.stringify(store.save));
}