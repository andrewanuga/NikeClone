import Hero from "./pages/Hero";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import RootLayout from "./layout/RootLayout";
import Shop from "./pages/Shop";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new" element={<Hero />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

