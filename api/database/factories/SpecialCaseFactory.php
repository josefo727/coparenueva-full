<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        $member = Member::query()->first();
        return [
            'email' => $this->faker->unique()->safeEmail,
            'detail' => $this->faker->text,
            'broker_id' => $member->broker_id,
            'member_id' => $member->id,
        ];
    }
}
