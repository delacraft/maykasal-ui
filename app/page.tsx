'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rsvpCode = searchParams.get('code') || 'GUEST';

  // Mock function to get guest name from code
  // TODO: Replace with actual API call
  const getGuestName = (code: string): string => {
    const guestMap: { [key: string]: string } = {
      'ABC123': 'Maria',
      'XYZ789': 'Juan',
      'GUEST': 'Friend',
    };
    return guestMap[code] || 'Friend';
  };

  const guestName = getGuestName(rsvpCode);

  const handleConfirmation = (attending: boolean) => {
    if (!attending) {
      router.push(`/thank-you?code=${rsvpCode}&attending=false`);
    } else {
      router.push(`/rsvp?code=${rsvpCode}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default'
      }}
    >
      {/* Greeting Text - Above Image */}
      <Box sx={{ pt: { xs: 3, sm: 4 }, px: { xs: 1.5, sm: 2 }, backgroundColor: 'primary.main' }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            color: 'secondary.main',
            mb: { xs: 2, sm: 3 },
            fontFamily: '"Sailors Slant", sans-serif',
            textTransform: 'uppercase',
          }}
        >
          ¡Hola {guestName}!
        </Typography>
      </Box>

      {/* Invitation Image - Full width, edge-to-edge */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '72vh',
          backgroundColor: 'background.default',
        }}
      >
        <Image
          src="/invitation.png"
          alt="Wedding Invitation"
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center top',
          }}
          priority
        />
      </Box>

      {/* Buttons */}
      <Box sx={{ px: { xs: 1.5, sm: 2 }, pb: { xs: 2, sm: 2.5 }, backgroundColor: 'background.default' }}>
        {/* YES/NO Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 1.5 },
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => handleConfirmation(true)}
            sx={{
              py: { xs: 2, sm: 2.5 },
              px: { xs: 4, sm: 5 },
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 600,
              fontFamily: '"Sailors Slant", sans-serif',
              backgroundColor: '#FFFFFF',
              border: '3px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              borderRadius: 3,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              minWidth: { xs: '220px', sm: '240px' },
              boxShadow: '0 4px 20px rgba(67, 102, 249, 0.3)',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                border: '3px solid',
                borderColor: 'primary.main',
                boxShadow: '0 6px 30px rgba(67, 102, 249, 0.5)',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Yes, I'll be there!
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => handleConfirmation(false)}
            sx={{
              py: { xs: 1.5, sm: 2 },
              px: { xs: 3, sm: 4 },
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              fontWeight: 600,
              fontFamily: '"Sailors Slant", sans-serif',
              backgroundColor: '#FFFFFF',
              border: '2px solid #999',
              color: '#666',
              borderRadius: 3,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              minWidth: { xs: '160px', sm: '180px' },
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#F5F5F5',
                border: '2px solid #777',
                color: '#555',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            No :(
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
