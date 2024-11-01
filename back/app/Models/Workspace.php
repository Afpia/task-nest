<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_workspaces')
            ->withPivot('role');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
