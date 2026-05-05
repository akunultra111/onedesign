<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function index() { return Inertia::render('Landing'); }
    public function blog() { return Inertia::render('Blog'); }
    public function community() { return Inertia::render('Community'); }
    public function about() { return Inertia::render('About'); }
    public function lab() { return Inertia::render('Lab'); }
}