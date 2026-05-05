<?php

use App\Http\Controllers\ProfileController;
use App\Models\Article;
use App\Models\Discussion;
use App\Models\LabProject;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. ROUTE PUBLIK
Route::get('/', function () { return Inertia::render('Landing'); })->name('home');
Route::get('/about', function () { return Inertia::render('About'); });

Route::get('/blog', function () { 
    $articles = Article::latest()->get(); 
    return Inertia::render('Blog', ['articles' => $articles]); 
})->name('blog.index');

Route::get('/blog/{article:slug}', function (Article $article) {
    return Inertia::render('BlogDetail', ['article' => $article]);
})->name('blog.show');

Route::get('/community', function () { 
    $discussions = Discussion::with('comments')->latest()->get();
    return Inertia::render('Community', ['discussions' => $discussions]); 
});

// 2. ROUTE TERLINDUNGI (Wajib Login)
Route::middleware('auth')->group(function () {
    
    Route::get('/dashboard', function (Illuminate\Http\Request $request) {
        $projects = LabProject::where('user_id', $request->user()->id)->latest()->get();
        return Inertia::render('Dashboard', ['projects' => $projects]);
    })->name('dashboard');

    Route::get('/lab', function () { return Inertia::render('Lab'); })->name('lab');

    Route::post('/lab/save-project', function (Illuminate\Http\Request $request) {
        $user = $request->user();
        $user->increment('exported_css_count');
        LabProject::create([
            'user_id' => $user->id,
            'title' => $request->title ?? 'Bento Export - ' . now()->format('d M Y H:i'),
            'elements' => $request->elements,
            'css_code' => $request->css_code,
            'react_code' => $request->react_code,
        ]);
        return back();
    })->name('lab.save');

    // RUTE BARU: Menghapus Project dari Dashboard
    Route::delete('/lab/project/{id}', function (Illuminate\Http\Request $request, $id) {
        // Memastikan project tersebut benar-benar milik user yang sedang login
        $project = LabProject::where('user_id', $request->user()->id)->findOrFail($id);
        $project->delete();
        
        return back();
    })->name('lab.project.destroy');

    Route::post('/community/store', function (Illuminate\Http\Request $request) {
        $request->validate(['title' => 'required|string', 'preview' => 'required|string', 'tags' => 'required|array']);
        $user = $request->user();
        $nameParts = explode(' ', $user->name);
        $avatar = count($nameParts) > 1 ? strtoupper(substr($nameParts[0], 0, 1) . substr($nameParts[1], 0, 1)) : strtoupper(substr($user->name, 0, 2));

        Discussion::create([
            'author' => $user->name,
            'avatar' => $avatar,
            'title' => $request->title,
            'preview' => $request->preview,
            'tags' => $request->tags,
            'replies' => 0,
            'views' => '0',
            'is_hot' => false,
        ]);
        return back();
    })->name('community.store');

    Route::post('/community/{discussion}/comment', function (Illuminate\Http\Request $request, Discussion $discussion) {
        $request->validate(['content' => 'required|string']);
        $user = $request->user();
        
        $nameParts = explode(' ', $user->name);
        $avatar = count($nameParts) > 1 ? strtoupper(substr($nameParts[0], 0, 1) . substr($nameParts[1], 0, 1)) : strtoupper(substr($user->name, 0, 2));

        $discussion->comments()->create([
            'author' => $user->name,
            'avatar' => $avatar,
            'content' => $request->content,
        ]);

        $discussion->increment('replies');
        return back();
    })->name('community.comment');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';