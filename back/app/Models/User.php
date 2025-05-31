<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use TaylorNetwork\UsernameGenerator\FindSimilarUsernames;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use TaylorNetwork\UsernameGenerator\GeneratesUsernames;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements CanResetPasswordContract
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword, FindSimilarUsernames, GeneratesUsernames;

    protected $fillable = [
        'name',
        'email',
        'password',
        'about',
        'is_deleted',
        'city',
        'background_url',
        'login',
        'role',
        'avatar_url'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    const ROLE_HIERARCHY = [
        'executor' => 1,
        'project_manager' => 2,
        'admin' => 3,
        'owner' => 4,
    ];

    public function workspaces()
    {
        return $this->belongsToMany(Workspace::class, 'user_workspaces')
            ->withPivot('role');
    }

    public function managedProjects()
    {
        return $this->hasMany(Project::class);
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'user_tasks')
            ->withPivot('role');
    }

    public function hasRoleLevel(string $requiredRole, $workspace)
    {
        $userRole = $this->workspaces()
            ->where('workspace_id', $workspace)
            ->first()
            ->pivot
            ->role;

        return self::ROLE_HIERARCHY[$userRole] >= self::ROLE_HIERARCHY[$requiredRole];
    }

     public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\ResetPasswordNotification($token, $this->email));
    }

}
