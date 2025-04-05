import create from "zustand";

// Safely read localStorage (for Next.js SSR)
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    if (stored) return JSON.parse(stored);
  }
  return { pizzas: [], tables: null };
};

export const useStore = create((set) => ({
  cart: getInitialCart(),

  // Add a pizza
  addPizza: (pizza) =>
    set((state) => {
      const updatedPizzas = [...state.cart.pizzas, pizza];
      const updatedCart = { ...state.cart, pizzas: updatedPizzas };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Remove pizza by index
  removePizza: (index) =>
    set((state) => {
      const updatedPizzas = state.cart.pizzas.filter((_, i) => i !== index);
      const updatedCart = { ...state.cart, pizzas: updatedPizzas };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Set selected table
  addTable: (tableNumber) =>
    set((state) => {
      const updatedCart = { ...state.cart, tables: tableNumber };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Clear everything (optional: after order complete)
  clearCart: () =>
    set(() => {
      const cleared = { pizzas: [], tables: null };
      localStorage.setItem("cart", JSON.stringify(cleared));
      return { cart: cleared };
    }),

    updatePizzas: (newPizzas) =>
        set((state) => {
          const updatedCart = { ...state.cart, pizzas: newPizzas };
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return { cart: updatedCart };
        }),
      
}));
