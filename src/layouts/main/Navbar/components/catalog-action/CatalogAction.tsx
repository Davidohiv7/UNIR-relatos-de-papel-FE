import { useRef, useState } from 'react';
import { Box, Collapse, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';
import { buildCatalogUrl, ROUTES } from '../../../../../config/navigation/navigation.config';

function CatalogAction() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnCatalog = location.pathname === ROUTES.catalog;

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const handleClose = () => {
    setOpen(false);
    setValue('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = value.trim();
    if (!q) {
      // If empty, just go to catalog or close
      if (!isOnCatalog) navigate(ROUTES.catalog);
      handleClose();
      return;
    }
    navigate(buildCatalogUrl({ search: q }));
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Collapse in={open} orientation="horizontal" timeout={200}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            px: 1,
            height: 36,
            width: 220,
            bgcolor: 'background.default',
          }}
        >
          <InputBase
            inputRef={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar libros o autores…"
            sx={{ flex: 1, fontSize: '0.875rem' }}
            inputProps={{ 'aria-label': 'buscar libros' }}
          />
          {value && (
            <IconButton size="small" onClick={() => setValue('')} sx={{ p: 0.25 }}>
              <Close fontSize="small" />
            </IconButton>
          )}
        </Paper>
      </Collapse>

      {open ? (
        <Tooltip title="Buscar">
          <IconButton
            type="submit"
            onClick={() => handleSubmit()}
            sx={{ color: 'primary.main' }}
            aria-label="ejecutar búsqueda"
          >
            <Search />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Buscar en el catálogo">
          <IconButton
            aria-label="abrir búsqueda"
            onClick={handleOpen}
            sx={{ color: 'primary.main' }}
          >
            <Search />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default CatalogAction;
