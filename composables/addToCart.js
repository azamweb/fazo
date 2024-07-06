import { useStore } from "~/store/store";
export function addToCart(item) {
  const store = useStore();
  const product = store.cart.find((el) => el == item);
  if (product) {
    if (product.quantity < 5) {
      product.quantity += 1;
    } else {
      alert("you can only add 5 products");
    }
  } else {
    store.cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(store.cart));
}
