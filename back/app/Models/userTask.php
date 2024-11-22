<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userTask extends Model
{
    use HasFactory;

    protected $table = 'user_tasks';

    protected $fillable = [
        'user_id',
        'task_id',
        'role'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
