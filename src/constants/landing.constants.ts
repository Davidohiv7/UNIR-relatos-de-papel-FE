import { FireTruck, Refresh, Shield } from '@mui/icons-material';

export const LANDING_CATEGORIES = [
  {
    label: 'Fantasía',
    to: '/catalog?cat=7',
  },
  {
    label: 'Ciencia ficción',
    to: '/catalog?cat=4',
  },
  {
    label: 'Autoayuda',
    to: '/catalog?cat=14',
  },
  {
    label: 'Aventuras',
    to: '/catalog?cat=6',
  },
];

export const LANDING_BENEFITS = [
  {
    icon: FireTruck,
    title: 'Envío rápido y seguro',
    desc: 'Recibe tu pedido en 24-48h...',
    color: '#e3f2fd',
    iconColor: '#1976d2',
  },
  {
    icon: Refresh,
    title: 'Devoluciones fáciles',
    desc: '30 días para devolver...',
    color: '#e8f5e9',
    iconColor: '#2e7d32',
  },
  {
    icon: Shield,
    title: 'Pago 100% seguro',
    desc: 'Tus datos están protegidos...',
    color: '#f3e5f5',
    iconColor: '#6a1b9a',
  },
];
