<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'project_id' => Project::inRandomOrder()->first()->id,
            'user_id' => User::where('role', 'Исполнитель')->inRandomOrder()->first()->id,
            'priority' => $this->faker->randomElement(['Низкий', 'Средний', 'Высокий']),
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'remaining_days' => $this->faker->numberBetween(0, 30),
            'status' => $this->faker->randomElement(['Назначена', 'Выполняется', 'Завершена']),
        ];
    }
}
