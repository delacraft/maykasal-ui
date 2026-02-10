'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MENU_OPTIONS = [
  { value: 'codillo', label: 'Codillo de cerdo' },
  { value: 'ternera', label: 'Melosa de ternera' },
  { value: 'salmon', label: 'Suprema de salmon' },
] as const;

function getMenuLabel(value: string): string {
  const opt = MENU_OPTIONS.find((o) => o.value === value);
  return opt ? opt.label : value;
}

const DIETARY_OPTIONS = [
  'Gluten-free',
  'Lactose intolerance',
  'Vegan',
  'Nut allergy',
  'Shellfish allergy',
] as const;

interface FormData {
  name: string;
  going: 'yes' | 'no' | '';
  mainCourse: string;
  dietaryRestrictions: string[];
}

function RSVPConfirmationContent() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    going: '',
    mainCourse: '',
    dietaryRestrictions: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: undefined,
      });
    }
  };

  const handleDietaryToggle = (option: string) => () => {
    const current = formData.dietaryRestrictions;
    const next = current.includes(option)
      ? current.filter((x) => x !== option)
      : [...current, option];
    setFormData({ ...formData, dietaryRestrictions: next });
    if (errors.dietaryRestrictions) {
      setErrors({ ...errors, dietaryRestrictions: undefined });
    }
  };

  const validateForm = (): boolean => {
    if (formData.going === '') return true;
    const newErrors: Partial<FormData> = {};
    if (!formData.name?.trim()) newErrors.name = 'Please enter your name';
    if (formData.going === 'yes' && !formData.mainCourse) newErrors.mainCourse = 'Please select a main course';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.going === '') return;
    if (formData.going === 'no') {
      if (!validateForm()) return;
      setSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            going: formData.going,
            mainCourse: getMenuLabel(formData.mainCourse),
            dietaryRestrictions: formData.dietaryRestrictions,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to submit');
        }
        router.push(`/thank-you?attending=false`);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to submit');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    if (!validateForm()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          going: formData.going,
          mainCourse: getMenuLabel(formData.mainCourse),
          dietaryRestrictions: formData.dietaryRestrictions,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit');
      }
      router.push(`/thank-you?attending=true`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: { xs: 3, md: 5 },
        px: { xs: 1.5, sm: 2 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 3 } }}>
          <FavoriteIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'secondary.main',
              mb: 1.5,
              letterSpacing: '0.05em',
            }}
          >
            RSVP
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            We'd love to celebrate with you, but we need some details from you first
          </Typography>
        </Box>

        <Card
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: 3,
            p: { xs: 1.5, sm: 2.5, md: 3 },
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Will you be attending? - Yes / No with bias to Yes */}
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1.5,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Will you be attending? *
              </FormLabel>
              <RadioGroup
                row
                value={formData.going}
                onChange={(e) => setFormData({ ...formData, going: e.target.value as 'yes' | 'no' })}
                sx={{ gap: 1.5, flexWrap: 'wrap' }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="secondary" size="medium" />}
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.15rem' },
                        color: formData.going === 'yes' ? 'secondary.main' : 'text.primary',
                      }}
                    >
                      Yes, I'll be there!
                    </Typography>
                  }
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 auto' },
                    minWidth: { sm: '200px' },
                    p: 2,
                    m: 0,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: formData.going === 'yes' ? 'secondary.main' : 'divider',
                    backgroundColor: formData.going === 'yes' ? 'rgba(253, 147, 79, 0.08)' : 'transparent',
                    boxShadow: formData.going === 'yes' ? '0 4px 20px rgba(253, 147, 79, 0.2)' : 'none',
                    '&:hover': {
                      borderColor: 'secondary.light',
                      backgroundColor: 'rgba(253, 147, 79, 0.05)',
                    },
                  }}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="default" size="small" />}
                  label={
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                      No, I can't make it
                    </Typography>
                  }
                  sx={{
                    flex: { xs: '1 1 100%', sm: '0 0 auto' },
                    p: 1.5,
                    m: 0,
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: formData.going === 'no' ? 'text.secondary' : 'divider',
                    backgroundColor: formData.going === 'no' ? 'action.hover' : 'transparent',
                  }}
                />
              </RadioGroup>
            </FormControl>

            {/* Name - shown for both Yes and No */}
            {formData.going !== '' && (
              <>
                <Divider sx={{ my: 2.5 }} />
                <TextField
                  fullWidth
                  label="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Enter your name"
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: 3 }}
                />
              </>
            )}

            {/* Menu and rest only when Yes */}
            {formData.going === 'yes' && (
              <>
                {/* Menu Selection */}
                <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                  <FormLabel
                    component="legend"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1.5,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                    }}
                  >
                    Select Your Main Course *
                  </FormLabel>
                  <RadioGroup
                    value={formData.mainCourse}
                    onChange={handleChange('mainCourse')}
                  >
                    {MENU_OPTIONS.map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={<Radio color="secondary" size="small" />}
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                            {opt.label}
                          </Typography>
                        }
                        sx={{
                          mb: 1,
                          p: { xs: 1.5, sm: 1.5 },
                          ml: 0,
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: formData.mainCourse === opt.value ? 'secondary.main' : 'divider',
                          backgroundColor: formData.mainCourse === opt.value ? 'rgba(255, 107, 53, 0.05)' : 'transparent',
                        }}
                      />
                    ))}
                  </RadioGroup>
                  {errors.mainCourse && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.mainCourse}
                    </Typography>
                  )}
                </FormControl>

                <Divider sx={{ my: 2.5 }} />

                {/* Dietary Restrictions */}
                <FormControl component="fieldset" fullWidth sx={{ mb: 2.5 }}>
                  <FormLabel
                    component="legend"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1.5,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                    }}
                  >
                    Dietary Restrictions (Optional)
                  </FormLabel>
                  <FormGroup>
                    {DIETARY_OPTIONS.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            color="secondary"
                            size="small"
                            checked={formData.dietaryRestrictions.includes(option)}
                            onChange={handleDietaryToggle(option)}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                            {option}
                          </Typography>
                        }
                        sx={{ ml: 0, mb: 0.5 }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>

              </>
            )}

            {/* No: short message */}
            {formData.going === 'no' && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                We'll miss you! Thanks for letting us know.
              </Typography>
            )}

            {submitError && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {submitError}
              </Typography>
            )}

            {/* Submit / Confirm Button */}
            {formData.going !== '' && (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                disabled={submitting}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'white'
                }}
              >
                {submitting ? 'Submitting...' : formData.going === 'yes' ? 'Submit RSVP' : 'Confirm'}
              </Button>
            )}
          </form>
        </Card>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: 'center', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
        >
          Please RSVP by February 28, 2026
        </Typography>
      </Container>
    </Box>
  );
}

export default function RSVPConfirmationPage() {
  return <RSVPConfirmationContent />;
}
