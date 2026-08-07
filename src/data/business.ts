export const businessInfo = {
  name: 'Hitech Solutions',
  tagline:
    'Wholesale Cleaning Chemicals, Housekeeping Materials, Disposable Products & Professional Deep Cleaning Services',
  phone: '9322739595',
phoneDisplay: '+91 93227 39595',
  contactPhone: '9307675913',
  contactPhoneDisplay: '+91 93227 39595 / +91 93076 75913',
  email: 'hitechsolutions290@gmail.com',
  hours: '9:00 AM – 9:00 PM',
  address: {
    line1: 'Near Hotel Raj Palace',
    line2: 'City Market Road',
    city: 'Shirdi',
    district: 'Ahilyanagar',
    state: 'Maharashtra',
    pincode: '423109',
  },
  logo: '/images/1000293504_d1f872fd98250ec20e714149b8b8daa9-26_01_2026,_11_51_29.jpg',
  whatsappNumber: '919322739595',
  mapQuery: 'Hitech Solutions, City Market Road, Shirdi, Ahilyanagar, Maharashtra 423109',
};

export const whatsappLink = (message: string): string => {
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const callLink = `tel:+91${businessInfo.phone}`;
export const emailLink = `mailto:${businessInfo.email}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.mapQuery)}`;
