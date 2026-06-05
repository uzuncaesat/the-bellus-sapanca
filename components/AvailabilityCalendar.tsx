'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import {
  toDateKey,
  daysBetween,
  expandDateRange,
  parseDateKey,
} from '@/lib/calendar-utils';
import BookingChoice from './BookingChoice';

interface AvailabilityCalendarProps {
  villaId: string;
  villaName: string;
}

interface CalendarApiResponse {
  blockedDates: string[];
  lastSynced: string;
  source: 'airbnb' | 'unavailable';
  listingUrl: string | null;
}

const WEEKDAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

const MIN_NIGHTS = 2;

export default function AvailabilityCalendar({ villaId, villaName }: AvailabilityCalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [blockedSet, setBlockedSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'airbnb' | 'unavailable'>('airbnb');
  const [listingUrl, setListingUrl] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [rangeError, setRangeError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/calendar/${villaId}`)
      .then((res) => res.json())
      .then((data: CalendarApiResponse) => {
        if (!active) return;
        setBlockedSet(new Set(data.blockedDates ?? []));
        setSource(data.source ?? 'unavailable');
        setListingUrl(data.listingUrl ?? null);
      })
      .catch(() => {
        if (!active) return;
        setSource('unavailable');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [villaId]);

  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const monthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const leadingBlanks = (monthStart.getDay() + 6) % 7;

  const canGoPrev = viewDate > new Date(today.getFullYear(), today.getMonth(), 1);

  const handlePrev = () => {
    if (!canGoPrev) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isBlocked = (key: string) => blockedSet.has(key);

  const isPast = (date: Date) => date < today;

  const isInRange = (key: string) => {
    if (!checkIn || !checkOut) return false;
    return key > checkIn && key < checkOut;
  };

  const handleDayClick = (key: string) => {
    setRangeError(null);

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(key);
      setCheckOut(null);
      return;
    }

    if (key <= checkIn) {
      setCheckIn(key);
      setCheckOut(null);
      return;
    }

    const nightsInRange = expandDateRange(parseDateKey(checkIn), parseDateKey(key));
    const overlap = nightsInRange.some((d) => blockedSet.has(d));
    if (overlap) {
      setRangeError('Seçtiğiniz aralıkta dolu günler var. Lütfen müsait bir aralık seçin.');
      setCheckIn(key);
      setCheckOut(null);
      return;
    }

    const nights = daysBetween(checkIn, key);
    if (nights < MIN_NIGHTS) {
      setRangeError(`En az ${MIN_NIGHTS} gece konaklama gereklidir.`);
      return;
    }

    setCheckOut(key);
  };

  const clearSelection = () => {
    setCheckIn(null);
    setCheckOut(null);
    setRangeError(null);
  };

  const nights = checkIn && checkOut ? daysBetween(checkIn, checkOut) : 0;

  const days: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) days.push(null);
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 max-w-lg">
      {loading ? (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
          <Loader2 className="animate-spin mr-2" size={16} />
          Yükleniyor...
        </div>
      ) : (
        <>
          {source === 'unavailable' && (
            <div className="flex items-start gap-2 bg-beige-50 border border-beige-200 text-luxury-dark rounded-lg p-2.5 mb-3 text-xs">
              <AlertCircle size={14} className="text-whatsapp mt-0.5 shrink-0" />
              <span>
                Takvim güncellenemedi. Güncel müsaitlik için WhatsApp ile iletişime geçin.
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Önceki ay"
              className={`p-1.5 rounded-lg transition-colors ${
                canGoPrev ? 'hover:bg-luxury-gray text-luxury-dark' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-luxury-dark">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              onClick={handleNext}
              aria-label="Sonraki ay"
              className="p-1.5 rounded-lg hover:bg-luxury-gray text-luxury-dark transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[11px] font-medium text-gray-400 py-0.5">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) return <div key={`blank-${index}`} />;

              const key = toDateKey(date);
              const past = isPast(date);
              const blocked = isBlocked(key);
              const disabled = past || blocked;
              const isCheckIn = key === checkIn;
              const isCheckOut = key === checkOut;
              const inRange = isInRange(key);
              const isEndpoint = isCheckIn || isCheckOut;

              return (
                <button
                  key={key}
                  onClick={() => !disabled && handleDayClick(key)}
                  disabled={disabled}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-md transition-all
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                    ${blocked && !past ? 'bg-red-50 text-red-300' : ''}
                    ${!disabled && !isEndpoint && !inRange ? 'hover:bg-whatsapp-light/30 text-luxury-dark' : ''}
                    ${inRange ? 'bg-whatsapp-light/30 text-luxury-dark' : ''}
                    ${isEndpoint ? 'bg-whatsapp text-white font-semibold' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-white border border-gray-300" /> Müsait
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-50 border border-red-200" /> Dolu
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-whatsapp" /> Seçili
            </span>
          </div>

          {rangeError && (
            <p className="text-red-500 text-xs mt-3">{rangeError}</p>
          )}

          <BookingChoice
            villaName={villaName}
            listingUrl={listingUrl}
            checkIn={checkIn}
            checkOut={checkOut}
            nights={nights}
            onClear={clearSelection}
          />
        </>
      )}
    </div>
  );
}
