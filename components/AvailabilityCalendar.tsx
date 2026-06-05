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
    <div className="bg-white border border-gray-100 rounded-2xl shadow-medium p-6 sm:p-7 max-w-xl">
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
          <Loader2 className="animate-spin mr-2" size={18} />
          Takvim yükleniyor...
        </div>
      ) : (
        <>
          {source === 'unavailable' && (
            <div className="flex items-start gap-2 bg-beige-50 border border-beige-200 text-luxury-dark rounded-xl p-3 mb-5 text-xs">
              <AlertCircle size={15} className="text-whatsapp mt-0.5 shrink-0" />
              <span>
                Takvim güncellenemedi. Güncel müsaitlik için WhatsApp ile iletişime geçin.
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Önceki ay"
              className={`h-9 w-9 flex items-center justify-center rounded-full border transition-colors ${
                canGoPrev
                  ? 'border-gray-200 hover:border-luxury-dark text-luxury-dark'
                  : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-lg font-semibold text-luxury-dark tracking-tight">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              onClick={handleNext}
              aria-label="Sonraki ay"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-luxury-dark text-luxury-dark transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {days.map((date, index) => {
              if (!date) return <div key={`blank-${index}`} />;

              const key = toDateKey(date);
              const past = isPast(date);
              const blocked = isBlocked(key);
              const disabled = past || blocked;
              const isToday = key === toDateKey(today);
              const isCheckIn = key === checkIn;
              const isCheckOut = key === checkOut;
              const inRange = isInRange(key);
              const isEndpoint = isCheckIn || isCheckOut;
              const rangeStart = isCheckIn && Boolean(checkOut);
              const rangeEnd = isCheckOut;

              return (
                <div
                  key={key}
                  className={`relative h-11 flex items-center justify-center
                    ${inRange ? 'bg-whatsapp/10' : ''}
                    ${rangeStart ? 'bg-whatsapp/10 rounded-l-full' : ''}
                    ${rangeEnd ? 'bg-whatsapp/10 rounded-r-full' : ''}
                  `}
                >
                  <button
                    onClick={() => !disabled && handleDayClick(key)}
                    disabled={disabled}
                    className={`relative z-10 h-10 w-10 flex items-center justify-center text-sm rounded-full transition-all
                      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                      ${past ? 'text-gray-200' : ''}
                      ${blocked && !past ? 'text-gray-300 line-through decoration-gray-300' : ''}
                      ${!disabled && !isEndpoint ? 'text-luxury-dark hover:bg-gray-100' : ''}
                      ${isEndpoint ? 'bg-whatsapp text-white font-semibold shadow-sm' : ''}
                      ${isToday && !isEndpoint && !disabled ? 'ring-1 ring-inset ring-whatsapp/40' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-gray-300" /> Müsait
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gray-300 line-through decoration-gray-300">00</span> Dolu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-whatsapp" /> Seçili
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
