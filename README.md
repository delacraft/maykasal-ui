# Wedding RSVP System (Maykasal UI)

Isang wedding RSVP website na ginawa gamit ang Next.js 16 at Material UI.

## Routing Structure

Ang project na ito ay gumagamit ng **Next.js App Router** - isang file-based routing system na napakadali gamitin.

### Mga Routes

1. **`/?code=ABC123` - Landing Page**
   - File: `app/page.tsx`
   - Displays invitation image
   - Floating RSVP button (only shows if code parameter exists)
   - RSVP code comes from URL parameter

2. **`/details` - Event Details Page**
   - File: `app/details/page.tsx`
   - Nagpapakita ng mga detalye ng wedding (petsa, oras, lugar)
   - May button para sa RSVP

3. **`/rsvp` - RSVP Form**
   - File: `app/rsvp/page.tsx`
   - Wizard-style form na may 2 steps
   - May YES/NO popup dialog sa simula
   - Kung YES: mag-proceed sa form (Personal Info → Guest Details)
   - Kung NO: diretso sa thank you page

4. **`/thank-you` - Confirmation Page**
   - File: `app/thank-you/page.tsx`
   - Nagpapakita ng confirmation message
   - Iba ang message kung attending o hindi attending

## Paano Gumagana ang Next.js App Router

### File-Based Routing
```
app/
├── page.tsx              → "/"
├── details/
│   └── page.tsx         → "/details"
├── rsvp/
│   └── page.tsx         → "/rsvp"
└── thank-you/
    └── page.tsx         → "/thank-you"
```

- Bawat folder ay isang route segment
- Ang `page.tsx` file ay yung actual page component
- Automatic ang routing - hindi na kailangan ng manual configuration!

### Query Parameters
Ang routes ay gumagamit ng query parameters para sa RSVP code:
- `/details?code=ABC123`
- `/rsvp?code=ABC123`
- `/thank-you?code=ABC123&attending=true`

## Technologies

- **Next.js 16** - React framework with App Router
- **Material UI (MUI)** - Component library para sa magandang UI
- **TypeScript** - Para sa type safety
- **Emotion** - CSS-in-JS styling (required by MUI)

## Installation

```bash
npm install
```

## Running Development Server

```bash
npm run dev
```

Buksan ang [http://localhost:3000](http://localhost:3000)

## Project Structure

```
maykasal-ui/
├── app/
│   ├── providers/
│   │   └── ThemeProvider.tsx    # Material UI theme configuration
│   ├── details/
│   │   └── page.tsx              # Event details page
│   ├── rsvp/
│   │   └── page.tsx              # RSVP form with wizard
│   ├── thank-you/
│   │   └── page.tsx              # Confirmation page
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Landing page (RSVP code input)
│   └── globals.css               # Global styles
├── public/                        # Static files
├── next.config.ts                # Next.js configuration
├── package.json
└── tsconfig.json
```

## Features

### Landing Page
- ✅ RSVP code input (6 alphanumeric characters)
- ✅ Validation sa code format
- ✅ Magandang UI na wedding-themed

### Details Page
- ✅ Event information (date, time, location)
- ✅ Dress code
- ✅ RSVP button

### RSVP Form
- ✅ YES/NO confirmation dialog sa simula (malalaking buttons)
- ✅ 2-step wizard form kung YES:
  - Step 1: Personal Info (name, email, phone)
  - Step 2: Guest Details (number of guests, dietary restrictions, message)
- ✅ Form validation
- ✅ Auto-redirect kung NO

### Thank You Page
- ✅ Different messages para sa attending/not attending
- ✅ Event reminder para sa attending guests
- ✅ Reference code display

## Next Steps (Future Enhancements)

1. **Backend Integration**
   - Connect sa database (e.g., Supabase, Firebase)
   - API routes para sa RSVP submissions
   - Email notifications

2. **Admin Dashboard**
   - View all RSVPs
   - Export guest list
   - Generate RSVP codes

3. **Additional Features**
   - Photo gallery
   - Gift registry integration
   - Interactive map
   - Countdown timer

## Bakit Next.js App Router?

### Advantages:
1. **Intuitive** - Folder structure = URL structure
2. **Server Components** - Better performance
3. **Built-in Routing** - Walang extra libraries needed
4. **Easy Data Fetching** - Server-side by default
5. **Nested Layouts** - Shared UI components
6. **Loading & Error States** - Built-in support

### Perfect para sa RSVP System:
- Simple page structure
- Easy navigation between pages
- Query parameters para sa code tracking
- Fast page loads
- SEO-friendly (kung need mo)

## License

MIT
