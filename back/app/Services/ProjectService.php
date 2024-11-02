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

    public function updateProject(Project $project, array $data): Project
    {
        $project->update($data);
        return $project;
    }

    public function deleteProject(Project $project): void
    {
        $project->delete();
    }

    public function changeRole(Project $project, $status)
    {
        $this->updateProject($project, ['status' => $status]);
    }

    public function attachUserToProject(Project $project, int $userId, string $role): void
    {
        UserProject::updateOrCreate(
            ['user_id' => $userId, 'project_id' => $project->id],
            ['role' => $role]
        );
    }

    public function getUserRoleInProject(Project $project, User $user): ?string
    {
        return $project->users()
            ->where('user_id', $user->id)
            ->first()
            ->pivot
            ->role ?? null;
    }
}
