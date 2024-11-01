<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $requiredRole)
    {
        $user = $request->user();
        $workspace = $request->route('workspace');

        if ($user->workspaces->contains($workspace->id) && $user->hasRoleLevel($requiredRole, $workspace)) {
            return $next($request);
        }

        return response()->json(['message' => 'Доступ запрещен'], 403);
    }
}
