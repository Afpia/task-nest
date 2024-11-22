<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Обработка входящего запроса.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string  $requiredRole
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $requiredRole)
    {
        $user = $request->user();
        $workspace = $request->route('workspace');
        $project = $request->route('project');
        $task = $request->route('task');

        if ($workspace) {
            $workspaceId = $workspace->id;
            return $this->checkUserAccess($user, $workspaceId, $requiredRole, $next, $request);
        }

        if ($project) {
            $workspaceId = $project->workspace_id;
            return $this->checkUserAccess($user, $workspaceId, $requiredRole, $next, $request);
        }

        if ($task) {
            $workspaceId = $task->project->workspace_id;
            return $this->checkUserAccess($user, $workspaceId, $requiredRole, $next, $request);
        }

        return response()->json(['message' => 'Рабочее пространство не найдено'], 404);
    }

    private function checkUserAccess($user, $workspaceId, $requiredRole, $next, $request)
    {
        if ($user && $user->workspaces->contains($workspaceId) && $user->hasRoleLevel($requiredRole, $workspaceId)) {
            return $next($request);
        }

        return response()->json(['message' => 'Доступ запрещен'], 403);
    }
}
