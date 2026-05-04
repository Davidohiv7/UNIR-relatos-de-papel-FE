import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  BookPage,
  CatalogPage,
  CheckoutPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  StoryBookPage,
} from './pages';
import { MainLayout } from './layouts';
import { theme } from './config/mui';
import { ProtectedRoute } from './components/auth';
import { ROUTES } from './config/navigation/navigation.config';
import { AuthProvider } from './context/auth';
import { ShoppingCartProvider } from './context/shopping-cart/shopping-cart.provider';
import { AlertProvider } from './context/alert';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ShoppingCartProvider>
            <AlertProvider>
              <Routes>
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route element={<MainLayout />}>
                  <Route path={ROUTES.home} element={<LandingPage />} />
                  <Route path={ROUTES.catalog} element={<CatalogPage />} />
                  <Route path={ROUTES.book} element={<BookPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.checkout} element={<CheckoutPage />} />
                    <Route path={ROUTES.profile} element={<ProfilePage />} />
                  </Route>
                </Route>
                <Route path={ROUTES.storyBook} element={<StoryBookPage />} />
                <Route path={ROUTES.notFound} element={<NotFoundPage />} />
              </Routes>
            </AlertProvider>
          </ShoppingCartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
