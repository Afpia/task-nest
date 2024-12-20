<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Models\userTask;
use App\Models\Workspace;

class TaskService
{
    public function createTask(array $data, Project $project)
    {
        $data['project_id'] = $project->id;
        $data['status'] = 'Назначена';

        $task = Task::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'priority' => $data['priority'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'status' => $data['status'],
            'project_id' => $data['project_id']
        ]);

        $this->addUserToTask($task, $data['user_id'], 'respectively');
        return $task;
    }

    public function updateTask(array $data, Task $task)
    {
        $task->update($data);
        $task->save();
        return $task;
    }
    public function addUserToTask(Task $task, $user_id, $role = 'co-executor')
    {
        userTask::create(['user_id' => $user_id, 'task_id' => $task->id, 'role' => $role]);
    }

    public function getUserRoleInTask(Task $task, $userId)
    {
        if ($task !== null && $userId !== null) {
            return $task->users()
                ->where('user_id', $userId)
                ->withPivot('role')
                ->first()?->pivot->role ?? null;
        }
    }

    public function getMyTasksInProject(Project $project, User $user)
    {
        return $user->tasks()
            ->where('project_id', $project->id)
            ->get();
    }

    public function getMyTasksInWorkspace(Workspace $workspace, User $user)
    {
        return $user->tasks()
            ->where('workspace_id', $workspace->id)
            ->get();
    }
}