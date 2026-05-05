<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscussionComment extends Model
{
    protected $guarded = [];

    // Relasi balik ke Diskusi Induk
    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }
}