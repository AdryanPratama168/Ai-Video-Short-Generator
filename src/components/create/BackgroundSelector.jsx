'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export default function BackgroundSelector({ backgroundData, scriptData, updateBackground }) {
  const [aspectRatio, setAspectRatio] = useState(backgroundData.aspectRatio || '9:16');
  const [styleOption, setStyleOption] = useState(backgroundData.selectedStyle || 'realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState(backgroundData.images || []);

  // Disabled if no script segments are available
  const isDisabled = !scriptData.segments || scriptData.segments.length === 0;

  const styleOptions = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'anime', label: 'Anime' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'oil-painting', label: 'Oil Painting' },
  ];

  const aspectRatioOptions = [
    { value: '9:16', label: 'Vertical (9:16) - Instagram/TikTok' },
    { value: '16:9', label: 'Horizontal (16:9) - YouTube' },
    { value: '1:1', label: 'Square (1:1) - Instagram' },
    { value: '4:5', label: 'Portrait (4:5) - Instagram' },
  ];

  const handleGenerateImages = async () => {
    if (isDisabled) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          segments: scriptData.segments,
          style: styleOption,
          aspectRatio,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate images');
      
      const data = await response.json();
      setBackgroundImages(data.images);
      
      // Update parent state
      updateBackground({
        aspectRatio,
        selectedStyle: styleOption,
        images: data.images,
      });
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Gagal membuat gambar. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle aspect ratio change
  const handleAspectRatioChange = (value) => {
    setAspectRatio(value);
    updateBackground({ aspectRatio: value });
  };

  // Handle style change
  const handleStyleChange = (value) => {
    setStyleOption(value);
    updateBackground({ selectedStyle: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Background Settings</h2>
        <p className="text-gray-500 mb-4">
          Pilih aspek rasio dan style untuk gambar background video Anda.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Aspek Rasio</label>
            <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih aspek rasio" />
              </SelectTrigger>
              <SelectContent>
                {aspectRatioOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Style Gambar</label>
            <Select value={styleOption} onValueChange={handleStyleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih style gambar" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleGenerateImages}
          disabled={isGenerating || isDisabled}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Images...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Background Images
            </>
          )}
        </Button>
        
        {isDisabled && (
          <p className="text-amber-500 mt-2">
            Please generate a story first in the Script tab.
          </p>
        )}
      </div>

      {backgroundImages.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Generated Backgrounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {backgroundImages.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="relative" style={{ 
                  paddingTop: aspectRatio === '9:16' ? '177.78%' : 
                             aspectRatio === '16:9' ? '56.25%' : 
                             aspectRatio === '1:1' ? '100%' : 
                             '125%' // 4:5
                }}>
                  <Image
                    src={image.url}
                    alt={`Background ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="p-2 text-sm text-gray-500">Scene {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}