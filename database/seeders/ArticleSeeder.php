<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('articles')->insert([
            [
                'title' => 'Evolusi Spatial Design di Tahun 2026',
                'slug' => 'evolusi-spatial-design-2026',
                'category' => 'UI/UX TREN',
                'image_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                'content' => 'Spatial design telah mengubah cara kita berinteraksi dengan antarmuka. Tidak lagi dibatasi oleh layar datar 2D, elemen kini memiliki kedalaman, bayangan, dan tekstur kaca (glassmorphism) yang menciptakan ilusi ruang.',
                'read_time' => '5 MIN READ',
                'bento_class' => 'md:col-span-2 md:row-span-2', // Kotak besar
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Misteri Dark Mode Murni',
                'slug' => 'misteri-dark-mode-murni',
                'category' => 'TUTORIAL',
                'image_url' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
                'content' => 'Banyak desainer salah kaprah menggunakan abu-abu gelap untuk Dark Mode. Di standar 2026, kita menggunakan Pure Black (#000000) yang digabungkan dengan aksen cahaya neon (Ambient Glow) untuk menciptakan kedalaman.',
                'read_time' => '3 MIN READ',
                'bento_class' => 'md:col-span-1 md:row-span-1', // Kotak kecil
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Membangun Ekosistem Bento Grid',
                'slug' => 'membangun-ekosistem-bento-grid',
                'category' => 'DEVELOPMENT',
                'image_url' => 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop',
                'content' => 'Grid bento bukan sekadar tren visual, melainkan cara paling efisien untuk menata informasi kompleks ke dalam modul-modul yang mudah dicerna oleh pengguna modern.',
                'read_time' => '4 MIN READ',
                'bento_class' => 'md:col-span-1 md:row-span-1', // Kotak kecil
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}