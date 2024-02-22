import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Layout from "./components/layout";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import store from "./store";
import SearchPage from "./pages/Search";
import UserDetailPage from "./pages/UserDetail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
        action: ({ request }) =>
          import("./pages/Login").then((module) => module.action({ request })),
      },
      { path: "home", element: <HomePage /> },
      {
        path: "signup",
        element: <SignupPage />,
      },
      { path: "search", element: <SearchPage /> },
      { path: "user/:username", element: <UserDetailPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
