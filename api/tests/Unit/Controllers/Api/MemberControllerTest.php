<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MemberControllerTest extends TestCase
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
        ];
    }

    /** @test */
    public function should_return_a_collection_of_members()
    {
        Member::factory()->count(2)->create(['broker_id' => $this->user->id]);

        $response = $this->getJson(route('members.index'));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'genre',
                        'broker_id',
                        'created_at',
                        'updated_at'
                    ],
                ]
            ]);
    }

    /** @test */
    public function should_return_a_member()
    {
        $member = Member::factory()->create(['broker_id' => $this->user->id]);

        $response = $this->getJson(route('members.show', $member));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'id',
                'name',
                'genre',
                'broker_id',
                'created_at',
                'updated_at'
            ]);
    }

    /** @test */
    public function should_create_a_new_member()
    {
        $data = [
            'name' => $this->faker->name(),
            'genre' => 'male',
            'broker_id' => $this->user->id
        ];

        $response = $this->postJson(route('members.store'), $data);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'id',
                'name',
                'genre',
                'broker_id',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('members', $data);
    }

    /** @test */
    public function should_update_a_member()
    {
        $member = Member::factory()->create(['broker_id' => $this->user->id]);
        $data = [
            'name' => $this->faker->name(),
            'genre' => 'female',
            'broker_id' => $this->user->id
        ];

        $response = $this->putJson(route('members.update', $member), $data);

        $response
            ->assertStatus(Response::HTTP_ACCEPTED)
            ->assertJsonStructure([
                'id',
                'name',
                'genre',
                'broker_id',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('members', $data);
    }

    /** @test */
    public function should_delete_a_member()
    {
        $member = Member::factory()->create(['broker_id' => $this->user->id]);

        $response = $this->deleteJson(route('members.destroy', $member));

        $response
            ->assertStatus(Response::HTTP_NO_CONTENT)
            ->assertNoContent();

        $this->assertModelMissing($member);
    }
}
