import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
  Avatar,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Visibility as VisibilityIcon,
  Brush as BrushIcon,
  ColorLens as ColorLensIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../../shared/lib/useSettings';

const ThemeCard = styled(Card)(({ theme, selected, designColors }) => ({
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: selected
    ? `3px solid ${designColors?.primaryColor || '#667eea'}`
    : '3px solid transparent',
  transform: selected ? 'scale(1.02)' : 'scale(1)',
  background: selected
    ? `linear-gradient(135deg, ${
        designColors?.backgroundColor || '#f8fafc'
      } 0%, rgba(102, 126, 234, 0.05) 100%)`
    : designColors?.backgroundColor || '#ffffff',
  boxShadow: selected
    ? `0 8px 30px rgba(102, 126, 234, 0.3)`
    : '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const ColorPreview = styled(Box)(({ color }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color,
  border: '2px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
}));

const GradientPreview = styled(Box)(({ gradientColors }) => ({
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  background:
    gradientColors?.length > 1
      ? `linear-gradient(90deg, ${gradientColors.join(', ')})`
      : gradientColors?.[0] || '#667eea',
  marginTop: '8px',
}));

const CategoryBadge = styled(Chip)(({ category }) => {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Material':
        return { bg: '#E3F2FD', color: '#1976D2' };
      case 'Business':
        return { bg: '#F3E5F5', color: '#7B1FA2' };
      case 'Creative':
        return { bg: '#E8F5E8', color: '#388E3C' };
      case 'Minimal':
        return { bg: '#FFF3E0', color: '#F57C00' };
      case 'Accessibility':
        return { bg: '#FFEBEE', color: '#D32F2F' };
      default:
        return { bg: '#F5F5F5', color: '#616161' };
    }
  };

  const colors = getCategoryColor(category);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: '600',
    fontSize: '0.75rem',
  };
});

const PreviewDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    maxWidth: '600px',
  },
}));

