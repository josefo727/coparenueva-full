<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AcceptTermsControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function should_accept_terms_for_logged_user()
    {
        $user = User::factory()->create(['terms' => 0]);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/accept-terms');

        $response->assertOk();
        $this->assertTrue((bool)$user->fresh()->terms);
    }

    /** @test */
    public function should_return_unauthorized_if_no_user_is_logged()
    {
        $response = $this->putJson('/api/accept-terms');

        $response->assertUnauthorized();
    }
}
