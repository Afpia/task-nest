<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use TaylorNetwork\UsernameGenerator\FindSimilarUsernames;
use TaylorNetwork\UsernameGenerator\GeneratesUsernames;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use FindSimilarUsernames;
	use GeneratesUsernames;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'about',
        'city',
        'background_url',
        'login',
        'role',
        'avatar_url'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
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


}
