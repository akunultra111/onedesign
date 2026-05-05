<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DiscussionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('discussions')->insert([
            [
                'author' => 'Alex Chen',
                'avatar' => 'AC',
                'title' => 'Bagaimana cara terbaik mengimplementasikan Glassmorphism tanpa mengorbankan performa?',
                'preview' => 'Saya sedang bereksperimen dengan backdrop-filter di CSS, tapi FPS terasa drop saat banyak elemen ditumpuk. Adakah solusi efisien untuk standar desain 2026?',
                'tags' => json_encode(['UI/UX', 'CSS', 'PERFORMA']),
                'replies' => 24,
                'views' => '1.2k',
                'is_hot' => true,
                'created_at' => Carbon::now()->subHours(2),
                'updated_at' => Carbon::now()->subHours(2),
            ],
            [
                'author' => 'Sarah Jenkins',
                'avatar' => 'SJ',
                'title' => 'Mencari referensi untuk desain Dashboard "Pure Dark Mode"',
                'preview' => 'Apakah ada yang punya referensi atau palet warna spesifik untuk menghindari warna abu-abu kusam di dark mode? Saya ingin teks putih murni benar-benar terlihat nge-blend.',
                'tags' => json_encode(['INSPIRASI', 'SPATIAL', 'DARK MODE']),
                'replies' => 8,
                'views' => '340',
                'is_hot' => false,
                'created_at' => Carbon::now()->subHours(5),
                'updated_at' => Carbon::now()->subHours(5),
            ],
            [
                'author' => 'David Kim',
                'avatar' => 'DK',
                'title' => 'Bento Grid terlalu mainstream? Ini alternatif layout untuk 2026',
                'preview' => 'Bento grid memang rapi, tapi saya merasa kita mulai kehilangan kreativitas organik. Mari diskusikan layout asimetris dan bagaimana menerapkannya tanpa merusak responsivitas.',
                'tags' => json_encode(['TREN 2026', 'LAYOUT']),
                'replies' => 56,
                'views' => '3.4k',
                'is_hot' => true,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ]
        ]);
    }
}