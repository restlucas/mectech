import { create } from "zustand";

type OrderForm = {
  orderName: string;
  serviceDescription: string;
  items: { name: string; quantity: string }[] | [];
  materials: { name: string; quantity: string }[] | [];
  observationsOrInstructions: string;
};

type OrderStore = {
  order: OrderForm;
  updateOrder: (field: string, value: string) => void;
  addItemToOrder: (
    type: "items" | "materials",
    newItem: { name: string; quantity: string }
  ) => void;
  removeItemFromOrder: (type: "items" | "materials", name: string) => void;
  resetOrder: () => void;
};

export const orderStore = create<OrderStore>((set) => ({
  order: {
    orderName: "",
    serviceDescription: "",
    items: [],
    materials: [],
    observationsOrInstructions: "",
  },
  updateOrder: (field, value) =>
    set((state) => ({
      order: { ...state.order, [field]: value },
    })),
  addItemToOrder: (type, newItem) =>
    set((state) => {
      const itemExists = state.order[type].some(
        (item) => item.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (!itemExists) {
        return {
          order: {
            ...state.order,
            [type]: [...state.order[type], newItem],
          },
        };
      }

      return state;
    }),
  removeItemFromOrder: (type, name) => {
    set((state) => ({
      order: {
        ...state.order,
        [type]: state.order[type].filter((item) => item.name !== name),
      },
    }));
  },
  resetOrder: () =>
    set(() => ({
      order: {
        orderName: "",
        serviceDescription: "",
        items: [],
        materials: [],
        observationsOrInstructions: "",
      },
    })),
}));
