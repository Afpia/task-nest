<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'status' => $this->faker->randomElement(['Создан', 'В процессе']),
            'remaining_days' => $this->faker->numberBetween(0, 30),
            'user_id' => User::where('role', 'Руководитель проекта')->inRandomOrder()->first()->id,
        ];
    }
}