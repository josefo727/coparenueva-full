<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;

class UserTermController extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create($this->getUserCredentials());

        Sanctum::actingAs($this->user);
    }

    protected function getUserCredentials()
    {
        return [
            'email' => 'test@example.com',
            'password' => 'password',
            'terms' => false
        ];
    }

    /** @test */
    public function show_returns_terms_of_authenticated_user()
    {
        $response = $this->get(route('user-term.show'));

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'terms' => $this->user->terms,
            ]);
    }

    /** @test */
    public function update_updates_terms_of_authenticated_user()
    {
        $response = $this->put(route('user-term.update'), [
            'terms' => true,
        ]);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'terms' => true,
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'terms' => true,
        ]);
    }

}
