<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('lab_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->json('elements'); // Menyimpan elemen kanvas
            $table->longText('css_code')->nullable(); // Menyimpan hasil CSS
            $table->longText('react_code')->nullable(); // Menyimpan hasil React
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('lab_projects');
    }
};