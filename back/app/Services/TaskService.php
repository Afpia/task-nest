<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;

class TaskService
{
    public function createTask(array $data, Project $project)
    {
        $data['project_id'] = $project->id;
        $data['status'] = 'Назначена';

        Task::create($data);
    }

    public function updateTask(array $data, Task $task)
    {
        $task->update($data);
        $task->save();
    }
}