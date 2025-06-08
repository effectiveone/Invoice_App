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

// Typy dla styled components
interface ThemeCardProps {
  selected?: boolean;
  designColors?: any;
  theme?: any;
}

interface GradientPreviewProps {
  gradientColors?: any[];
  theme?: any;
}

interface CategoryBadgeProps {
  category?: string;
  theme?: any;
}

const ThemeCard = styled(Card)<ThemeCardProps>(
  ({ theme, selected, designColors }) => ({
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
  }),
);

const ColorPreview = styled(Box)(({ color }: { color: string }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color,
  border: '2px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
}));

const GradientPreview = styled(Box)<GradientPreviewProps>(
  ({ gradientColors }) => ({
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    background:
      gradientColors?.length > 1
        ? `linear-gradient(90deg, ${gradientColors.join(', ')})`
        : gradientColors?.[0] || '#667eea',
    marginTop: '8px',
  }),
);

const CategoryBadge = styled(Chip)<CategoryBadgeProps>(({ category }) => {
  const getCategoryColor = (cat: any) => {
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
  const [previewTheme, setPreviewTheme] = useState<any>(null);

  // Grupowanie motywów według kategorii
  const groupedThemes =
    mySystemOfDesign?.reduce((acc: any, theme: any) => {
      const category = theme.category || t('themeOther', 'Inne');
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(theme);
      return acc;
    }, {}) || {};

  const handleThemeSelect = (themeName: any) => {
    handleThemeChange({ target: { value: themeName } } as any);
  };

  const handlePreview = (theme: any) => {
    setPreviewTheme(theme);
    setPreviewDialog(true);
  };

  const getCategoryDescription = (category: any) => {
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

      {Object.entries(groupedThemes).map(
        ([category, themes]: [string, any]) => (
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
                label={`${(themes as any).length} ${
                  (themes as any).length === 1
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
                {(themes as any).map((design: any) => (
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
                            <Tooltip
                              title={t('themePreview', 'Podgląd motywu')}
                            >
                              <IconButton
                                size='small'
                                onClick={(e: any) => {
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
                          sx={{ mb: 2, minHeight: '40px' }}
                        >
                          {design.description ||
                            t('themeNoDescription', 'Brak opisu')}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <ColorPreview
                            color={design.primaryColor || '#667eea'}
                          />
                          <ColorPreview
                            color={design.secondaryColor || '#764ba2'}
                          />
                          <ColorPreview
                            color={design.backgroundColor || '#f8fafc'}
                          />
                        </Box>

                        {design.gradientColors && (
                          <GradientPreview
                            gradientColors={[
                              design.primaryColor || '#667eea',
                              design.secondaryColor || '#764ba2',
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
        ),
      )}

      {/* Dialog podglądu motywu */}
      <PreviewDialog
        open={previewDialog}
        onClose={() => setPreviewDialog(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle
          sx={{
            background: previewTheme?.gradientColors
              ? `linear-gradient(135deg, ${
                  previewTheme.primaryColor || '#667eea'
                } 0%, ${previewTheme.secondaryColor || '#764ba2'} 100%)`
              : previewTheme?.primaryColor || '#667eea',
            color: previewTheme?.textColor || '#ffffff',
            textAlign: 'center',
          }}
        >
          {t('themePreviewTitle', 'Podgląd motywu')}: {previewTheme?.name}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {previewTheme && (
            <Box>
              <Typography variant='h6' gutterBottom>
                {t('themeColors', 'Kolory motywu')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <ColorPreview
                    color={previewTheme.primaryColor || '#667eea'}
                  />
                  <Typography variant='caption' display='block' sx={{ mt: 1 }}>
                    {t('themePrimary', 'Główny')}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <ColorPreview
                    color={previewTheme.secondaryColor || '#764ba2'}
                  />
                  <Typography variant='caption' display='block' sx={{ mt: 1 }}>
                    {t('themeSecondary', 'Drugorzędny')}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <ColorPreview
                    color={previewTheme.backgroundColor || '#f8fafc'}
                  />
                  <Typography variant='caption' display='block' sx={{ mt: 1 }}>
                    {t('themeBackground', 'Tło')}
                  </Typography>
                </Box>
              </Box>

              {previewTheme.gradientColors && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant='h6' gutterBottom>
                    {t('themeGradient', 'Gradient')}
                  </Typography>
                  <GradientPreview
                    gradientColors={[
                      previewTheme.primaryColor || '#667eea',
                      previewTheme.secondaryColor || '#764ba2',
                    ]}
                  />
                </Box>
              )}

              <Typography variant='body1' sx={{ mb: 2 }}>
                <strong>{t('themeCategory', 'Kategoria')}:</strong>{' '}
                {previewTheme.category}
              </Typography>
              <Typography variant='body1'>
                <strong>{t('themeDescription', 'Opis')}:</strong>{' '}
                {previewTheme.description ||
                  t('themeNoDescription', 'Brak opisu')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>
            {t('close', 'Zamknij')}
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              handleThemeSelect(previewTheme?.name);
              setPreviewDialog(false);
            }}
            sx={{
              background: previewTheme?.gradientColors
                ? `linear-gradient(135deg, ${
                    previewTheme.primaryColor || '#667eea'
                  } 0%, ${previewTheme.secondaryColor || '#764ba2'} 100%)`
                : previewTheme?.primaryColor || '#667eea',
            }}
          >
            {t('themeSelect', 'Wybierz motyw')}
          </Button>
        </DialogActions>
      </PreviewDialog>
    </Box>
  );
};

export default DesignSelect;
