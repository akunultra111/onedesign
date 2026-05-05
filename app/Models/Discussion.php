<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    protected $guarded = [];

    protected $casts = [
        'tags' => 'array',
        'is_hot' => 'boolean',
    ];

    // Relasi ke banyak komentar
    public function comments()
    {
        return $this->hasMany(DiscussionComment::class);
    }
}