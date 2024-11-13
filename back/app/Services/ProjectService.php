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

    public function createProject(array $data): Project
    {
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
    }

    public function deleteProject(Project $project): void
    {
        $project->delete();
    }


    public function assignManager(Project $project, $userId)
    {
        //
    }

    public function DeleteManagerFromProject(Project $project, $userId)
    {
        //
    }
}
