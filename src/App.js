import { useAppContext } from "./hooks";
import { Dashboard, Login } from "./pages";
const App = () => {
  const { isLoggedIn } = useAppContext();
  return isLoggedIn ? <Dashboard /> : <Login />;
};
export default App;
