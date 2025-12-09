"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveClickData } from '@/lib/actions';
import { Loader2, CheckCircle } from 'lucide-react';

type Props = {
  linkId: string;
  userAgent: string;
};

export function TrackingClient({ linkId, userAgent }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState('Gathering information and redirecting...');

  useEffect(() => {
    const trackAndRedirect = () => {
      const processTracking = (location: GeolocationPosition | null) => {
        const locationData = location
          ? { latitude: location.coords.latitude, longitude: location.coords.longitude }
          : null;

        // Fire and forget, don't wait for the save to complete
        saveClickData(linkId, userAgent, locationData);

        // Redirect immediately
        router.push('/');
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            processTracking(position);
          },
          () => {
            // If location is denied, still track and redirect
            processTracking(null);
          }
        );
      } else {
        // If geolocation is not available, still track and redirect
        processTracking(null);
      }
    };

    trackAndRedirect();
  }, [linkId, userAgent, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h1 className="text-2xl font-bold text-foreground">{message}</h1>
        <p className="text-muted-foreground">Please wait while we process your request.</p>
      </div>
    </div>
  );
}
