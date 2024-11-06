<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
        'workspace_id',
        'image_url',
    ];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_tasks')
            ->withPivot('role');
    }

    public function remainingDays()
    {
        $endDate = Carbon::parse($this->end_date);

        return $endDate->diffInDays(Carbon::now(), 1) + 1;
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_projects')
            ->withPivot('role');
    }

    public function managers()
    {
        return $this->belongsToMany(ProjectManagers::class, 'user_id');
    }
}
