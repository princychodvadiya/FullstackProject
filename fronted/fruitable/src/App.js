import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { Provider } from "react-redux";
import { configStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./Context/ThemeContext";
import { ContectProvider } from "./Context/ContectContext";

function App() {
  const { store, persistor } = configStore()
  return (
    <ContectProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route exact path="/*" element={<UserRoutes />} />
              <Route element={<PrivateRoutes />}>
                <Route exact path="/admin/*" element={<AdminRoutes />} />
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ContectProvider>
  );
}

export default App;
