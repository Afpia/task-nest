<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class QueryService
{
    public function applyFilters(Builder $query, array $filters): Builder
    {
        foreach ($filters as $key => $value) {
            foreach ($filters as $key => $value) {
                if (is_array($value)) {
                    $query->whereIn($key, $value);
                } else {
                    $query->where($key, $value);
                }
            }
            return $query;
        }
        return $query;
    }

    public function selectColumns(Builder $query, array $columns): Builder
    {
        return $query->select($columns);
    }

    public function paginateResults(Builder $query, ?int $perPage)
    {
        return $perPage ? $query->paginate($perPage) : $query->get();
    }
}