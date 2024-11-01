<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Auth\Access\HandlesAuthorization;

class WorkspacePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Workspace $workspace)
    {
        return $workspace->isOwnedBy($user);
    }

    public function manage(User $user, Workspace $workspace)
    {
        $relation = $user->workspaces()->where('workspace_id', $workspace->id)->first();

        return $relation && in_array($relation->pivot->role, ['owner', 'admin']);
    }
}
