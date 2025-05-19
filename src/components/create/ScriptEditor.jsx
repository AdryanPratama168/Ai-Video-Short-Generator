'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';

export default function ScriptEditor({ scriptData, updateScript }) {
  const [idea, setIdea] = useState(scriptData.idea || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(scriptData.generatedStory || '');

  const handleGenerateStory = async () => {
    if (!idea.trim()) {
      alert('Silakan masukkan ide cerita terlebih dahulu');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) throw new Error('Failed to generate story');
      
      const data = await response.json();
      setGeneratedStory(data.story);
      
      // Update parent state
      updateScript({
        idea,
        generatedStory: data.story,
        segments: data.segments,
      });
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Gagal membuat cerita. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStoryChange = (e) => {
    setGeneratedStory(e.target.value);
    // Note: We don't update segments here as they would need to be re-processed
    // For a complete app, you'd need to add a "Re-segment" button
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Ide Cerita</h2>
        <p className="text-gray-500 mb-4">
          Tuliskan ide cerita singkat Anda, dan AI akan mengembangkannya menjadi cerita lengkap.
        </p>
        <Textarea
          placeholder="Contoh: Seorang anak yang menemukan sebuah buku ajaib di perpustakaan tua"
          className="min-h-24"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <Button 
          className="mt-4"
          onClick={handleGenerateStory}
          disabled={isGenerating || !idea.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Story
            </>
          )}
        </Button>
      </div>

      {generatedStory && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generated Story</h2>
          <p className="text-gray-500 mb-4">
            Anda dapat mengedit cerita yang dihasilkan sesuai kebutuhan.
          </p>
          <Textarea
            className="min-h-64"
            value={generatedStory}
            onChange={handleStoryChange}
          />
        </div>
      )}
    </div>
  );
}