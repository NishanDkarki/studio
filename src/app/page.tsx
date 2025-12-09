import { GenerateLinkClient } from '@/components/generate-link-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import placeholderImage from '@/lib/placeholder-images.json'

export default function Home() {
  const heroImage = placeholderImage.placeholderImages.find(img => img.id === 'hero');

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight md:text-4xl">Generate Your Tracking Link</CardTitle>
              <CardDescription className="text-lg">
                Create a unique link to share on social media. We'll capture location and device details for every click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GenerateLinkClient />
            </CardContent>
          </Card>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
