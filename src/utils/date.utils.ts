import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDateTimeEs = (date: Date | string | number): string => {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
};

export { formatDateTimeEs };
