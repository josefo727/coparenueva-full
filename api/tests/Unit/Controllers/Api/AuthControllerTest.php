<?php

namespace Tests\Unit\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Response;
use Laravel\Sanctum\Sanctum;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function should_return_a_token_if_credentials_are_correct()
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'john.doe@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(['token', 'user' => [
                'id',
                'name',
                'email',
                'is_admin',
                'terms',
                'url',
                'url_summary_detail'
            ]]);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     */
    public function should_return_an_error_if_credentials_are_incorrect()
    {
        User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'john.doe@example.com',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonStructure(['message']);
    }

    /**
     * @test
     */
    public function should_logout_user_and_invalidate_token()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/logout');

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
