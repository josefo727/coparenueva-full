<?php

namespace Tests\Unit\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class UserControllerTest extends TestCase
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
    public function should_return_list_of_users()
    {
        User::factory()->create();

        $response = $this->getJson(route('users.index'));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'email',
                        'created_at',
                        'updated_at'
                    ]
                ]
            ]);
    }

    /** @test */
    public function should_return_a_user()
    {
        $user = User::factory()->create();

        $response = $this->getJson(route('users.show', $user));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]);
    }

    /** @test */
    public function should_create_a_user()
    {
        $user = User::factory()->make();

        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'base_line' => rand(70, 85),
        ];

        $response = $this->postJson(route('users.store'), $data);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }


    /** @test */
    public function should_update_user_with_password()
    {
        $user = User::factory()->create();

        $data = [
            'name' => 'Test User Updated',
            'email' => 'testuserupdated@example.com',
            'password' => 'new_password',
            'base_line' => rand(70, 85),
        ];

        $response = $this->putJson(route('users.update', $user), $data);

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User Updated',
            'email' => 'testuserupdated@example.com',
        ]);
        $this->assertTrue(Hash::check('new_password', $user->fresh()->password));
    }

    /** @test */
    public function should_update_user_without_password()
    {
        $user = User::factory()->create();

        $data = [
            'name' => 'Test User Updated',
            'email' => 'testuserupdated@example.com',
            'base_line' => rand(70, 85),
        ];

        $response = $this->putJson(route('users.update', $user), $data);

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User Updated',
            'email' => 'testuserupdated@example.com',
        ]);
        $this->assertNotNull($user->fresh()->password);
    }

    /** @test */
    public function should_delete_a_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson(route('users.destroy', $user));

        $response
            ->assertStatus(Response::HTTP_NO_CONTENT);

        $this->assertNull(User::find($user->id));

        $this->assertEquals(204, $response->status());

        $this->assertModelMissing($user);
    }
}
