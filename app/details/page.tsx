'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';

function DetailsPageContent() {
  const searchParams = useSearchParams();
  const rsvpCode = searchParams.get('code');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Home', ref: heroRef },
    { label: 'Event Details', ref: eventRef },
    { label: 'The Outfit', ref: lookRef },
    { label: 'The Venue', ref: venueRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddToCalendar = () => {
    const eventTitle = 'Andrei and Cam are finally getting married!';
    const eventDetails = 'Join us for an evening of good food, wine and those we love';
    const eventLocation = 'Can Cortada, Catalonia, Spain';
    const startDate = '20260306T200000Z'; // March 6, 2026, 8:00 PM
    const endDate = '20260307T020000Z'; // March 7, 2026, 2:00 AM (6 hours later)

    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding RSVP//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding-rsvp.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDetails}
LOCATION:${eventLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Create blob and download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'andrei-and-cam-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.25rem' }}>
            A
          </Typography>
          <FavoriteIcon sx={{ color: 'secondary.main', fontSize: '1.25rem' }} />
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.25rem' }}>
            C
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            fontWeight: 400,
          }}
        >
          est 03.06.2006
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => scrollToSection(item.ref)}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#FFFEFA',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', sm: '1.5rem' },
                  }}
                >
                  Andrei
                </Typography>
                <FavoriteIcon sx={{ color: 'secondary.main', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', sm: '1.5rem' },
                  }}
                >
                  Camilia
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.75rem', sm: '0.9rem' },
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                }}
              >
                est 03.06.2006
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  '&:hover': {
                    color: 'secondary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4366F9 0%, #6A85FA 100%)',
          color: 'white',
          textAlign: 'center',
          px: { xs: 2, sm: 3 },
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          <FavoriteIcon sx={{ fontSize: { xs: 60, md: 80 }, mb: 3, color: 'secondary.main' }} />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
              letterSpacing: '0.05em',
            }}
          >
            ANDREI & CAMILIA
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.5rem', md: '2.5rem' },
              mb: { xs: 2.5, md: 3 },
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            invite you to their wedding dinner
          </Typography>
          <Typography variant="h5" sx={{ mb: 0.75, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            March 6, 2026 | 8:00 PM
          </Typography>
          <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.9, fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
            Can Cortada
          </Typography>
        </Container>
      </Box>

      {/* Event Details Section */}
      <Box
        ref={eventRef}
        sx={{
          minHeight: '80vh',
          backgroundColor: '#FFFEFA',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <FavoriteIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'secondary.main',
                mb: 1.5,
                letterSpacing: '0.05em',
              }}
            >
              EVENT DETAILS
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', sm: '1.25rem' }, px: { xs: 2, sm: 0 } }}>
              Celebrate with us!
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
            <Card sx={{ mb: { xs: 1.5, md: 2 }, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                  <EventIcon sx={{ mr: 2, color: 'secondary.main', fontSize: { xs: 35, md: 40 } }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Date
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Friday, March 6, 2026
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: { xs: 1.5, md: 2 }, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                  <AccessTimeIcon sx={{ mr: 2, color: 'secondary.main', fontSize: { xs: 35, md: 40 } }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Time
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      8:00 PM
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      An evening of good food, wine and those we love
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'secondary.main', fontSize: { xs: 35, md: 40 } }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Venue
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Can Cortada
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Add to Calendar Button */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleAddToCalendar}
              startIcon={<EventIcon sx={{ color: 'white' }} />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 30px rgba(255, 107, 53, 0.5)',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Add to Calendar
            </Button>
          </Box>
        </Container>
      </Box>

      {/* The Outfit Section */}
      <Box
        ref={lookRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <FavoriteIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'secondary.main',
                mb: 2,
                letterSpacing: '0.05em',
              }}
            >
              STYLE GUIDE
            </Typography>
          </Box>
          {/* Dress Code Image - Clickable */}
          <Box
            onClick={() => setImageOpen(true)}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: { xs: 'auto', sm: '700px', md: '900px' },
              minHeight: { xs: '500px', sm: '700px' },
              mx: 'auto',
              mb: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src="/dresscode.png"
              alt="Dress Code"
              fill
              style={{ objectFit: 'contain', border: 'none' }}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
            }}
          >
            Click image to view full screen
          </Typography>
        </Container>
      </Box>

      {/* Image Modal */}
      <Dialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            boxShadow: 'none',
            m: 0,
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            m: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Box
            onClick={() => setImageOpen(false)}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/dresscode.png"
              alt="Dress Code"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* The Venue Section */}
      <Box
        ref={venueRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.paper',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <LocationOnIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'secondary.main',
                mb: 2,
                letterSpacing: '0.05em',
              }}
            >
              THE VENUE
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Can Cortada
            </Typography>
          </Box>

          <Card
            sx={{
              border: '3px solid',
              borderColor: 'primary.main',
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: 'primary.main', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.5rem', sm: '2rem' } }}
              >
                Location Details
              </Typography>

              <Box sx={{ mt: 3, p: 2, backgroundColor: '#FFE8DC', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Address:</strong>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOnIcon sx={{ color: 'secondary.dark', fontSize: '1.2rem' }} />
                  <Typography variant="body1">Can Cortada, Barcelona, Spain</Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Getting There:</strong>
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', pl: 0, mb: 2, '& li': { display: 'flex', alignItems: 'center', gap: 1, mb: 1 } }}>
                  <li>
                    <DirectionsCarIcon sx={{ color: 'secondary.dark', fontSize: '1.2rem' }} />
                    Free Parking On-Site
                  </li>
                  <li>
                    <TrainIcon sx={{ color: 'secondary.dark', fontSize: '1.2rem' }} />
                    Valldaura Station (L3)
                  </li>
                </Box>
              </Box>

              {/* Google Maps Embed */}
              <Box
                sx={{
                  mt: 3,
                  width: '100%',
                  height: { xs: '300px', sm: '400px', md: '450px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.122996079522!2d2.1502381774840877!3d41.43655277129363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bd5b6e115a83%3A0xabf60b66408d4ed4!2sCan%20Cortada!5e0!3m2!1sen!2ses!4v1770671035859!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPageContent />
    </Suspense>
  );
}
