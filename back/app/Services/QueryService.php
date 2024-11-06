<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class QueryService
{
    public function applyFilters(Builder $query, string $filters): Builder
    {

        $filtersArray = $this->parseFilters($filters);

        foreach ($filtersArray as $key => $value) {
            if (is_array($value)) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }
        return $query;
    }

    public function selectColumns(Builder $query, string $columns): Builder
    {
        $columnsArray = $this->parseColumns($columns);
        return $query->select($columnsArray);
    }

    public function paginateResults(Builder $query, $perPage)
    {
        return $perPage ? $query->paginate($perPage) : $query->get();
    }

    private function parseColumns($columns): array
    {
        $columnsArray = explode(',', $columns);
        return array_map('trim', $columnsArray);
    }

    private function parseFilters(string $filters): array
    {
        $filtersArray = [];
        $pairs = explode(',', $filters);

        foreach ($pairs as $pair) {
            $keyValue = explode(':', $pair);

            if (count($keyValue) === 2) {
                $key = trim($keyValue[0]);
                $value = trim($keyValue[1]);
                $filtersArray[$key] = $value;
            }
        }

        return $filtersArray;
    }
}