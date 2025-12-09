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
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('Gathering information...');

  useEffect(() => {
    const track = async () => {
      const processTracking = (location: GeolocationPosition | null) => {
        const locationData = location
          ? { latitude: location.coords.latitude, longitude: location.coords.longitude }
          : null;
        
        saveClickData(linkId, userAgent, locationData)
          .then(result => {
            if (result.success) {
              setStatus('success');
              setMessage('Thank you! Redirecting...');
            } else {
              setStatus('error');
              setMessage(result.error || 'An unexpected error occurred.');
            }
          })
          .catch(() => {
            setStatus('error');
            setMessage('Failed to save tracking data.');
          })
          .finally(() => {
            setTimeout(() => {
              router.push('/');
            }, 2000);
          });
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => { 
            processTracking(position);
          },
          () => { 
            processTracking(null);
          }
        );
      } else {
        processTracking(null);
      }
    };

    track();
  }, [linkId, userAgent, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex flex-col items-center gap-4">
        {status === 'pending' && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
        {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500" />}
        <h1 className="text-2xl font-bold text-foreground">{message}</h1>
        <p className="text-muted-foreground">Please wait while we process your request.</p>
      </div>
    </div>
  );
}
