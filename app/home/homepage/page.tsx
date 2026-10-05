"use client";

import { Provider } from "react-redux";
import { store } from "../../redux/store";
import HomeComponent from "../../(pages)/home/HomeComponent.page";

export default function Home() {
  return (
    <Provider store={store}>
      <HomeComponent />
    </Provider>
  );
}