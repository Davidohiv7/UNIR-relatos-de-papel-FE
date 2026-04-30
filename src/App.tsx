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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/story-book" element={<StoryBookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
