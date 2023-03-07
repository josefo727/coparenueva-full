<?php

namespace Tests\Unit\Controllers\Api;

use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MyTeamControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function should_return_members_of_authenticated_user()
    {
        $anhoterUser = User::factory()->create();
        Sanctum::actingAs($anhoterUser);

        $otherMembers = Member::factory()->count(3)->create();

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $members = Member::factory()->count(2)->create([
            'broker_id' => $user->id,
        ]);

        $response = $this->getJson('/api/my-team');

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => ['id', 'name'],
            ]);

        foreach ($members as $member) {
            $response->assertJsonFragment([
                'id' => $member->id,
                'name' => $member->name,
            ]);
        }

        foreach ($otherMembers as $member) {
            $response->assertJsonMissing([
                'id' => $member->id,
                'name' => $member->name,
            ]);
        }
    }

    /** @test */
    public function should_return_all_members_if_user_is_admin()
    {
        $adminUser = User::factory()->create(['is_admin' => true]);
        Sanctum::actingAs($adminUser);

        $members = Member::factory()->count(2)->create();

        $response = $this->getJson('/api/my-team');

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => ['id', 'name'],
            ]);

        foreach ($members as $member) {
            $response->assertJsonFragment([
                'id' => $member->id,
                'name' => $member->name,
            ]);
        }
    }
}
