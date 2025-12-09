"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GenerateLinkClient() {
  const [generatedLink, setGeneratedLink] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleGenerateLink = () => {
    const uniqueId = Math.random().toString(36).substring(2, 10);
    setGeneratedLink(`${baseUrl}/track/${uniqueId}`);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share your link.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const socialShares = [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}` },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(generatedLink)}&text=Check%20this%20out!` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(generatedLink)}` },
  ];

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerateLink} size="lg" className="w-full sm:w-auto">
        Generate Link
      </Button>

      {generatedLink && (
        <Card className="bg-secondary">
          <CardContent className="p-4 space-y-4">
            <div>
              <p className="font-semibold mb-2 text-secondary-foreground">Your unique link is ready:</p>
              <div className="flex gap-2">
                <Input type="text" value={generatedLink} readOnly className="bg-background" />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
            
            <div>
                <p className="font-semibold mb-2 text-secondary-foreground">Share on social media:</p>
                <div className="flex flex-wrap gap-2">
                    {socialShares.map(social => (
                        <Button asChild key={social.name} variant="outline">
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                                <Share2 className="mr-2 h-4 w-4" />
                                {social.name}
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
