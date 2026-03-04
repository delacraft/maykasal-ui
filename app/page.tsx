'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Snackbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

function HomePageContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const uploadMemoriesRef = useRef<HTMLDivElement>(null);
  const seatingPlanRef = useRef<HTMLDivElement>(null);
  const giftsRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Home', ref: heroRef, href: '/#home' },
    { label: 'Event Details', ref: eventRef, href: '/#event-details' },
    { label: 'The Outfit', ref: lookRef, href: '/#the-outfit' },
    { label: 'The Venue', ref: venueRef, href: '/#the-venue' },
    { label: 'Gifts', ref: giftsRef, href: '/#gifts' },
    { label: 'Upload Memories', ref: uploadMemoriesRef, href: '/#upload-memories' },
    { label: 'Seating Plan', ref: seatingPlanRef, href: '/#seating-plan' },
  ];

  const seatingTables = [
    {
      title: 'MESA 1',
      guests: ['PIKO', 'ARVEE', 'SAB', 'AREE', 'KAREN', 'MIGUEL', 'CATHY', 'ELISSA', 'SAM', 'LEA', 'VICTOR', 'EVAN', 'MIO'],
    },
    {
      title: 'MESA 2',
      guests: ['AARON', 'ABBIE', 'KYRIACOS', 'EFI', 'POL', 'DITA', 'ANDREA', 'ANILA', 'MAX', 'MONIKA', 'APRIL', 'VIC'],
    },
    {
      title: 'MESA 3',
      guests: ['KATH', 'JOEL', 'PATTI', 'JAY', 'MIHO', 'NADIA', 'IVAN', 'ALEXIA', 'NARISSA', 'ARLEEN', 'TARS', 'ZISH'],
    },
    {
      title: 'MESA 4',
      guests: ['IMIE', 'BASH', 'NINNI', 'PRINCE', 'KATRINA', 'JHENG', 'ALJON', 'SARAH', 'NATALIA', 'CHEMA', 'MARIEL', 'FAITH'],
    },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCopyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(message);
      setSnackbarOpen(true);
    } catch {
      setCopyMessage('Copy failed. Please copy manually.');
      setSnackbarOpen(true);
    }
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
          est 06.03.2006
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{ textAlign: 'center' }}
              onClick={handleDrawerToggle}
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
                est 06.03.2006
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
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
        id="home"
        ref={heroRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          px: { xs: 0, sm: 3 },
          pt: 8,
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: '0 !important', sm: undefined } }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: { xs: '84vh', sm: '70vh', md: '80vh' },
            }}
          >
            <Image
              src="/invitation.png"
              alt="Wedding Invitation"
              fill
              quality={95}
              sizes="(max-width: 900px) 100vw, 900px"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
              }}
              priority
            />
          </Box>
        </Container>
      </Box>

      {/* Event Details Section */}
      <Box
        id="event-details"
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
        id="the-outfit"
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
              quality={95}
              sizes="(max-width: 1200px) 100vw, 1200px"
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
              quality={95}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* The Venue Section */}
      <Box
        id="the-venue"
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

      {/* Gifts Section */}
      <Box
        id="gifts"
        ref={giftsRef}
        sx={{
          minHeight: '80vh',
          backgroundColor: 'background.default',
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
                mb: 2,
                letterSpacing: '0.05em',
              }}
            >
              GIFTS
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.7,
              mb: 4,
              color: 'text.primary',
              px: { xs: 1, sm: 2 },
            }}
          >
            With all that we have, we&apos;ve been truly blessed. Your presence &amp; prayers are all that we request. But if you desire to give us nonetheless, monetary gift is one we suggest.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleCopyToClipboard('ES11 1583 0001 1390 6105 6565', 'IBAN copied to clipboard!')}
              startIcon={<AccountBalanceIcon sx={{ color: 'secondary.main' }} />}
              sx={{
                py: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(67, 102, 249, 0.06)',
                },
              }}
            >
              IBAN
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleCopyToClipboard('+34664380635', 'Bizum copied to clipboard!')}
              startIcon={<PhoneIphoneIcon sx={{ color: 'secondary.main' }} />}
              sx={{
                py: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(67, 102, 249, 0.06)',
                },
              }}
            >
              Bizum
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        id="upload-memories"
        ref={uploadMemoriesRef}
        sx={{
          minHeight: '90vh',
          backgroundColor: 'background.default',
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
                mb: 2,
                letterSpacing: '0.05em',
              }}
            >
              UPLOAD MEMORIES
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: 'text.primary',
                mb: 3,
              }}
            >
              Scan the QR code or click the link below.
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              height: { xs: 320, sm: 420 },
              mx: 'auto',
              mb: 3,
              borderRadius: 2,
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'primary.main',
              backgroundColor: 'background.paper',
            }}
          >
            <Image
              src="/qr-media-upload.png"
              alt="QR code for uploading memories"
              fill
              sizes="(max-width: 600px) 90vw, 420px"
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link}
              href="https://guestcam.co/guest/bx6Db9R09q"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 700,
                color: 'white',
              }}
            >
              Upload Here!
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        id="seating-plan"
        ref={seatingPlanRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.paper',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
          display: 'flex',
          alignItems: 'center',
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
              SEATING PLAN
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: '1000px',
              mx: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(2, minmax(220px, 1fr))',
              gap: 2,
            }}
          >
            {seatingTables.map((table) => (
              <Box
                key={table.title}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  px: 2,
                  py: { xs: 2, sm: 2.5 },
                  minHeight: { xs: 220, sm: 260 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 700,
                    fontSize: { xs: '1.2rem', sm: '1.45rem' },
                    letterSpacing: '0.03em',
                    textAlign: 'center',
                    mb: 1.4,
                  }}
                >
                  {table.title}
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    display: 'grid',
                    gap: 0.4,
                  }}
                >
                  {table.guests.map((guest) => (
                    <Typography
                      key={`${table.title}-${guest}`}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        lineHeight: 1.28,
                        textAlign: 'center',
                      }}
                    >
                      {guest}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={copyMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            backgroundColor: 'primary.dark',
            color: 'white',
            fontWeight: 600,
          },
        }}
      />
    </>
  );
}

export default function Home() {
  return <HomePageContent />;
}
