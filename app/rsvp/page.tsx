'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';

function RSVPPageContent() {
  const router = useRouter();

  const goToRSVP = () => {
    router.push('/rsvp-confirmation');
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
          ¡Hola nuestros amigos!
        </Typography>
      </Box>

      {/* Invitation Image - smaller on mobile so button stays visible */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: { xs: '48vh', sm: '60vh', md: '72vh' },
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

      {/* RSVP Button - pt so it sits higher, pb for safe area on notched phones */}
      <Box sx={{ px: { xs: 1.5, sm: 2 }, pt: { xs: 2, sm: 2.5 }, pb: { xs: 3, sm: 3 }, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={goToRSVP}
            color="secondary"
            sx={{
              py: { xs: 2, sm: 2.5 },
              px: { xs: 4, sm: 5 },
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 600,
              fontFamily: '"Sailors Slant", sans-serif',
              backgroundColor: '#FFFFFF',
              border: '3px solid',
              borderColor: 'secondary.main',
              color: 'secondary.main',
              borderRadius: 3,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              minWidth: { xs: '220px', sm: '260px' },
              boxShadow: '0 4px 20px rgba(253, 147, 79, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(253, 147, 79, 0.08)',
                border: '3px solid',
                borderColor: 'secondary.dark',
                color: 'secondary.dark',
                boxShadow: '0 6px 30px rgba(253, 147, 79, 0.4)',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Click to RSVP
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function RSVPPage() {
  return <RSVPPageContent />;
}
