'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const rsvpCode = searchParams.get('code');
  const attending = searchParams.get('attending') === 'true';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 3,
        px: { xs: 1.5, sm: 0 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3.5 },
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: { xs: 80, md: 90 },
              color: attending ? 'secondary.main' : 'primary.main',
              mb: 2,
            }}
          />

          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 1.5,
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 700,
            }}
          >
            {attending ? 'THANK YOU FOR YOUR RSVP!' : 'THANK YOU FOR YOUR RESPONSE'}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            We have received your confirmation
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          {attending ? (
            <>
              <Typography
                variant="h5"
                sx={{ mb: 2, color: 'secondary.main', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}
              >
                We can't wait to see you!
              </Typography>

              <Box
                sx={{
                  backgroundColor: '#FFFEFA',
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: 2,
                  mb: 2.5,
                  textAlign: 'left',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, textAlign: 'center' }}
                >
                  Event Details
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon sx={{ mr: 2, color: 'secondary.main', fontSize: 36 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Date
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Friday, March 6, 2026
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 2, color: 'secondary.main', fontSize: 36 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Time
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      8:00 PM
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'secondary.main', fontSize: 36 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Venue
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Can Cortada
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                A confirmation email has been sent to {' '}
                <strong>your email address</strong>
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  backgroundColor: '#FFE8DC',
                  color: '#2C2C2C',
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  mb: 2.5,
                  border: '1px solid',
                  borderColor: 'secondary.main',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                📋 Click below to view complete event details including dress code, menu, and venue information
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 2.5, fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                We're sad you can't make it, but we understand.
              </Typography>

              <Typography variant="body1" sx={{ mb: 2.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                We hope to celebrate with you next time!
              </Typography>
            </>
          )}

          <Divider sx={{ my: 2.5 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
          >
            If you have any questions or need to change your RSVP,
            <br />
            please contact us at: <strong>wedding@example.com</strong>
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 2.5,
              pt: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
            }}
          >
            Reference Code: {rsvpCode}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            href={`/details?code=${rsvpCode}`}
            sx={{
              mt: 2.5,
              px: { xs: 3, sm: 4 },
              py: { xs: 1.25, sm: 1.5 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'white'
            }}
          >
            View Event Details
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
