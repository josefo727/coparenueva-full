<?php

namespace Database\Factories;

use App\Models\User;
use App\Services\Month;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kpi>
 */
class KpiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $monthService = new Month();
        $user = User::factory()->create();
        return [
            'renewal_target_audience' => $this->faker->numberBetween(1, 100),
            'renewed_policies' => $this->faker->numberBetween(1, 100),
            'renewed_premium' => $this->faker->numberBetween(1, 10000),
            'incentive_percentage' => $this->faker->randomFloat(2, 0, 100),
            'canceled_policies' => $this->faker->numberBetween(1, 10),
            'month' => Arr::random($monthService->getAllMonths()),
            'broker_id' => $user->id,
        ];
    }
}
