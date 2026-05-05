<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discussions', function (Blueprint $table) {
            $table->id();
            $table->string('author');
            $table->string('avatar');
            $table->string('title');
            $table->text('preview');
            $table->json('tags');
            $table->integer('replies')->default(0);
            $table->string('views')->default('0');
            $table->boolean('is_hot')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discussions');
    }
};