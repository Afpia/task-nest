<?php

namespace App\Repositories;

use App\Models\Workspace;

class WorkspaceRepository extends BaseRepository
{
    public $model;

    public function __construct(Workspace $workspace)
    {
        $this->model = $workspace;
    }

    
}