<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'workspace_user_roles')
            ->withPivot('role');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
