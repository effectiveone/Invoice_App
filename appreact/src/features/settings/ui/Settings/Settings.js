/* eslint-disable no-unused-vars, no-undef, react/jsx-no-undef */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  Settings as SettingsIcon,
  Language,
  Palette,
  ArticleOutlined,
  Upload,
  Check,
  Star,
  StarOutline,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../shared/lib/useUser';
import { useSettings } from '../../../../shared/lib/useSettings';
import { updateSettings } from '../../../../app/store/Actions/settingsActions';
import CustomSelect from './CustomSelect';
import DesignSelect from './designSelect';
import { useTemplateConfig } from '../../../../shared/lib/useTemplateConfig';

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  padding: '24px',
  background:
    theme.customTheme?.gradient ||
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: '16px',
  color: theme.palette.primary.contrastText || 'white',
  transition: 'background 0.3s ease',
}));

const SettingsCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  transition: 'all 0.3s ease',
  pointerEvents: 'auto',
  position: 'relative',
  zIndex: 2,
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  fontWeight: '600',
  color: '#374151',
  fontSize: '18px',
}));

const TemplatePreview = styled(Box)(({ theme, selected, colors }) => ({
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: selected
    ? `3px solid ${colors?.primary || '#667eea'}`
    : '3px solid transparent',
  transform: selected ? 'scale(1.02)' : 'scale(1)',
  boxShadow: selected
    ? `0 8px 30px rgba(102, 126, 234, 0.3)`
    : '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
  padding: '16px',
  margin: '8px 0',
  backgroundColor: 'white',
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

// Dodaję aliasy dla ikon
const PaletteIcon = Palette;
const LanguageIcon = Language;

const Settings = () => {
  const { t } = useTranslation();
  const { mySystemOfDesign } = useSettings();
  const dispatch = useDispatch();
  const { currentUser } = useUser();
  const selectedTemplateType = useSelector(
    (state) => state?.settings?.settings?.templateInvoice,
  );

  // Template configuration state
  const [configDialog, setConfigDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('basicInput');
  const [templateColors, setTemplateColors] = useState({
    primary: '#667eea',
    secondary: '#764ba2',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Hook do nowych szablonów
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

  // Wszystkie dostępne szablony (stare + nowe)
  const allTemplates = [
    // Stare szablony
    {
      id: 'basicInput',
      name: t('templateBasic'),
      description: t('templateBasicDesc'),
      type: 'legacy',
      supportsColors: true,
    },
    {
      id: 'mediumInput',
      name: t('templateMedium'),
      description: t('templateMediumDesc'),
      type: 'legacy',
      supportsColors: true,
    },
    {
      id: 'printerInput',
      name: t('templatePrinter'),
      description: t('templatePrinterDesc'),
      type: 'legacy',
      supportsColors: true,
    },
    // Nowe szablony
    {
      id: 'modernTemplate',
      name: t('templateModern'),
      description: t('templateModernDesc'),
      type: 'modern',
      supportsColors: true,
      supportsLogo: true,
      supportsLayouts: true,
    },
    {
      id: 'corporateTemplate',
      name: t('templateCorporate'),
      description: t('templateCorporateDesc'),
      type: 'modern',
      supportsColors: true,
      supportsLogo: true,
      supportsLayouts: true,
    },
    {
      id: 'creativeTemplate',
      name: t('templateCreative'),
      description: t('templateCreativeDesc'),
      type: 'modern',
      supportsColors: true,
      supportsLogo: true,
      supportsLayouts: true,
    },
    {
      id: 'minimalTemplate',
      name: t('templateMinimal'),
      description: t('templateMinimalDesc'),
      type: 'modern',
      supportsColors: true,
      supportsLogo: true,
      supportsLayouts: true,
    },
  ];

  const colorPalettes = [
    { name: t('colorBlue'), primary: '#667eea', secondary: '#764ba2' },
    { name: t('colorGreen'), primary: '#4ade80', secondary: '#22c55e' },
    { name: t('colorRed'), primary: '#f87171', secondary: '#ef4444' },
    { name: t('colorPurple'), primary: '#a78bfa', secondary: '#8b5cf6' },
    { name: t('colorOrange'), primary: '#fb923c', secondary: '#f97316' },
    { name: t('colorPink'), primary: '#f472b6', secondary: '#ec4899' },
    { name: t('colorGray'), primary: '#6b7280', secondary: '#4b5563' },
    { name: t('colorTeal'), primary: '#06b6d4', secondary: '#0891b2' },
  ];

  useEffect(() => {
    setSelectedTemplate(selectedTemplateType || 'basicInput');
  }, [selectedTemplateType]);

  const handleTemplateChange = (templateId) => {
    if (!currentUser) {
      console.error('Brak currentUser w handleTemplateChange');
      return;
    }

    console.log('handleTemplateChange:', {
      templateId,
      currentUser,
      email: currentUser?.mail,
    });

    setSelectedTemplate(templateId);

    try {
      dispatch(
        updateSettings(
          {
            templateInvoice: templateId,
            email: currentUser?.mail,
          },
          currentUser,
        ),
      );
    } catch (error) {
      console.error('Błąd podczas zapisywania ustawień szablonu:', error);
      alert(t('errorSavingSettings') + ': ' + error.message);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t('selectImageFile'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t('fileTooLarge'));
      return;
    }

    setUploading(true);
    try {
      const result = await uploadLogo(file);
      setLogoFile(result.logoData);
      setLogoPreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Błąd podczas przesyłania logo:', error);
      alert(t('errorUploading') + ': ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveTemplateConfig = async () => {
    try {
      const templateConfig = {
        templateId: selectedTemplate.replace('Template', ''),
        layout: 'classic',
        colors: templateColors,
        logo: logoFile,
      };

      await saveTemplateConfig(templateConfig);
      alert(t('configurationSaved'));
      setConfigDialog(false);
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
      alert(t('errorSaving') + ': ' + error.message);
    }
  };

  const renderTemplateSelector = () => {
    const selectedTemplateData = allTemplates.find(
      (t) => t.id === selectedTemplate,
    );

    return (
      <Box>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>{t('selectInvoiceTemplate')}</InputLabel>
          <Select
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            label={t('selectInvoiceTemplate')}
          >
            <Typography
              variant='subtitle2'
              sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#667eea' }}
            >
              {t('classicTemplates')}
            </Typography>
            {allTemplates
              .filter((t) => t.type === 'legacy')
              .map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  <Box>
                    <Typography variant='body1'>{template.name}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {template.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            <Typography
              variant='subtitle2'
              sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#667eea' }}
            >
              {t('modernTemplates')}
            </Typography>
            {allTemplates
              .filter((t) => t.type === 'modern')
              .map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  <Box>
                    <Typography variant='body1'>{template.name}</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {template.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {selectedTemplateData && (
          <TemplatePreview selected={true} colors={templateColors}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant='h6'>{selectedTemplateData.name}</Typography>
              {selectedTemplateData.supportsColors && (
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<PaletteIcon />}
                  onClick={() => setConfigDialog(true)}
                >
                  {t('customize')}
                </Button>
              )}
            </Box>
            <Typography variant='body2' color='text.secondary'>
              {selectedTemplateData.description}
            </Typography>

            {selectedTemplateData.supportsColors && (
              <Box
                sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Typography variant='caption'>{t('colors')}:</Typography>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: templateColors.primary,
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: templateColors.secondary,
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                  }}
                />
              </Box>
            )}
          </TemplatePreview>
        )}

        {/* Zapisane konfiguracje */}
        {templateConfigs.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
              {t('savedConfigurations')}
            </Typography>
            <Grid container spacing={2}>
              {templateConfigs.map((config) => (
                <Grid item xs={12} key={config._id}>
                  <Card sx={{ borderRadius: '12px' }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography variant='h6'>
                            {config.templateId}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t('layout')}: {config.layout}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            size='small'
                            onClick={() => setDefaultTemplate(config._id)}
                            color={config.isDefault ? 'primary' : 'default'}
                          >
                            {config.isDefault ? <Star /> : <StarOutline />}
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => deleteTemplateConfig(config._id)}
                            color='error'
                          >
                            <StarOutline />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        py: 4,
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <HeaderSection>
        <SettingsIcon sx={{ fontSize: 32, marginRight: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {t('settingsTitle')}
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.9 }}>
            {t('settingsSubtitle')}
          </Typography>
        </Box>
      </HeaderSection>

      {/* Pierwsza sekcja - Podstawowe ustawienia */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant='h5'
            sx={{ mb: 3, fontWeight: 600, color: '#374151' }}
          >
            🌐 {t('basicSettings')}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardContent sx={{ p: 4 }}>
              <SectionTitle>
                <LanguageIcon sx={{ color: '#667eea' }} />
                {t('languageSettings')}
              </SectionTitle>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                {t('languageDescription')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'visible',
                  zIndex: 1000,
                }}
              >
                <CustomSelect />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardContent sx={{ p: 4 }}>
              <SectionTitle>
                <ArticleOutlined sx={{ color: '#667eea' }} />
                {t('templateSettings')}
              </SectionTitle>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                {t('templateDescription')}
              </Typography>
              {renderTemplateSelector()}
            </CardContent>
          </SettingsCard>
        </Grid>
      </Grid>

      {/* Druga sekcja - Wygląd aplikacji */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant='h5'
            sx={{ mb: 3, fontWeight: 600, color: '#374151' }}
          >
            🎨 {t('appearanceSettings')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SettingsCard>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <SectionTitle>
                  <PaletteIcon sx={{ color: '#667eea' }} />
                  {t('colorThemes')}
                </SectionTitle>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  {t('colorThemesDescription', {
                    count: mySystemOfDesign?.length || 18,
                  })}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {t('colorThemesSubDescription')}
                </Typography>
              </Box>
              <DesignSelect />
            </CardContent>
          </SettingsCard>
        </Grid>
      </Grid>

      {/* Dialog konfiguracji szablonu */}
      <Dialog
        open={configDialog}
        onClose={() => setConfigDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PaletteIcon sx={{ color: '#667eea' }} />
            {t('customizeTemplate')}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Wybór kolorystyki */}
            <Typography
              variant='h6'
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <PaletteIcon /> {t('colorPalette')}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {colorPalettes.map((palette) => (
                <Grid item key={palette.name}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ColorChip
                      color={palette.primary}
                      onClick={() => setTemplateColors(palette)}
                      label={
                        templateColors.primary === palette.primary ? (
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

            {/* Upload logo dla nowych szablonów */}
            {allTemplates.find((t) => t.id === selectedTemplate)
              ?.supportsLogo && (
              <>
                <Typography
                  variant='h6'
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Upload /> {t('companyLogo')}
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
                          {t('clickToChangeLogo')}
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Upload
                          sx={{ fontSize: 48, color: '#667eea', mb: 1 }}
                        />
                        <Typography variant='body1'>
                          {t('clickToAddLogo')}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {t('supportedFormats')}
                        </Typography>
                      </Box>
                    )}
                  </label>
                </LogoUploadBox>
              </>
            )}

            {uploading && (
              <Alert severity='info' sx={{ mt: 2 }}>
                {t('uploadingLogo')}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialog(false)}>{t('cancel')}</Button>
          <Button
            variant='contained'
            onClick={handleSaveTemplateConfig}
            disabled={uploading}
          >
            {t('saveConfiguration')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
