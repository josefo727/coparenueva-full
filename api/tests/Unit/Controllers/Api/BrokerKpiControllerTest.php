<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Kpi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class BrokerKpiControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();

        Sanctum::actingAs($user);

        Kpi::factory()->count(1)->create([
            'broker_id' => $user->id,
        ]);
    }

    /** @test */
    public function should_return_broker_kpi()
    {
        $response = $this->getJson('/api/broker-kpi');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'renewal_target_audience',
                'renewed_policies',
                'renewed_premium',
                'incentive_percentage',
                'canceled_policies',
                'renewal_rate',
                'incentive_level',
                'approximate_incentive_value',
            ]);
    }
}
