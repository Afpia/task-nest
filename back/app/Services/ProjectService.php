<?php

namespace App\Services;

use App\Models\Project;
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

    public function assignUser(Project $project, $userId)
    {
        UserProject::create([
            'user_id' => $userId,
            'project_id' => $project->id,
        ]);
    }

    public function deleteUserFromProject(Project $project, $userId)
    {
        UserProject::where('user_id', $userId)
            ->where('project_id', $project->id)
            ->delete();
    }
}
