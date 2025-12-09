import { headers } from 'next/headers';
import { TrackingClient } from './client';

type Props = {
  params: {
    id: string;
  };
};

export default function TrackPage({ params }: Props) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';

  return <TrackingClient linkId={params.id} userAgent={userAgent} />;
}
