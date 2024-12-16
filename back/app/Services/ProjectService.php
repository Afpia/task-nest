<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectManagers;
use App\Models\User;
use App\Models\UserProject;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ProjectService
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function createProject(array $data, int $workspaceId): Project
    {
        $data['workspace_id'] = $workspaceId;
        $data['status'] = 'Создан';

        $project = Project::create($data);

        $project->image_url = $this->imageService->generateDefaultImage('project', $project->id);
        $project->save();

        return $project;
    }

    public function updateProject(Project $project, array $data)
    {
        $project->update($data);
        $project->save();
        return $project;
    }

    public function deleteProject(Project $project): void
    {
        $project->delete();
    }


    public function getUserRoleInProject(Project $project, User $user): ?string
    {
        return $project->users()
            ->where('user_id', $user->id)
            ->first()
            ->pivot
            ->role ?? null;
    }

    public function assignManager(Project $project, $userId)
    {
        ProjectManagers::create([
            'user_id' => $userId,
            'project_id' => $project->id,
        ]);
    }

    public function DeleteManagerFromProject(Project $project, $userId)
    {
        ProjectManagers::where('user_id', $userId)
            ->where('project_id', $project->id)
            ->delete();
    }
}
