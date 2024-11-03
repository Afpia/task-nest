<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;
use App\Models\UserWorkspace;
use App\Models\Workspace;
use Auth;

class WorkspaceService
{
    private $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function createWorkspace(string $title)
    {
        $workspace = Workspace::create(['title' => $title]);

        $workspace->image_url = $this->imageService->generateDefaultImage('workspace', $workspace->id);
        $workspace->save();

        $this->manageUserInWorkspace($workspace, Auth::id(), 'owner');
    }

    public function updateWorkspace(array $data, Workspace $workspace)
    {
        $workspace->update($data);
        return $workspace;
    }

    public function deleteWorkspace(Workspace $workspace)
    {
        $workspace->delete();
    }

    public function getUserRoleInWorkspace(Workspace $workspace, $userId): ?string
    {
        if ($workspace !== null && $userId !== null) {
            return $workspace->users()
                ->where('user_id', $userId)
                ->withPivot('role')
                ->first()?->pivot->role ?? null;
        }
        return null;
    }

    public function manageUserInWorkspace(Workspace $workspace, int $userId, string $role = 'executor'): void
    {
        UserWorkspace::updateOrCreate(
            ['user_id' => $userId, 'workspace_id' => $workspace->id],
            ['role' => $role]
        );
    }

    public function deleteUserFromWorkspace(Workspace $workspace, int $userId): void
    {
        UserWorkspace::where('user_id', $userId)->where('workspace_id', $workspace->id)->delete();
    }

}