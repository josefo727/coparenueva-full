<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MonthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create($this->getUserCredentials());

        Sanctum::actingAs($user);
    }

    protected function getUserCredentials()
    {
        return [
            'email' => 'test@example.com',
            'password' => 'password',
        ];
    }

    /** @test */
    public function should_return_formatted_months_and_awards_in_index_method()
    {
        Config::set('months', [
            "award_1" => [
                "Abril",
                "Mayo",
                "Junio",
            ],
            "award_2" => [
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
            ],
        ]);

        $expected = [
            'months' => [
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
            ],
            'all_options' => [
                ["value" => "Abril", "label" => "Abril"],
                ["value" => "Mayo", "label" => "Mayo"],
                ["value" => "Junio", "label" => "Junio"],
                ["value" => "Julio", "label" => "Julio"],
                ["value" => "Agosto", "label" => "Agosto"],
                ["value" => "Septiembre", "label" => "Septiembre"],
                ["value" => "Octubre", "label" => "Octubre"],
                ["value" => "award_1", "label" => "Abril - Mayo - Junio"],
                ["value" => "award_2", "label" => "Julio - Agosto - Septiembre - Octubre"],
            ],
        ];

        $response = $this->getJson(route('months.index'));

        $response->assertOk()->assertJson($expected);
    }
}
