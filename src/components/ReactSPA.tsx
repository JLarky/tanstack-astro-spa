import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "../router";

const router = createRouter();

export const App = () => {
  return <RouterProvider router={router} />;
};
