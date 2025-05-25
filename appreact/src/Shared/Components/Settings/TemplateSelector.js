import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  Upload,
  Palette,
  ViewModule,
  Check,
  Edit,
  Delete,
  Add,
  Star,
  StarOutline,
} from '@mui/icons-material';
import { useTemplateConfig } from '../../Hook/useTemplateConfig';

const TemplateCard = styled(Card)(({ theme, selected }) => ({
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: selected ? '3px solid #667eea' : '3px solid transparent',
  transform: selected ? 'scale(1.02)' : 'scale(1)',
  boxShadow: selected
    ? '0 8px 30px rgba(102, 126, 234, 0.3)'
    : '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const ColorChip = styled(Chip)(({ color }) => ({
  backgroundColor: color,
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  cursor: 'pointer',
  border: '2px solid white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const LogoUploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #667eea',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    borderColor: '#764ba2',
  },
}));

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedLayout, setSelectedLayout] = useState('classic');
  const [selectedColors, setSelectedColors] = useState({
    primary: '#667eea',
    secondary: '#764ba2',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [customizeDialog, setCustomizeDialog] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Używamy nowego hooka
  const {
    templateConfigs,
    currentTemplateConfig,
    loading,
    error,
    saveTemplateConfig,
    uploadLogo,
    setDefaultTemplate,
    deleteTemplateConfig,
  } = useTemplateConfig();

  const defaultTemplates = [
    {
      id: 'modern',
      name: 'Nowoczesny',
      description: 'Minimalistyczny design z czystymi liniami',
      preview: '/templates/modern-preview.png',
      layouts: ['classic', 'two-column', 'header-focused'],
    },
    {
      id: 'corporate',
      name: 'Korporacyjny',
      description: 'Profesjonalny wygląd dla firm',
      preview: '/templates/corporate-preview.png',
      layouts: ['classic', 'sidebar', 'header-focused'],
    },
    {
      id: 'creative',
      name: 'Kreatywny',
      description: 'Kolorowy i dynamiczny design',
      preview: '/templates/creative-preview.png',
      layouts: ['two-column', 'asymmetric', 'grid'],
    },
    {
      id: 'minimal',
      name: 'Minimalny',
      description: 'Prosty i elegancki',
      preview: '/templates/minimal-preview.png',
      layouts: ['classic', 'clean', 'simple'],
    },
  ];

  const colorPalettes = [
    { name: 'Niebieski', primary: '#667eea', secondary: '#764ba2' },
    { name: 'Zielony', primary: '#4ade80', secondary: '#22c55e' },
    { name: 'Czerwony', primary: '#f87171', secondary: '#ef4444' },
    { name: 'Fioletowy', primary: '#a78bfa', secondary: '#8b5cf6' },
    { name: 'Pomarańczowy', primary: '#fb923c', secondary: '#f97316' },
    { name: 'Różowy', primary: '#f472b6', secondary: '#ec4899' },
    { name: 'Szary', primary: '#6b7280', secondary: '#4b5563' },
    { name: 'Morski', primary: '#06b6d4', secondary: '#0891b2' },
  ];

  const layoutOptions = {
    classic: 'Klasyczny - standardowy układ z nagłówkiem i stopką',
    'two-column': 'Dwie kolumny - dane firmy i klienta obok siebie',
    'header-focused': 'Skupiony na nagłówku - duży header z logo',
    sidebar: 'Panel boczny - menu nawigacyjne z boku',
    asymmetric: 'Asymetryczny - nowoczesny niesymetryczny układ',
    grid: 'Siatka - elementy ułożone w grid',
    clean: 'Czysty - maksymalnie uproszczony',
    simple: 'Prosty - podstawowe elementy',
  };

  // Ustawienie domyślnych wartości z aktualnej konfiguracji
  useEffect(() => {
    if (currentTemplateConfig) {
      setSelectedTemplate(currentTemplateConfig.templateId);
      setSelectedLayout(currentTemplateConfig.layout);
      setSelectedColors(currentTemplateConfig.colors);
      if (currentTemplateConfig.logo?.url) {
        setLogoPreview(currentTemplateConfig.logo.url);
      }
    }
  }, [currentTemplateConfig]);

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Sprawdź typ pliku
    if (!file.type.startsWith('image/')) {
      alert('Proszę wybrać plik obrazu');
      return;
    }

    // Sprawdź rozmiar pliku (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Plik jest za duży. Maksymalny rozmiar to 5MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadLogo(file);
      setLogoFile(result.logoData);
      setLogoPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Błąd podczas przesyłania logo:', error);
      alert('Wystąpił błąd podczas przesyłania logo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      const templateConfig = {
        templateId: selectedTemplate,
        layout: selectedLayout,
        colors: selectedColors,
        logo: logoFile,
      };

      await saveTemplateConfig(templateConfig);
      alert('Konfiguracja szablonu została zapisana');
      setCustomizeDialog(false);
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
      alert('Wystąpił błąd podczas zapisywania konfiguracji: ' + error.message);
    }
  };

  const handleSetAsDefault = async (templateConfigId) => {
    try {
      await setDefaultTemplate(templateConfigId);
      alert('Szablon został ustawiony jako domyślny');
    } catch (error) {
      console.error('Błąd podczas ustawiania domyślnego szablonu:', error);
      alert('Wystąpił błąd: ' + error.message);
    }
  };

  const handleDeleteTemplate = async (templateConfigId) => {
    if (
      window.confirm('Czy na pewno chcesz usunąć tę konfigurację szablonu?')
    ) {
      try {
        await deleteTemplateConfig(templateConfigId);
        alert('Konfiguracja szablonu została usunięta');
      } catch (error) {
        console.error('Błąd podczas usuwania:', error);
        alert('Wystąpił błąd podczas usuwania: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' p={4}>
        <CircularProgress />
        <Typography variant='body1' sx={{ ml: 2 }}>
          Ładowanie szablonów...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ m: 2 }}>
        Błąd podczas ładowania szablonów: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
        Wybierz szablon faktury
      </Typography>

      {/* Domyślne szablony */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {defaultTemplates.map((template) => (
          <Grid item xs={12} md={6} key={template.id}>
            <TemplateCard
              selected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardMedia
                component='img'
                height='200'
                image={template.preview}
                alt={template.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                  {template.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 2 }}
                >
                  {template.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='caption' color='primary'>
                    {template.layouts.length} układów dostępnych
                  </Typography>
                  {selectedTemplate === template.id && (
                    <Button
                      variant='contained'
                      size='small'
                      startIcon={<Edit />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomizeDialog(true);
                      }}
                    >
                      Dostosuj
                    </Button>
                  )}
                </Box>
              </CardContent>
            </TemplateCard>
          </Grid>
        ))}
      </Grid>

      {/* Zapisane konfiguracje */}
      {templateConfigs.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
            Twoje zapisane szablony
          </Typography>
          <Grid container spacing={2}>
            {templateConfigs.map((config) => (
              <Grid item xs={12} md={4} key={config._id}>
                <Card sx={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography variant='h6' sx={{ fontWeight: 600 }}>
                        {defaultTemplates.find(
                          (t) => t.id === config.templateId,
                        )?.name || config.templateId}
                      </Typography>
                      <Box>
                        <IconButton
                          size='small'
                          onClick={() => handleSetAsDefault(config._id)}
                          color={config.isDefault ? 'primary' : 'default'}
                        >
                          {config.isDefault ? <Star /> : <StarOutline />}
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={() => handleDeleteTemplate(config._id)}
                          color='error'
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Układ: {layoutOptions[config.layout]}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant='caption'>Kolory:</Typography>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: config.colors.primary,
                          borderRadius: '50%',
                          border: '1px solid #ccc',
                        }}
                      />
                    </Box>
                    {config.isDefault && (
                      <Chip
                        label='Domyślny'
                        size='small'
                        color='primary'
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Dialog dostosowywania */}
      <Dialog
        open={customizeDialog}
        onClose={() => setCustomizeDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Dostosuj szablon faktury</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Wybór układu */}
            <Typography
              variant='h6'
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ViewModule /> Układ faktury
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Wybierz układ</InputLabel>
              <Select
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value)}
                label='Wybierz układ'
              >
                {defaultTemplates
                  .find((t) => t.id === selectedTemplate)
                  ?.layouts.map((layout) => (
                    <MenuItem key={layout} value={layout}>
                      {layoutOptions[layout]}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Wybór kolorystyki */}
            <Typography
              variant='h6'
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Palette /> Kolorystyka
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {colorPalettes.map((palette) => (
                <Grid item key={palette.name}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ColorChip
                      color={palette.primary}
                      onClick={() => setSelectedColors(palette)}
                      label={
                        selectedColors.primary === palette.primary ? (
                          <Check />
                        ) : (
                          ''
                        )
                      }
                      sx={{ mb: 1 }}
                    />
                    <Typography variant='caption' display='block'>
                      {palette.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Upload logo */}
            <Typography
              variant='h6'
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Upload /> Logo firmy
            </Typography>
            <LogoUploadBox>
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                id='logo-upload'
                onChange={handleLogoUpload}
              />
              <label htmlFor='logo-upload'>
                {logoPreview ? (
                  <Box>
                    <img
                      src={logoPreview}
                      alt='Preview logo'
                      style={{ maxHeight: '100px', maxWidth: '200px' }}
                    />
                    <Typography variant='body2' sx={{ mt: 1 }}>
                      Kliknij aby zmienić logo
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Upload sx={{ fontSize: 48, color: '#667eea', mb: 1 }} />
                    <Typography variant='body1'>
                      Kliknij aby dodać logo firmy
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Obsługiwane formaty: JPG, PNG, SVG (max 5MB)
                    </Typography>
                  </Box>
                )}
              </label>
            </LogoUploadBox>

            {uploading && (
              <Alert severity='info' sx={{ mt: 2 }}>
                Przesyłanie logo...
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomizeDialog(false)}>Anuluj</Button>
          <Button
            variant='contained'
            onClick={handleSaveTemplate}
            disabled={uploading}
          >
            Zapisz konfigurację
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateSelector;
