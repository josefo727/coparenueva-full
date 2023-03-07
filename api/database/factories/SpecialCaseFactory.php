<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SpecialCase>
 */
class SpecialCaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail,
            'detail' => $this->faker->text,
            'broker_id' => optional(User::inRandomOrder()->first())->id,
            'member_id' => Member::first()->id,
        ];
    }
}
