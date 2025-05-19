'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScriptEditor from '@/components/create/ScriptEditor';
import BackgroundSelector from '@/components/create/BackgroundSelector';
import SubtitlePreview from '@/components/create/SubtitlePreview';
import AudioSettings from '@/components/create/AudioSettings';
import Preview from '@/components/create/Preview';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('script');
  const [projectData, setProjectData] = useState({
    script: {
      idea: '',
      generatedStory: '',
      segments: [],
    },
    background: {
      aspectRatio: '9:16', // Default untuk short video
      images: [],
      selectedStyle: 'realistic',
    },
    subtitle: {
      template: 'template1',
      fontSize: 24,
      color: '#FFFFFF',
      position: 'bottom',
    },
    audio: {
      narrator: {
        voice: 'default',
        language: 'id-ID',
        speed: 1,
      },
      music: {
        track: '',
        volume: 0.3,
      },
    },
    rendering: {
      status: 'not_started',
      progress: 0,
      outputUrl: '',
    },
  });

  const updateProjectData = (section, data) => {
    setProjectData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const handleNext = () => {
    const tabs = ['script', 'background', 'subtitle', 'audio', 'preview'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ['script', 'background', 'subtitle', 'audio', 'preview'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleSaveProject = async () => {
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      });
      
      if (!response.ok) throw new Error('Failed to save project');
      
      const { projectId } = await response.json();
      router.push(`/preview/${projectId}`);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Buat Video Storytelling</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="script">1. Script</TabsTrigger>
          <TabsTrigger value="background">2. Background</TabsTrigger>
          <TabsTrigger value="subtitle">3. Subtitle</TabsTrigger>
          <TabsTrigger value="audio">4. Audio</TabsTrigger>
          <TabsTrigger value="preview">5. Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="script">
          <ScriptEditor 
            scriptData={projectData.script} 
            updateScript={(data) => updateProjectData('script', data)} 
          />
        </TabsContent>
        
        <TabsContent value="background">
          <BackgroundSelector 
            backgroundData={projectData.background}
            scriptData={projectData.script}
            updateBackground={(data) => updateProjectData('background', data)} 
          />
        </TabsContent>
        
        <TabsContent value="subtitle">
          <SubtitlePreview 
            subtitleData={projectData.subtitle}
            scriptData={projectData.script}
            updateSubtitle={(data) => updateProjectData('subtitle', data)} 
          />
        </TabsContent>
        
        <TabsContent value="audio">
          <AudioSettings 
            audioData={projectData.audio}
            scriptData={projectData.script} 
            updateAudio={(data) => updateProjectData('audio', data)} 
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <Preview 
            projectData={projectData}
            updateRendering={(data) => updateProjectData('rendering', data)} 
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-8">
        <Button 
          onClick={handlePrevious} 
          disabled={activeTab === 'script'}
          variant="outline"
        >
          Previous
        </Button>
        
        {activeTab === 'preview' ? (
          <Button onClick={handleSaveProject}>
            Save & Download
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}