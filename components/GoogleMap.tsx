'use client';

import { useRef, useEffect } from 'react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  height?: string;
}

export default function GoogleMap({ 
  latitude = 40.69062475521868,
  longitude = 30.20866731355949,
  address = 'Kırkpınar Tepebaşı, Barış 2. Sk. No:14 Sapanca, Sakarya, Turkey',
  height = '400px'
}: GoogleMapProps) {

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-large border border-gray-200" style={{ height }}>
      {/* Option 1: Iframe Embed (Basit - API key gerekmez ama limitleri var) */}
      <iframe
        src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="The Bellus Sapanca Lokasyon"
      />
      
      {/* Option 2: Static map placeholder (API key olmadan) */}
      {/* 
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full relative group"
      >
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=800x400&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`}
          alt={address}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 text-white font-semibold bg-black/50 px-4 py-2 rounded-lg transition-opacity">
            Haritada Aç
          </span>
        </div>
      </a>
      */}
    </div>
  );
}
