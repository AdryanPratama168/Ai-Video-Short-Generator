import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Book, Image, Music } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Buat Video Storytelling Tanpa Menampilkan Wajah
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl">
              Gunakan AI untuk membuat video storytelling profesional dengan mudah. Dari ide cerita hingga video final dalam beberapa menit.
            </p>
            <div className="space-x-4">
              <Link href="/create">
                <Button className="bg-white text-purple-700 hover:bg-gray-100">
                  Mulai Buat Video <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Lihat Fitur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Fitur Utama
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ciptakan video storytelling berkualitas tinggi dengan bantuan AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Book className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">AI Story Generator</h3>
              <p className="text-gray-500 text-center">
                Berikan ide cerita, AI akan membuatkan narasi lengkap
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Image className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">Background Generator</h3>
              <p className="text-gray-500 text-center">
                AI membuat gambar sesuai dengan alur cerita Anda
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <span className="flex justify-center items-center h-12 w-12 text-purple-600 text-2xl font-bold">Aa</span>
              <h3 className="text-xl font-bold">Template Subtitle</h3>
              <p className="text-gray-500 text-center">
                Pilih template subtitle yang menarik untuk video Anda
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Music className="h-12 w-12 text-purple-600" />
              <h3 className="text-xl font-bold">Audio Narrator</h3>
              <p className="text-gray-500 text-center">
                Pilih suara narrator dan tambahkan musik latar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Cara Kerja
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Proses mudah 5 langkah untuk membuat video storytelling
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">1</div>
              <h3 className="text-xl font-bold">Ide Cerita</h3>
              <p className="text-gray-500 text-center">
                Tulis ide cerita singkat Anda
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">2</div>
              <h3 className="text-xl font-bold">Background</h3>
              <p className="text-gray-500 text-center">
                Pilih background dan aspek rasio
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">3</div>
              <h3 className="text-xl font-bold">Subtitle</h3>
              <p className="text-gray-500 text-center">
                Pilih template subtitle
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">4</div>
              <h3 className="text-xl font-bold">Audio</h3>
              <p className="text-gray-500 text-center">
                Pilih suara narrator dan musik
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">5</div>
              <h3 className="text-xl font-bold">Hasil</h3>
              <p className="text-gray-500 text-center">
                Unduh video storytelling Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Siap Membuat Video Storytelling Anda?
            </h2>
            <p className="max-w-[700px] md:text-xl">
              Mulai buat video profesional tanpa menampilkan wajah sekarang juga!
            </p>
            <Link href="/create">
              <Button className="bg-white text-purple-700 hover:bg-gray-100">
                Mulai Buat Video <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}