const DesignSelect = () => {
  const { t } = useTranslation();
  const { mySystemOfDesign, handleThemeChange, selectedDesign } = useSettings();
  const [previewDialog, setPreviewDialog] = useState(false);
  const [previewTheme, setPreviewTheme] = useState(null);

  // Grupowanie motywów według kategorii
  const groupedThemes =
    mySystemOfDesign?.reduce((acc, theme) => {
      const category = theme.category || t('themeOther', 'Inne');
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(theme);
      return acc;
    }, {}) || {};

  const handleThemeSelect = (themeName) => {
    handleThemeChange({ target: { value: themeName } });
  };

  const handlePreview = (theme) => {
    setPreviewTheme(theme);
    setPreviewDialog(true);
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case 'Material':
        return t(
          'themeMaterialDesc',
          'Motywy oparte na Material Design Google',
        );
      case 'Business':
        return t(
          'themeBusinessDesc',
          'Profesjonalne motywy dla środowiska korporacyjnego',
        );
      case 'Creative':
        return t(
          'themeCreativeDesc',
          'Kreatywne i artystyczne motywy o żywych kolorach',
        );
      case 'Minimal':
        return t(
          'themeMinimalDesc',
          'Minimalistyczne motywy o czystym designie',
        );
      case 'Accessibility':
        return t(
          'themeAccessibilityDesc',
          'Motywy o wysokim kontraście dla lepszej dostępności',
        );
      default:
        return t('themeOtherDesc', 'Inne motywy');
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        {t(
          'selectThemeDescription',
          'Wybierz motyw, który najlepiej oddaje charakter Twojej firmy',
        )}
      </Typography>

      {Object.entries(groupedThemes).map(([category, themes]) => (
        <Accordion key={category} defaultExpanded={category === 'Material'}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                gap: 2,
              },
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {category}
            </Typography>
            <CategoryBadge
              category={category}
              label={`${themes.length} ${
                themes.length === 1
                  ? t('themesSingular', 'motyw')
                  : t('themesPlural', 'motywy')
              }`}
              size='small'
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              {getCategoryDescription(category)}
            </Typography>
            <Grid container spacing={2}>
              {themes.map((design) => (
                <Grid item xs={12} sm={6} md={4} key={design.name}>
                  <ThemeCard
                    selected={selectedDesign === design.name}
                    designColors={design}
                    onClick={() => handleThemeSelect(design.name)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant='subtitle1'
                          sx={{
                            fontWeight: 600,
                            color: design.textColor || '#374151',
                          }}
                        >
                          {design.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title={t('themePreview', 'Podgląd motywu')}>
                            <IconButton
                              size='small'
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(design);
                              }}
                              sx={{
                                color: design.primaryColor || '#667eea',
                                '&:hover': {
                                  backgroundColor: `${
                                    design.primaryColor || '#667eea'
                                  }20`,
                                },
                              }}
                            >
                              <VisibilityIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          {selectedDesign === design.name && (
                            <CheckIcon
                              sx={{
                                color: design.primaryColor || '#667eea',
                                fontSize: 20,
                              }}
                            />
                          )}
                        </Box>
                      </Box>

                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 2, fontSize: '0.875rem' }}
                      >
                        {design.description}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <ColorPreview color={design.primaryColor} />
                        <ColorPreview color={design.secondaryColor} />
                        <ColorPreview color={design.accentColor} />
                        <Typography variant='caption' color='text.secondary'>
                          {t('colors', 'Kolory')}
                        </Typography>
                      </Box>

                      {design.gradient && (
                        <GradientPreview
                          gradientColors={[
                            design.primaryColor,
                            design.secondaryColor,
                          ]}
                        />
                      )}
                    </CardContent>
                  </ThemeCard>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Dialog podglądu motywu */}
      <PreviewDialog
        open={previewDialog}
        onClose={() => setPreviewDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle
          sx={{
            background: previewTheme?.gradient
              ? `linear-gradient(135deg, ${previewTheme.primaryColor} 0%, ${previewTheme.secondaryColor} 100%)`
              : previewTheme?.primaryColor || '#667eea',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {t('themePreviewTitle', 'Podgląd motywu')}: {previewTheme?.name}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {previewTheme && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    {t('colors', 'Kolory')}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ColorPreview
                        color={previewTheme.primaryColor}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant='body2' fontWeight={600}>
                          Primary
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {previewTheme.primaryColor}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ColorPreview
                        color={previewTheme.secondaryColor}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant='body2' fontWeight={600}>
                          Secondary
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {previewTheme.secondaryColor}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ColorPreview
                        color={previewTheme.accentColor}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant='body2' fontWeight={600}>
                          Accent
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {previewTheme.accentColor}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    {t('preview', 'Podgląd')}
                  </Typography>
                  <Card
                    sx={{
                      background: previewTheme.gradient
                        ? `linear-gradient(135deg, ${previewTheme.primaryColor} 0%, ${previewTheme.secondaryColor} 100%)`
                        : previewTheme.backgroundColor,
                      color: previewTheme.textColor,
                      p: 2,
                    }}
                  >
                    <Typography variant='h6' sx={{ mb: 1 }}>
                      {t('invoice', 'Faktura')} #001
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 2 }}>
                      {t(
                        'invoicePreviewDescription',
                        'Przykładowa faktura w wybranym motywie kolorystycznym',
                      )}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant='body2'>
                        {t('totalPayment', 'Razem do zapłaty')}
                      </Typography>
                      <Typography variant='h6' fontWeight={600}>
                        1,230.00 PLN
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>
            {t('cancel', 'Anuluj')}
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              handleThemeSelect(previewTheme.name);
              setPreviewDialog(false);
            }}
            sx={{
              background: previewTheme?.gradient
                ? `linear-gradient(135deg, ${previewTheme.primaryColor} 0%, ${previewTheme.secondaryColor} 100%)`
                : previewTheme?.primaryColor || '#667eea',
            }}
          >
            {t('selectTheme', 'Wybierz ten motyw')}
          </Button>
        </DialogActions>
      </PreviewDialog>
    </Box>
  );
};

export default DesignSelect;
