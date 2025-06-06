<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWorkspace extends Model
{
    use HasFactory;

    protected $table = 'user_workspaces';

    protected $fillable = [
        'user_id',
        'workspace_id',
        'role'
    ];
}
