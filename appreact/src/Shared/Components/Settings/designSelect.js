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
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Palette as PaletteIcon,
  Check as CheckIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { useSettings } from '../../Hook/useSettings';

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
  const { mySystemOfDesign, handleThemeChange, selectedDesign } = useSettings();
  const [previewDialog, setPreviewDialog] = useState(false);
  const [previewTheme, setPreviewTheme] = useState(null);

  // Grupowanie motywów według kategorii
  const groupedThemes =
    mySystemOfDesign?.reduce((acc, theme) => {
      const category = theme.category || 'Inne';
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
        return 'Motywy oparte na Material Design Google';
      case 'Business':
        return 'Profesjonalne motywy dla środowiska korporacyjnego';
      case 'Creative':
        return 'Kreatywne i artystyczne motywy o żywych kolorach';
      case 'Minimal':
        return 'Minimalistyczne motywy o czystym designie';
      case 'Accessibility':
        return 'Motywy o wysokim kontraście dla lepszej dostępności';
      default:
        return 'Inne motywy';
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Wybierz motyw, który najlepiej oddaje charakter Twojej firmy
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
                themes.length === 1 ? 'motyw' : 'motywy'
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
                            fontSize: '0.9rem',
                          }}
                        >
                          {design.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {selectedDesign === design.name && (
                            <CheckIcon
                              sx={{
                                color: design.primaryColor,
                                fontSize: 20,
                              }}
                            />
                          )}
                          <Tooltip title='Podgląd motywu'>
                            <IconButton
                              size='small'
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(design);
                              }}
                              sx={{
                                color: design.textColor || '#374151',
                                '&:hover': {
                                  backgroundColor: `${design.primaryColor}20`,
                                },
                              }}
                            >
                              <VisibilityIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Typography
                        variant='caption'
                        sx={{
                          color: design.textColor || '#6b7280',
                          display: 'block',
                          mb: 2,
                          minHeight: '32px',
                        }}
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
                        <Typography
                          variant='caption'
                          sx={{
                            ml: 'auto',
                            color: design.textColor || '#6b7280',
                          }}
                        >
                          Kolory główne
                        </Typography>
                      </Box>

                      {design.gradientColors && (
                        <GradientPreview
                          gradientColors={design.gradientColors}
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
        {previewTheme && (
          <>
            <DialogTitle
              sx={{
                background: `linear-gradient(135deg, ${previewTheme.primaryColor} 0%, ${previewTheme.secondaryColor} 100%)`,
                color: previewTheme.textColor,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <PaletteIcon />
              Podgląd motywu: {previewTheme.name}
            </DialogTitle>
            <DialogContent
              sx={{ backgroundColor: previewTheme.backgroundColor }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant='h6'
                  sx={{ color: previewTheme.textColor, mb: 2 }}
                >
                  {previewTheme.description}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant='subtitle1'
                        sx={{ color: previewTheme.textColor, mb: 1 }}
                      >
                        Kolory główne
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px',
                              backgroundColor: previewTheme.primaryColor,
                              mb: 1,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                          />
                          <Typography
                            variant='caption'
                            sx={{ color: previewTheme.textColor }}
                          >
                            Główny
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px',
                              backgroundColor: previewTheme.secondaryColor,
                              mb: 1,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                          />
                          <Typography
                            variant='caption'
                            sx={{ color: previewTheme.textColor }}
                          >
                            Drugi
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {previewTheme.gradientColors && (
                      <Box>
                        <Typography
                          variant='subtitle1'
                          sx={{ color: previewTheme.textColor, mb: 1 }}
                        >
                          Gradient
                        </Typography>
                        <Box
                          sx={{
                            width: '100%',
                            height: '60px',
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${previewTheme.gradientColors.join(
                              ', ',
                            )})`,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          }}
                        />
                      </Box>
                    )}
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: previewTheme.textColor, mb: 1 }}
                  >
                    Przykład karty
                  </Typography>
                  <Card
                    sx={{
                      background: `linear-gradient(135deg, ${previewTheme.primaryColor}15 0%, ${previewTheme.secondaryColor}15 100%)`,
                      border: `1px solid ${previewTheme.primaryColor}30`,
                      borderRadius: '12px',
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant='h6'
                        sx={{ color: previewTheme.primaryColor, mb: 1 }}
                      >
                        Faktura #2024/001
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: previewTheme.textColor }}
                      >
                        Przykładowa faktura w wybranym motywie kolorystycznym
                      </Typography>
                      <Button
                        variant='contained'
                        size='small'
                        sx={{
                          mt: 2,
                          backgroundColor: previewTheme.primaryColor,
                          color: previewTheme.textColor,
                          '&:hover': {
                            backgroundColor: previewTheme.secondaryColor,
                          },
                        }}
                      >
                        Przykładowy przycisk
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{ backgroundColor: previewTheme.backgroundColor }}
            >
              <Button onClick={() => setPreviewDialog(false)}>Zamknij</Button>
              <Button
                variant='contained'
                onClick={() => {
                  handleThemeSelect(previewTheme.name);
                  setPreviewDialog(false);
                }}
                sx={{
                  backgroundColor: previewTheme.primaryColor,
                  '&:hover': {
                    backgroundColor: previewTheme.secondaryColor,
                  },
                }}
              >
                Wybierz ten motyw
              </Button>
            </DialogActions>
          </>
        )}
      </PreviewDialog>
    </Box>
  );
};

export default DesignSelect;
