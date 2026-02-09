'use client';

import { useState, useRef } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StyleIcon from '@mui/icons-material/Style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const rsvpCode = searchParams.get('code');

  const [mobileOpen, setMobileOpen] = useState(false);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Home', ref: heroRef },
    { label: 'Event Details', ref: eventRef },
    { label: 'The Outfit', ref: lookRef },
    { label: 'The Menu', ref: menuRef },
    { label: 'The Venue', ref: venueRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 700 }}>
        A & C
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => scrollToSection(item.ref)}
            >
              <ListItemText primary={item.label} />
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
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            ANDREI & CAMILIA
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
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
          background: 'linear-gradient(135deg, #3843D0 0%, #5C67E8 100%)',
          color: 'white',
          textAlign: 'center',
          px: { xs: 2, sm: 3 },
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          <FavoriteIcon sx={{ fontSize: { xs: 60, md: 80 }, mb: 3, color: '#FF6B35' }} />
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
            <Card sx={{ mb: { xs: 1.5, md: 2 }, border: '2px solid #3843D0' }}>
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

            <Card sx={{ mb: { xs: 1.5, md: 2 }, border: '2px solid #3843D0' }}>
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

            <Card sx={{ border: '2px solid #3843D0' }}>
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
        </Container>
      </Box>

      {/* The Outfit Section */}
      <Box
        ref={lookRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5EFE7',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <StyleIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
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
              THE OUTFIT
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Style Suggestion
            </Typography>
          </Box>

          {/* Dress Code Image */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: { xs: 'auto', sm: '700px', md: '900px' },
              minHeight: { xs: '500px', sm: '700px' },
              mx: 'auto',
              mb: 4,
            }}
          >
            <Image
              src="/dresscode.png"
              alt="Dress Code"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Please avoid wearing black and white
          </Typography>
        </Container>
      </Box>

      {/* The Menu Section */}
      <Box
        ref={menuRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: '#FFFEFA',
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <RestaurantIcon sx={{ fontSize: { xs: 45, md: 55 }, color: 'secondary.main', mb: 1.5 }} />
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
              THE MENU
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', sm: '1.25rem' }, px: { xs: 2, sm: 0 } }}>
              An evening of good food, wine and those we love
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    height: '100%',
                    border: '2px solid #3843D0',
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: 'primary.main', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                    >
                      Appetizers
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Charcuterie & Cheese Board
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Caprese Skewers
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Bruschetta Trio
                    </Typography>
                    <Typography variant="body1">
                      • Seasonal Soup
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    height: '100%',
                    border: '2px solid #3843D0',
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: 'primary.main', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                    >
                      Main Course
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Grilled Sea Bass with Herbs
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Roasted Chicken Supreme
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Vegetarian Risotto
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Served with seasonal vegetables and potatoes
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card
                  sx={{
                    height: '100%',
                    border: '2px solid #3843D0',
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: 'primary.main', fontWeight: 700, mb: 2, textAlign: 'center', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                    >
                      Desserts
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Wedding Cake
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Tiramisu
                    </Typography>
                    <Typography variant="body1" paragraph>
                      • Chocolate Fondant
                    </Typography>
                    <Typography variant="body1">
                      • Fresh Fruit Platter
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Card
              sx={{
                backgroundColor: '#FFE8DC',
                border: '2px solid #FF6B35',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{ color: 'secondary.main', fontWeight: 700, mb: 2 }}
                >
                  Beverages
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Selection of wines, beers, cocktails, and non-alcoholic beverages
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                  Please let us know of any dietary restrictions in your RSVP
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* The Venue Section */}
      <Box
        ref={venueRef}
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5EFE7',
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
              border: '3px solid #3843D0',
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

              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Can Cortada
              </Typography>

              <Typography variant="body1" paragraph>
                A beautiful venue surrounded by nature, perfect for celebrating our special day.
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Address:</strong><br />
                Can Cortada, Catalonia, Spain
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Getting There:</strong><br />
                Parking is available on-site. We recommend carpooling or arranging transportation with friends.
              </Typography>

              <Box sx={{ mt: 3, p: 2, backgroundColor: '#FFE8DC', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  💡 Tip: The venue is located in a natural setting. We recommend wearing comfortable shoes suitable for outdoor areas.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
