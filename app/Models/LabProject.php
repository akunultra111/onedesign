<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabProject extends Model
{
    protected $guarded = [];
    
    // Memberitahu Laravel bahwa 'elements' adalah format JSON/Array
    protected $casts = [
        'elements' => 'array',
    ];
}